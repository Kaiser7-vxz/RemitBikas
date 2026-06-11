// frontend/src/lib/api.ts
import { API_URL } from './constants';

class ApiClient {
  private getToken() { return localStorage.getItem('token'); }
  private getHeaders(isFormData = false) {
    const headers: Record<string, string> = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    const isFormData = options.body instanceof FormData;
    const headers = { ...this.getHeaders(isFormData), ...options.headers };
    let response: Response;
    try {
      response = await fetch(url, { ...options, headers });
    } catch {
      throw new Error('Cannot reach server. Make sure backend is running.');
    }
    let data: { success?: boolean; message?: string; data?: T };
    try {
      data = await response.json();
    } catch {
      throw new Error('Invalid response from server.');
    }
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data.data as T;
  }

  // Auth
  async login(credentials: any) { return this.request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }); }
  async signup(data: any) { return this.request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }); }
  async getMe() { return this.request('/auth/me'); }

  // Projects
  async getProjects(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/projects${query}`);
  }
  async getProjectById(id: string) { return this.request(`/projects/${id}`); }
  async deleteProject(id: string) { return this.request(`/projects/${id}`, { method: 'DELETE' }); }

  // Contributions
  async createContribution(data: any) { return this.request('/contributions', { method: 'POST', body: JSON.stringify(data) }); }
  async verifyPayment(data: any) { return this.request('/contributions/verify-payment', { method: 'POST', body: JSON.stringify(data) }); }
  async getUserInvestments() { return this.request('/contributions/user/my-contributions'); }

  // Dashboard
  async getDashboardData() { return this.request('/dashboard'); }

  // AI Chat
  async sendChatMessage(history: any[]) { return this.request('/chat', { method: 'POST', body: JSON.stringify({ messages: history }) }); }

  // Admin Dashboard
  async getAdminCitizens() { return this.request('/admin/citizens'); }
  async getAdminInvestments() { return this.request('/admin/investments'); }
  async getAdminTransparency() { return this.request('/admin/transparency'); }
  async getAdminAnalytics() { return this.request('/admin/analytics'); }
  async getAdminSettings() { return this.request('/admin/settings'); }
  async updateAdminProfile(data: any) { return this.request('/admin/settings/profile', { method: 'PUT', body: JSON.stringify(data) }); }
}

export const api = new ApiClient();

// ===== VOTE API (integrated with projects) =====
export const voteApi = {
  cast: (projectId: string, value: number) =>
    api.request(`/projects/${projectId}/vote`, { method: 'POST', body: JSON.stringify({ value }) }),
  getProjectVotes: (projectId: string) =>
    api.request(`/projects/${projectId}/vote`),
  delete: (projectId: string) =>
    api.request(`/projects/${projectId}/vote`, { method: 'DELETE' }),
};