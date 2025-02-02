import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    // Конструктор принимает базовый URL API
    constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${import.meta.env.VITE_PUBLIC_API_TOKEN}`
            },
        });
    }

    // Create: Добавить новый ресурс (POST)
    async create<T>(endpoint: string, data: T): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка при создании ресурса: ${error}`);
        }
    }

    // Read: Получить ресурс по ID (GET)
    async read<T>(endpoint: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка при получении данных: ${error}`);
        }
    }

    // Update: Обновить ресурс (PUT)
    async update<T>(endpoint: string, data: T): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.patch(endpoint, data);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка при обновлении ресурса: ${error}`);
        }
    }

    // Delete: Удалить ресурс (DELETE)
    async delete(endpoint: string): Promise<void> {
        try {
            await this.axiosInstance.delete(endpoint);
        } catch (error) {
            throw new Error(`Ошибка при удалении ресурса: ${error}`);
        }
    }
}
