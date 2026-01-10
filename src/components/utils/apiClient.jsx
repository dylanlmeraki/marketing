import { base44 } from "@/api/base44Client";

/**
 * API Client Abstraction Layer
 * 
 * This module provides a centralized interface for all backend API calls.
 * Currently wraps Base44 SDK calls, but designed for easy transition to Node.js backend.
 * 
 * MIGRATION STRATEGY:
 * When moving to Node.js backend, replace the implementations within this file
 * with standard fetch() calls to your custom API endpoints. Frontend components
 * using apiClient will require no changes.
 * 
 * Example migration:
 * BEFORE: return await base44.entities.BlogPost.filter(query, sort, limit);
 * AFTER:  return await fetch('/api/blogposts?sort=...&limit=...').then(r => r.json());
 */

export const apiClient = {
  // ========================================
  // ENTITY OPERATIONS
  // ========================================
  entities: {
    /**
     * BlogPost Entity Operations
     * Node.js Migration: Replace with fetch('/api/blogposts')
     */
    BlogPost: {
      list: async (sort = '-created_date', limit = 50, query = {}) => {
        // TODO: Replace with fetch('/api/blogposts?sort=...&limit=...&query=...')
        return await base44.entities.BlogPost.filter(query, sort, limit);
      },
      get: async (slug) => {
        // TODO: Replace with fetch(`/api/blogposts/${slug}`)
        const posts = await base44.entities.BlogPost.filter({ slug }, '-created_date', 1);
        return posts[0] || null;
      },
    },

    /**
     * User Entity Operations
     * Node.js Migration: Replace with fetch('/api/me')
     */
    User: {
      me: async () => {
        // TODO: Replace with fetch('/api/me')
        try {
          return await base44.auth.me();
        } catch (error) {
          return null;
        }
      },
    },

    /**
     * Project Entity Operations (Currently uses local data)
     * Node.js Migration: Replace with fetch('/api/projects')
     * 
     * NOTE: Project data currently lives in components/data/projectsData.js
     * This will eventually be moved to the backend database.
     */
    Project: {
      list: async (sort = '-created_date', limit = 50, query = {}) => {
        // TODO: Replace with fetch('/api/projects?sort=...&limit=...')
        console.warn("Project.list: Using local data from projectsData.js. Will be replaced by backend API.");
        return [];
      },
      get: async (slug) => {
        // TODO: Replace with fetch(`/api/projects/${slug}`)
        console.warn("Project.get: Using local data from projectsData.js. Will be replaced by backend API.");
        return null;
      }
    }
  },

  // ========================================
  // INTEGRATION OPERATIONS
  // ========================================
  integrations: {
    Core: {
      /**
       * LLM AI Integration
       * Node.js Migration: Replace with fetch('/api/ai/invoke')
       */
// components/utils/apiClient.jsx
InvokeLLM: async (params) => {
  const response = await fetch("/functions/invokeLLM", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
},


      /**
       * File Upload Integration
       * Node.js Migration: Replace with fetch('/api/files/upload')
       */
      UploadFile: async (file) => {
        // TODO: Replace with fetch('/api/files/upload', { method: 'POST', body: formData })
        return await base44.integrations.Core.UploadFile(file);
      },

      /**
       * Email Sending Integration
       * Node.js Migration: Replace with fetch('/api/email/send')
       */
      SendEmail: async (params) => {
        // TODO: Replace with fetch('/api/email/send', { method: 'POST', body: JSON.stringify(params) })
        return await base44.integrations.Core.SendEmail(params);
      },
    },
  },

  // ========================================
  // FUNCTION/ENDPOINT OPERATIONS
  // ========================================
  functions: {
    /**
     * Contact Form Email Handler
     * Node.js Migration: Replace with fetch('/api/contact')
     */
    sendContactFormEmail: async (data) => {
      // TODO: Replace with fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      const response = await fetch('/functions/sendContactFormEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },

    /**
     * Consultation Form Email Handler
     * Node.js Migration: Replace with fetch('/api/consultation')
     */
    sendSWPPPFormEmail: async (data) => {
      // TODO: Replace with fetch('/api/consultation', { method: 'POST', body: JSON.stringify(data) })
      const response = await fetch('/functions/sendSWPPPFormEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },

    /**
     * Chatbot Activity Logger
     * Node.js Migration: Replace with fetch('/api/analytics/chatbot')
     */
    logChatbotActivity: async (data) => {
      // TODO: Replace with fetch('/api/analytics/chatbot', { method: 'POST', body: JSON.stringify(data) })
      const response = await fetch('/functions/logChatbotActivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }
  },
};