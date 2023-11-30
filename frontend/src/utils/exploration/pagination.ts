export enum PaginationSortOrders {
  ASC = 1,
  DESC = -1
}

export interface IPaginationSort {
  by: string;
  order?: PaginationSortOrders;
}

export interface IPaginationPayload {
  page: number;
  limit: number;
  sort: IPaginationSort;
}

export interface IPaginationResponse extends IPaginationPayload {
  pageCount: number;
}
