// Centralized Logging Utility for Node.js Deployment
// Provides consistent logging across browser and server environments

import { isProduction, isDevelopment } from './envConfig';

/**
 * Log levels
 */
export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4
};

const LogLevelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];

/**
 * Current minimum log level (configurable)
 */
const minLogLevel = isProduction() ? LogLevel.WARN : LogLevel.DEBUG;

/**
 * Format log message with timestamp and level
 */
function formatLogMessage(level, message, context = {}) {
  const timestamp = new Date().toISOString();
  const levelName = LogLevelNames[level] || 'UNKNOWN';
  
  return {
    timestamp,
    level: levelName,
    message,
    context,
    environment: isProduction() ? 'production' : 'development'
  };
}

/**
 * Core logging function
 */
function log(level, message, context = {}) {
  if (level < minLogLevel) return;
  
  const logEntry = formatLogMessage(level, message, context);
  
  // Console output
  const consoleMethod = level >= LogLevel.ERROR ? 'error' 
    : level === LogLevel.WARN ? 'warn' 
    : level === LogLevel.DEBUG ? 'debug' 
    : 'log';
  
  if (isDevelopment()) {
    console[consoleMethod](`[${logEntry.level}] ${logEntry.timestamp}:`, message, context);
  } else {
    // In production, output structured JSON for log aggregation
    console[consoleMethod](JSON.stringify(logEntry));
  }
  
  return logEntry;
}

/**
 * Debug log - only in development
 */
export function debug(message, context = {}) {
  return log(LogLevel.DEBUG, message, context);
}

/**
 * Info log
 */
export function info(message, context = {}) {
  return log(LogLevel.INFO, message, context);
}

/**
 * Warning log
 */
export function warn(message, context = {}) {
  return log(LogLevel.WARN, message, context);
}

/**
 * Error log
 */
export function error(message, context = {}) {
  return log(LogLevel.ERROR, message, context);
}

/**
 * Fatal error log
 */
export function fatal(message, context = {}) {
  return log(LogLevel.FATAL, message, context);
}

/**
 * Log API request
 */
export function logApiRequest(method, url, options = {}) {
  return debug(`API Request: ${method} ${url}`, {
    type: 'api_request',
    method,
    url,
    ...options
  });
}

/**
 * Log API response
 */
export function logApiResponse(method, url, status, duration) {
  const level = status >= 500 ? LogLevel.ERROR 
    : status >= 400 ? LogLevel.WARN 
    : LogLevel.DEBUG;
  
  return log(level, `API Response: ${method} ${url} - ${status}`, {
    type: 'api_response',
    method,
    url,
    status,
    duration
  });
}

/**
 * Log user action
 */
export function logUserAction(action, details = {}) {
  return info(`User Action: ${action}`, {
    type: 'user_action',
    action,
    ...details
  });
}

/**
 * Log performance metric
 */
export function logPerformance(metric, value, unit = 'ms') {
  return debug(`Performance: ${metric} = ${value}${unit}`, {
    type: 'performance',
    metric,
    value,
    unit
  });
}

export default {
  LogLevel,
  debug,
  info,
  warn,
  error,
  fatal,
  logApiRequest,
  logApiResponse,
  logUserAction,
  logPerformance
};