// Centralized Error Handling Utilities for Node.js Friendly Environment
// Provides consistent error handling across frontend, internal portal, and client portal

/**
 * Safe check for production environment
 */
function isProductionEnv() {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'production';
  }
  return false;
}

/**
 * Error types for categorization
 */
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

/**
 * Parse and categorize errors from various sources
 */
export function parseError(error) {
  // Handle null/undefined
  if (!error) {
    return {
      type: ErrorTypes.UNKNOWN,
      message: 'An unknown error occurred',
      originalError: null,
      statusCode: 500,
      retryable: true
    };
  }

  // Handle Axios/Fetch response errors
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    if (status === 401) {
      return {
        type: ErrorTypes.AUTH,
        message: data?.error || 'Authentication required. Please log in.',
        originalError: error,
        statusCode: status,
        retryable: false
      };
    }
    
    if (status === 403) {
      return {
        type: ErrorTypes.PERMISSION,
        message: data?.error || 'You do not have permission to perform this action.',
        originalError: error,
        statusCode: status,
        retryable: false
      };
    }
    
    if (status === 404) {
      return {
        type: ErrorTypes.NOT_FOUND,
        message: data?.error || 'The requested resource was not found.',
        originalError: error,
        statusCode: status,
        retryable: false
      };
    }
    
    if (status === 422 || status === 400) {
      return {
        type: ErrorTypes.VALIDATION,
        message: data?.error || 'Invalid data provided. Please check your input.',
        originalError: error,
        statusCode: status,
        retryable: false,
        details: data?.details || null
      };
    }
    
    if (status >= 500) {
      return {
        type: ErrorTypes.SERVER,
        message: data?.error || 'A server error occurred. Please try again later.',
        originalError: error,
        statusCode: status,
        retryable: true
      };
    }
  }

  // Handle network errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || 
      error.message?.includes('Network Error') || error.message?.includes('fetch')) {
    return {
      type: ErrorTypes.NETWORK,
      message: 'Unable to connect to the server. Please check your internet connection.',
      originalError: error,
      statusCode: 0,
      retryable: true
    };
  }

  // Handle timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return {
      type: ErrorTypes.TIMEOUT,
      message: 'The request timed out. Please try again.',
      originalError: error,
      statusCode: 408,
      retryable: true
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      type: ErrorTypes.UNKNOWN,
      message: error,
      originalError: error,
      statusCode: 500,
      retryable: true
    };
  }

  // Handle Error objects
  if (error instanceof Error) {
    return {
      type: ErrorTypes.UNKNOWN,
      message: error.message || 'An unexpected error occurred.',
      originalError: error,
      statusCode: 500,
      retryable: true
    };
  }

  // Default fallback
  return {
    type: ErrorTypes.UNKNOWN,
    message: 'An unexpected error occurred. Please try again.',
    originalError: error,
    statusCode: 500,
    retryable: true
  };
}

/**
 * Format error for display to users
 */
export function formatErrorForDisplay(error) {
  const parsed = parseError(error);
  
  return {
    title: getErrorTitle(parsed.type),
    message: parsed.message,
    showRetry: parsed.retryable,
    type: parsed.type
  };
}

/**
 * Get user-friendly error title
 */
function getErrorTitle(errorType) {
  const titles = {
    [ErrorTypes.NETWORK]: 'Connection Error',
    [ErrorTypes.AUTH]: 'Authentication Required',
    [ErrorTypes.PERMISSION]: 'Access Denied',
    [ErrorTypes.VALIDATION]: 'Invalid Input',
    [ErrorTypes.NOT_FOUND]: 'Not Found',
    [ErrorTypes.SERVER]: 'Server Error',
    [ErrorTypes.TIMEOUT]: 'Request Timeout',
    [ErrorTypes.UNKNOWN]: 'Error'
  };
  return titles[errorType] || 'Error';
}

/**
 * Log error for monitoring (safe for both browser and Node.js)
 */
export function logError(error, context = {}) {
  const parsed = parseError(error);
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: parsed.type,
    message: parsed.message,
    statusCode: parsed.statusCode,
    context,
    stack: parsed.originalError?.stack || null,
    environment: isProductionEnv() ? 'production' : 'development'
  };

  // Console logging - structured in production, readable in development
  if (isProductionEnv()) {
    console.error(JSON.stringify(logEntry));
  } else {
    console.error('[Error]', logEntry);
  }

  // Return the log entry for potential backend logging
  return logEntry;
}

/**
 * Retry utility with exponential backoff
 */
export async function withRetry(fn, options = {}) {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    shouldRetry = (error) => parseError(error).retryable
  } = options;

  let lastError;
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      if (!isProductionEnv()) {
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
    }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffFactor, maxDelay);
    }
  }

  throw lastError;
}

/**
 * Safe async wrapper that catches errors and returns result/error tuple
 */
export async function safeAsync(promise) {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, parseError(error)];
  }
}

/**
 * Create error response for backend functions (Deno)
 */
export function createErrorResponse(error, defaultMessage = 'An error occurred') {
  const parsed = parseError(error);
  
  return {
    error: parsed.message || defaultMessage,
    type: parsed.type,
    details: parsed.details || null
  };
}

export default {
  ErrorTypes,
  parseError,
  formatErrorForDisplay,
  logError,
  withRetry,
  safeAsync,
  createErrorResponse
};