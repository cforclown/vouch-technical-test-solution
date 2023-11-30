import { IPaginationPayload, IPaginationResponse } from './pagination';

export interface IExplorationPayload {
  query?: string;
  pagination: IPaginationPayload;
}

export interface IExplorationResponse<T> {
  data: T[],
  exploration: IExplorationPayload & {
    pagination: IPaginationResponse
  }
}
