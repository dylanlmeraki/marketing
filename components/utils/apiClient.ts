import type {
  User,
  BlogPost,
  Project,
  Notification,
  SystemLog,
  LLMRequest,
  LLMResponse,
  SendEmailRequest,
  SendEmailResponse,
  Contact,
  Prospect,
  FormSubmission,
  EmailTemplateType,
  ContactSource,
} from '@/types';

interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  services?: string[];
  source?: ContactSource;
}

interface SWPPPFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  projectLocation?: string;
  projectDescription?: string;
  startDate?: string;
  additionalInfo?: string;
  source?: ContactSource;
}

interface ChatbotActivityData {
  sessionId: string;
  userMessage: string;
  botResponse: string;
  timestamp: string;
  userEmail?: string;
  convertedToLead?: boolean;
}

interface EntityQuery {
  [key: string]: string | number | boolean | undefined;
}

interface BlogPostOperations {
  list: (sort?: string, limit?: number, query?: EntityQuery) => Promise<BlogPost[]>;
  get: (slug: string) => Promise<BlogPost | null>;
}

interface UserOperations {
  me: () => Promise<User | null>;
}

interface ProjectOperations {
  list: (sort?: string, limit?: number, query?: EntityQuery) => Promise<Project[]>;
  get: (slug: string) => Promise<Project | null>;
}

interface NotificationOperations {
  filter: (query?: EntityQuery, sort?: string, limit?: number) => Promise<Notification[]>;
  update: (id: string, data: Partial<Notification>) => Promise<Notification | null>;
  markAsRead: (id: string) => Promise<Notification | null>;
  markAllAsRead: () => Promise<boolean>;
}

interface SystemLogOperations {
  create: (data: Omit<SystemLog, 'id' | 'createdAt'>) => Promise<SystemLog | null>;
}

interface ContactOperations {
  list: (query?: EntityQuery) => Promise<Contact[]>;
  get: (id: string) => Promise<Contact | null>;
  create: (data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Contact | null>;
  update: (id: string, data: Partial<Contact>) => Promise<Contact | null>;
}

interface ProspectOperations {
  list: (query?: EntityQuery) => Promise<Prospect[]>;
  get: (id: string) => Promise<Prospect | null>;
  create: (data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Prospect | null>;
  update: (id: string, data: Partial<Prospect>) => Promise<Prospect | null>;
  updateStage: (id: string, stage: Prospect['stage']) => Promise<Prospect | null>;
  updateScore: (id: string, score: Prospect['score']) => Promise<Prospect | null>;
}

interface FormSubmissionOperations {
  list: (query?: EntityQuery) => Promise<FormSubmission[]>;
  get: (id: string) => Promise<FormSubmission | null>;
  create: (data: Omit<FormSubmission, 'id' | 'createdAt'>) => Promise<FormSubmission | null>;
  markProcessed: (id: string, contactId?: string) => Promise<FormSubmission | null>;
}

interface CoreIntegrations {
  InvokeLLM: (params: LLMRequest) => Promise<string | object>;
  UploadFile: (params: { file: File }) => Promise<FileUploadResponse>;
  SendEmail: (params: SendEmailRequest) => Promise<SendEmailResponse>;
  SendTemplatedEmail: (
    templateType: EmailTemplateType,
    to: string | string[],
    variables: Record<string, string>,
    options?: { replyTo?: string; cc?: string[]; bcc?: string[] }
  ) => Promise<SendEmailResponse>;
}

interface AuthOperations {
  isAuthenticated: () => Promise<boolean>;
  me: () => Promise<User | null>;
  getInternalPortalToken: () => Promise<string | null>;
}

interface FunctionOperations {
  sendContactFormEmail: (data: ContactFormData) => Promise<{ success: boolean; messageId?: string }>;
  sendSWPPPFormEmail: (data: SWPPPFormData) => Promise<{ success: boolean; messageId?: string }>;
  logChatbotActivity: (data: ChatbotActivityData) => Promise<{ success: boolean }>;
  submitFormToInternalPortal: (formData: FormSubmission) => Promise<{ success: boolean; contactId?: string }>;
}

interface CRMOperations {
  contacts: ContactOperations;
  prospects: ProspectOperations;
  formSubmissions: FormSubmissionOperations;
  getSalesFunnelStats: () => Promise<{
    totalProspects: number;
    hotLeads: number;
    pipelineValue: number;
    conversionRate: number;
  }>;
}

interface APIClient {
  entities: {
    BlogPost: BlogPostOperations;
    User: UserOperations;
    Project: ProjectOperations;
    Notification: NotificationOperations;
    SystemLog: SystemLogOperations;
  };
  auth: AuthOperations;
  integrations: {
    Core: CoreIntegrations;
  };
  functions: FunctionOperations;
  crm: CRMOperations;
}

const INTERNAL_PORTAL_URL = import.meta.env.VITE_INTERNAL_PORTAL_URL || '';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error((error as { error?: string }).error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
}

export const apiClient: APIClient = {
  entities: {
    BlogPost: {
      list: async (_sort = '-created_date', _limit = 50, _query = {}): Promise<BlogPost[]> => {
        if (INTERNAL_PORTAL_URL) {
          try {
            return await fetchJSON<BlogPost[]>(`${INTERNAL_PORTAL_URL}/api/blog-posts`);
          } catch (error) {
            console.warn('BlogPost.list: Failed to fetch from internal portal', error);
          }
        }
        return [];
      },
      get: async (slug: string): Promise<BlogPost | null> => {
        if (INTERNAL_PORTAL_URL) {
          try {
            return await fetchJSON<BlogPost>(`${INTERNAL_PORTAL_URL}/api/blog-posts/${slug}`);
          } catch (error) {
            console.warn('BlogPost.get: Failed to fetch from internal portal', error);
          }
        }
        return null;
      },
    },

    User: {
      me: async (): Promise<User | null> => {
        return null;
      },
    },

    Project: {
      list: async (_sort = '-created_date', _limit = 50, _query = {}): Promise<Project[]> => {
        return [];
      },
      get: async (_slug: string): Promise<Project | null> => {
        return null;
      },
    },

    Notification: {
      filter: async (_query = {}, _sort = '-created_at', _limit = 50): Promise<Notification[]> => {
        return [];
      },
      update: async (_id: string, _data: Partial<Notification>): Promise<Notification | null> => {
        return null;
      },
      markAsRead: async (_id: string): Promise<Notification | null> => {
        return null;
      },
      markAllAsRead: async (): Promise<boolean> => {
        return true;
      },
    },

    SystemLog: {
      create: async (data: Omit<SystemLog, 'id' | 'createdAt'>): Promise<SystemLog | null> => {
        console.log('SystemLog.create:', data);
        return null;
      },
    },
  },

  auth: {
    isAuthenticated: async (): Promise<boolean> => {
      return false;
    },
    me: async (): Promise<User | null> => {
      return null;
    },
    getInternalPortalToken: async (): Promise<string | null> => {
      return null;
    },
  },

  integrations: {
    Core: {
      InvokeLLM: async (params: LLMRequest): Promise<string | object> => {
        const result = await fetchJSON<LLMResponse>('/api/invoke-llm', {
          method: 'POST',
          body: JSON.stringify(params),
        });
        return result.content;
      },

      UploadFile: async ({ file }: { file: File }): Promise<FileUploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-file', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({ error: 'Upload failed' }));
          throw new Error((error as { error?: string }).error || `HTTP error! status: ${response.status}`);
        }

        return response.json() as Promise<FileUploadResponse>;
      },

      SendEmail: async (params: SendEmailRequest): Promise<SendEmailResponse> => {
        return fetchJSON<SendEmailResponse>('/api/send-email', {
          method: 'POST',
          body: JSON.stringify(params),
        });
      },

      SendTemplatedEmail: async (
        templateType: EmailTemplateType,
        to: string | string[],
        variables: Record<string, string>,
        options?: { replyTo?: string; cc?: string[]; bcc?: string[] }
      ): Promise<SendEmailResponse> => {
        return fetchJSON<SendEmailResponse>('/api/send-email', {
          method: 'POST',
          body: JSON.stringify({
            templateType,
            to,
            variables,
            ...options,
          }),
        });
      },
    },
  },

  functions: {
    sendContactFormEmail: async (data: ContactFormData): Promise<{ success: boolean; messageId?: string }> => {
      return fetchJSON('/api/sendContactFormEmail', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          templateType: 'contact_form_submission' as EmailTemplateType,
        }),
      });
    },

    sendSWPPPFormEmail: async (data: SWPPPFormData): Promise<{ success: boolean; messageId?: string }> => {
      return fetchJSON('/api/sendSWPPPFormEmail', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          templateType: 'swppp_form_submission' as EmailTemplateType,
        }),
      });
    },

    logChatbotActivity: async (data: ChatbotActivityData): Promise<{ success: boolean }> => {
      console.log('Chatbot activity:', data);
      
      if (INTERNAL_PORTAL_URL) {
        try {
          await fetchJSON(`${INTERNAL_PORTAL_URL}/api/chatbot-activity`, {
            method: 'POST',
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.warn('Failed to log chatbot activity to internal portal', error);
        }
      }
      
      return { success: true };
    },

    submitFormToInternalPortal: async (formData: FormSubmission): Promise<{ success: boolean; contactId?: string }> => {
      if (!INTERNAL_PORTAL_URL) {
        console.warn('Internal portal URL not configured');
        return { success: false };
      }

      try {
        return await fetchJSON(`${INTERNAL_PORTAL_URL}/api/form-submissions`, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error('Failed to submit form to internal portal', error);
        return { success: false };
      }
    },
  },

  crm: {
    contacts: {
      list: async (_query = {}): Promise<Contact[]> => {
        if (!INTERNAL_PORTAL_URL) return [];
        try {
          return await fetchJSON<Contact[]>(`${INTERNAL_PORTAL_URL}/api/contacts`);
        } catch {
          return [];
        }
      },
      get: async (id: string): Promise<Contact | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Contact>(`${INTERNAL_PORTAL_URL}/api/contacts/${id}`);
        } catch {
          return null;
        }
      },
      create: async (data): Promise<Contact | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Contact>(`${INTERNAL_PORTAL_URL}/api/contacts`, {
            method: 'POST',
            body: JSON.stringify(data),
          });
        } catch {
          return null;
        }
      },
      update: async (id: string, data): Promise<Contact | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Contact>(`${INTERNAL_PORTAL_URL}/api/contacts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
          });
        } catch {
          return null;
        }
      },
    },

    prospects: {
      list: async (_query = {}): Promise<Prospect[]> => {
        if (!INTERNAL_PORTAL_URL) return [];
        try {
          return await fetchJSON<Prospect[]>(`${INTERNAL_PORTAL_URL}/api/prospects`);
        } catch {
          return [];
        }
      },
      get: async (id: string): Promise<Prospect | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Prospect>(`${INTERNAL_PORTAL_URL}/api/prospects/${id}`);
        } catch {
          return null;
        }
      },
      create: async (data): Promise<Prospect | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Prospect>(`${INTERNAL_PORTAL_URL}/api/prospects`, {
            method: 'POST',
            body: JSON.stringify(data),
          });
        } catch {
          return null;
        }
      },
      update: async (id: string, data): Promise<Prospect | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Prospect>(`${INTERNAL_PORTAL_URL}/api/prospects/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
          });
        } catch {
          return null;
        }
      },
      updateStage: async (id: string, stage): Promise<Prospect | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Prospect>(`${INTERNAL_PORTAL_URL}/api/prospects/${id}/stage`, {
            method: 'PATCH',
            body: JSON.stringify({ stage }),
          });
        } catch {
          return null;
        }
      },
      updateScore: async (id: string, score): Promise<Prospect | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<Prospect>(`${INTERNAL_PORTAL_URL}/api/prospects/${id}/score`, {
            method: 'PATCH',
            body: JSON.stringify({ score }),
          });
        } catch {
          return null;
        }
      },
    },

    formSubmissions: {
      list: async (_query = {}): Promise<FormSubmission[]> => {
        if (!INTERNAL_PORTAL_URL) return [];
        try {
          return await fetchJSON<FormSubmission[]>(`${INTERNAL_PORTAL_URL}/api/form-submissions`);
        } catch {
          return [];
        }
      },
      get: async (id: string): Promise<FormSubmission | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<FormSubmission>(`${INTERNAL_PORTAL_URL}/api/form-submissions/${id}`);
        } catch {
          return null;
        }
      },
      create: async (data): Promise<FormSubmission | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<FormSubmission>(`${INTERNAL_PORTAL_URL}/api/form-submissions`, {
            method: 'POST',
            body: JSON.stringify(data),
          });
        } catch {
          return null;
        }
      },
      markProcessed: async (id: string, contactId?: string): Promise<FormSubmission | null> => {
        if (!INTERNAL_PORTAL_URL) return null;
        try {
          return await fetchJSON<FormSubmission>(`${INTERNAL_PORTAL_URL}/api/form-submissions/${id}/process`, {
            method: 'POST',
            body: JSON.stringify({ contactId }),
          });
        } catch {
          return null;
        }
      },
    },

    getSalesFunnelStats: async () => {
      if (!INTERNAL_PORTAL_URL) {
        return {
          totalProspects: 0,
          hotLeads: 0,
          pipelineValue: 0,
          conversionRate: 0,
        };
      }
      try {
        return await fetchJSON(`${INTERNAL_PORTAL_URL}/api/crm/stats`);
      } catch {
        return {
          totalProspects: 0,
          hotLeads: 0,
          pipelineValue: 0,
          conversionRate: 0,
        };
      }
    },
  },
};

export default apiClient;
