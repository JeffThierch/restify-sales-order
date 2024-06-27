import HttpClient from '@/services/http-client'

class ProductsAPI extends HttpClient {
  async getAllProducts() {
    const response = await this.http.get('/products')
    return response.data
  }
  async saveProduct(data: Record<string, string>) {
    const response = await this.http.post('/products', data)
    return response.data
  }
  async updateProduct({ id, ...data }: { id: number; [key: string]: any }) {
    const response = await this.http.put('/products/' + id, data)
    return response.data
  }
  async deleteProduct(id: any) {
    const response = await this.http.delete('/products/' + id)
    return response.data
  }
}

export default () => new ProductsAPI()
