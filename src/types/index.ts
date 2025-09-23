export interface Cliente {
  id: number;
  name: string;
  contact: string;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  amount: number;
  email?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  clients: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  amounts: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
}

export interface ApiResponse<T> {
  clients?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export type ClientStatus = 'PENDING' | 'PAID' | 'OVERDUE';

export interface CreateClientData {
  name: string;
  contact: string;
  dueDate: string;
  amount: number;
  email?: string;
  address?: string;
}

export interface UpdateClientData extends Partial<CreateClientData> {
  status?: ClientStatus;
}