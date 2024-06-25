export interface BaseRepositoryInterface<T> {
  index(): Promise<T[]>;
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<{ id: number }>;
  findById(id: number): Promise<T | null>;
}

export interface BaseServiceInterface<T> {
  index(): Promise<T[]>;
  create(data: T): Promise<T>;
  update(id: number, data: T): Promise<T>;
  delete(id: number): Promise<{ id: number }>;
  findById(id: number): Promise<T | null>;
}
