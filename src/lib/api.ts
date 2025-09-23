import { Cliente, DashboardStats, CreateClientData, UpdateClientData, ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.json();
  },

  // Dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    return fetchApi<DashboardStats>('/clients/stats');
  },

  // Clients CRUD
  async getClients(params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<ApiResponse<Cliente>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return fetchApi<ApiResponse<Cliente>>(`/clients${queryString ? `?${queryString}` : ''}`);
  },

  async getClient(id: number): Promise<Cliente> {
    return fetchApi<Cliente>(`/clients/${id}`);
  },

  async createClient(data: CreateClientData): Promise<Cliente> {
    return fetchApi<Cliente>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateClient(id: number, data: UpdateClientData): Promise<Cliente> {
    return fetchApi<Cliente>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteClient(id: number): Promise<void> {
    await fetchApi(`/clients/${id}`, {
      method: 'DELETE',
    });
  },
};

export { ApiError };