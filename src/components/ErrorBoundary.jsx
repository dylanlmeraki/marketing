import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { logError } from "./utils/errorHandler";
import { error as logErrorToConsole } from "./utils/logger";
import { isProduction } from "./utils/envConfig";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false,
      errorId: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Use centralized logger instead of console
    logErrorToConsole("ErrorBoundary caught an error", { error: error?.message, stack: error?.stack });
    
    // Generate unique error ID for tracking
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Log error using centralized error handler
    const logEntry = logError(error, {
      componentStack: errorInfo.componentStack,
      errorId,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
    });

    // Attempt to log error to backend
    this.logErrorToBackend(error, errorInfo, errorId);
  }

  async logErrorToBackend(error, errorInfo, errorId) {
    try {
      // Check if user is authenticated first
      const isAuth = await base44.auth.isAuthenticated().catch(() => false);
      
      if (isAuth) {
        await base44.entities.SystemLog?.create({
          log_type: "frontend_error",
          error_id: errorId,
          message: error?.toString() || 'Unknown error',
          stack: error?.stack || null,
          component_stack: errorInfo?.componentStack || null,
          severity: "high",
          url: typeof window !== 'undefined' ? window.location.href : 'unknown',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          timestamp: new Date().toISOString()
        });
      }
    } catch (e) {
      // Silently fail - don't create additional errors from error logging
      if (!isProduction()) {
        console.warn("Failed to log error to backend:", e);
      }
    }
  }

  handleRetry = () => {
    this.setState(prev => ({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
      retryCount: prev.retryCount + 1
    }));
  }

  copyErrorDetails = () => {
    const { error, errorInfo, errorId } = this.state;
    const details = `
Error ID: ${errorId}
Error: ${error?.toString()}
Stack: ${error?.stack}
Component Stack: ${errorInfo?.componentStack}
URL: ${typeof window !== 'undefined' ? window.location.href : 'unknown'}
Timestamp: ${new Date().toISOString()}
    `.trim();
    
    navigator.clipboard?.writeText(details);
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId, showDetails, retryCount } = this.state;
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full p-8 border-0 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-2">
                We're sorry for the inconvenience. The error has been logged and we'll look into it.
              </p>
              
              {errorId && (
                <p className="text-xs text-gray-500 mb-6">
                  Error ID: <code className="bg-gray-100 px-2 py-1 rounded">{errorId}</code>
                </p>
              )}

              {/* Error details toggle */}
              <button 
                onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto mb-4"
              >
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showDetails ? 'Hide' : 'Show'} Technical Details
              </button>

              {showDetails && error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-red-900">Error Details:</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={this.copyErrorDetails}
                      className="text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap max-h-32">
                    {error.toString()}
                  </pre>
                  {errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-600 cursor-pointer">
                        Component Stack
                      </summary>
                      <pre className="text-xs text-red-600 mt-2 overflow-auto whitespace-pre-wrap max-h-48">
                        {errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-center flex-wrap">
                {retryCount < 3 && (
                  <Button
                    onClick={this.handleRetry}
                    variant="outline"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again ({3 - retryCount} left)
                  </Button>
                )}
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Link to={createPageUrl("Home")}>
                  <Button variant="outline">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-gray-400 mt-6">
                If this problem persists, please contact support with the error ID above.
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;