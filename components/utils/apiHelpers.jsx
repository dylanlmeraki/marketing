// API Helper Utilities for Node.js Friendly Environment
// Provides wrappers for API calls with error handling, retries, and logging

import { parseError, withRetry, safeAsync, logError } from './errorHandler';
import { logApiRequest, logApiResponse } from './logger';

/**
 * Default request timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Create a timeout promise
 */
function createTimeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms);
  });
}

/**
 * Wrap a promise with timeout
 */
export async function withTimeout(promise, timeoutMs = DEFAULT_TIMEOUT) {
  return Promise.race([promise, createTimeoutPromise(timeoutMs)]);
}

/**
 * Safe API call wrapper with error handling and optional retry
 */
export async function safeApiCall(apiFunction, options = {}) {
  const {
    retries = 0,
    timeout = DEFAULT_TIMEOUT,
    context = {},
    onError = null
  } = options;

  const executeCall = async () => {
    const startTime = Date.now();
    
    try {
      const result = await withTimeout(apiFunction(), timeout);
      const duration = Date.now() - startTime;
      
      logApiResponse('API', context.url || 'unknown', 200, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const parsedError = parseError(error);
      
      logError(error, { ...context, duration });
      logApiResponse('API', context.url || 'unknown', parsedError.statusCode, duration);
      
      if (onError) {
        onError(parsedError);
      }
      
      throw error;
    }
  };

  if (retries > 0) {
    return withRetry(executeCall, {
      maxAttempts: retries + 1,
      shouldRetry: (error) => {
        const parsed = parseError(error);
        return parsed.retryable;
      }
    });
  }

  return executeCall();
}

/**
 * Batch multiple API calls with error aggregation
 */
export async function batchApiCalls(calls, options = {}) {
  const { 
    continueOnError = true,
    maxConcurrent = 5
  } = options;

  const results = [];
  const errors = [];

  // Process in batches
  for (let i = 0; i < calls.length; i += maxConcurrent) {
    const batch = calls.slice(i, i + maxConcurrent);
    
    const batchResults = await Promise.allSettled(
      batch.map(call => safeApiCall(call, options))
    );

    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push({ index: i + index, data: result.value, success: true });
      } else {
        const error = parseError(result.reason);
        errors.push({ index: i + index, error, success: false });
        
        if (!continueOnError) {
          throw result.reason;
        }
      }
    });
  }

  return { results, errors, hasErrors: errors.length > 0 };
}

/**
 * Debounce API calls
 */
export function debounceApiCall(fn, delay = 300) {
  let timeoutId = null;
  let pendingPromise = null;
  let resolveList = [];
  let rejectList = [];

  return function (...args) {
    return new Promise((resolve, reject) => {
      resolveList.push(resolve);
      rejectList.push(reject);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        const currentResolves = [...resolveList];
        const currentRejects = [...rejectList];
        resolveList = [];
        rejectList = [];
        
        try {
          const result = await fn.apply(this, args);
          currentResolves.forEach(r => r(result));
        } catch (error) {
          currentRejects.forEach(r => r(error));
        }
      }, delay);
    });
  };
}

/**
 * Cache API responses
 */
export function createApiCache(ttlMs = 60000) {
  const cache = new Map();

  return {
    get(key) {
      const cached = cache.get(key);
      if (!cached) return null;
      
      if (Date.now() > cached.expiry) {
        cache.delete(key);
        return null;
      }
      
      return cached.data;
    },
    
    set(key, data) {
      cache.set(key, {
        data,
        expiry: Date.now() + ttlMs
      });
    },
    
    invalidate(key) {
      if (key) {
        cache.delete(key);
      } else {
        cache.clear();
      }
    },
    
    async getOrFetch(key, fetchFn) {
      const cached = this.get(key);
      if (cached !== null) return cached;
      
      const data = await fetchFn();
      this.set(key, data);
      return data;
    }
  };
}

/**
 * Format API error for user display
 */
export function formatApiError(error) {
  const parsed = parseError(error);
  
  return {
    title: getErrorTitle(parsed.type),
    message: parsed.message,
    canRetry: parsed.retryable,
    statusCode: parsed.statusCode
  };
}

function getErrorTitle(errorType) {
  const titles = {
    NETWORK_ERROR: 'Connection Error',
    AUTH_ERROR: 'Authentication Required',
    PERMISSION_ERROR: 'Access Denied',
    VALIDATION_ERROR: 'Invalid Input',
    NOT_FOUND: 'Not Found',
    SERVER_ERROR: 'Server Error',
    TIMEOUT_ERROR: 'Request Timeout',
    UNKNOWN_ERROR: 'Error'
  };
  return titles[errorType] || 'Error';
}

export default {
  withTimeout,
  safeApiCall,
  batchApiCalls,
  debounceApiCall,
  createApiCache,
  formatApiError
};