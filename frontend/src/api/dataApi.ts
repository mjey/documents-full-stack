import apiClient from './apiClient';

export interface Document {
  id: string;
  name: string;
  content: string;
  size: string;
  created_at: string;
}

export interface Meta {
  current_page: number;
  limit: number;
  order: string;
  sort_by: string;
  total_documents: number;
  total_pages: number;
}

export interface PaginatedResponse {
  documents: Document[];
  meta: Meta;
}

export interface CreateDocumentPayload {
  name: string;
  content: string;
}

export interface UpdateDocumentPayload {
  name: string;
  content: string;
  size: number;
}

export const dataApi = {
  getDocuments: async (
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    order = 'desc',
    search = ''
  ): Promise<PaginatedResponse> => {
    const response = await apiClient.get<PaginatedResponse>('/documents', {
      params: { page, limit, sort_by: sortBy, order, search },
    });
    return response.data;
  },

  getDocumentById: async (id: string): Promise<Document> => {
    const response = await apiClient.get<Document>(`/documents/${id}`);
    return response.data;
  },

  createDocument: async (
    payload: CreateDocumentPayload
  ): Promise<Document> => {
    const response = await apiClient.post<Document>('/documents', payload);
    return response.data;
  },

  updateDocument: async (
    id: string,
    payload: UpdateDocumentPayload
  ): Promise<Document> => {
    const response = await apiClient.put<Document>(`/documents/${id}`, payload);
    return response.data;
  },

  deleteDocument: async (id: string): Promise<void> => {
    await apiClient.delete(`/documents/${id}`);
  },
};
