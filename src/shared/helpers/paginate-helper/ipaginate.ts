export interface IPaginate<T> {
  page: number;
  items: T[];
}
export interface IPaginateOptions {
  relations?: string[];
  take?: number;
  skip?: number;
}

export interface IPaginateRepository<T> {
  findAndCount(options: IPaginateOptions): Promise<[T[], number]>;
}
