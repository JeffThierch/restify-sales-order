import HttpClient from '@/services/http-client'

class OrdersAPI extends HttpClient {
  async getAllOrders() {
    const response = await this.http.get('/orders')
    return response.data
  }

  async saveOrder(data: Record<string, string>) {
    const response = await this.http.post('/orders', data)
    return response.data
  }

  async updateOrder({ id, ...data }: { id: number; [key: string]: any }) {
    const response = await this.http.put('/orders/' + id, data)
    return response.data
  }

  async deleteOrder(id: any) {
    const response = await this.http.delete('/orders/' + id)
    return response.data
  }

  async getById(id: number) {
    const response = await this.http.get('/orders/' + id)
    return response.data
  }
}

export default () => new OrdersAPI()
