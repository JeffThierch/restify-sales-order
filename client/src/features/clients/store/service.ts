import HttpClient from '@/services/http-client'

class ClientsAPI extends HttpClient {
  async getAllClients() {
    const response = await this.http.get('/clients')
    return response.data
  }
  async saveClient(data: Record<string, string>) {
    const response = await this.http.post('/clients', data)
    return response.data
  }
  async updateClient({ id, ...data }: { id: number; [key: string]: any }) {
    const response = await this.http.put('/clients/' + id, data)
    return response.data
  }
  async deleteClient(id: any) {
    const response = await this.http.delete('/clients/' + id)
    return response.data
  }
}

export default () => new ClientsAPI()
