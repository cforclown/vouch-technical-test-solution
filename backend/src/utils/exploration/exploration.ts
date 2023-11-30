import Joi from 'joi';
import { IPaginationPayload, IPaginationResponse, PaginationDto, PaginationPayloadSwaggerSchemas } from './pagination';

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

export const ExplorationPayloadSchema = Joi.object({
  query: Joi.string().allow(null, '').default(null),
  pagination: PaginationDto.required()
});

export const ExplorationSwaggerSchemas = {
  explorationPayload: {
    query: { type: 'string' },
    pagination: { ...PaginationPayloadSwaggerSchemas }
  }
};
