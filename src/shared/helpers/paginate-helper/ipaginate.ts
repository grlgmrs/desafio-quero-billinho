export interface IPaginate<T> {
  page: number;
  items: T[];
}

export interface IPaginateRepository<T> {
  findAndCount(options?: {
    relations?: string[];
    take?: number;
    skip?: number;
  }): Promise<[T[], number]>;
}
