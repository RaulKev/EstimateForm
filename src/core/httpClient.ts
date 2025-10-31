import { API_ENVS } from "@/features/estimate/config/apiConfig";

interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

class HttpClient implements IHttpClient {
  private baseUrl: string;
  constructor() {
    this.baseUrl = API_ENVS.url.qa;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      throw new Error('Error al obtener datos');
    }
    return response.json();
  }

  async post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
    console.log(response, 'response');
    if (!response.ok) {
      console.log(response, 'error');
      throw new Error('Error al enviar petición');
    }
    return response.json();
  }
}

export const httpClient = new HttpClient();
