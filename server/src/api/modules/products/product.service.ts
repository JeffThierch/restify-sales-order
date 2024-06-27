import { BaseServiceInterface } from "@/utils/interfaces";
import { ProductInterface } from "./product.model";
import ProductRepository, {
  ProductRepositoryInterface,
} from "./product.repository";

export interface ProductServiceInterface
  extends BaseServiceInterface<ProductInterface> {}

class ProductService implements ProductServiceInterface {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async index(): Promise<ProductInterface[]> {
    const products = await this.productRepository.index();

    return products;
  }

  async create(data: ProductInterface): Promise<ProductInterface> {
    const newProduct = await this.productRepository.create(data);

    return newProduct;
  }

  async update(id: number, data: ProductInterface): Promise<ProductInterface> {
    const product = await this.productRepository.findById(id);

    if (!product?.id) throw new Error("Product not found");

    const updatedProduct = await this.productRepository.update(
      product.id,
      data
    );

    return updatedProduct;
  }

  async delete(id): Promise<{ id: number }> {
    const product = await this.productRepository.findById(id);

    if (!product?.id) throw new Error("Product not found");

    const deleteProduct = await this.productRepository.delete(id);

    return deleteProduct;
  }

  async findById(id: number): Promise<ProductInterface | null> {
    const product = await this.productRepository.findById(id);

    if (!product) throw new Error("Product not found");

    return product;
  }
}

export default new ProductService(ProductRepository);
