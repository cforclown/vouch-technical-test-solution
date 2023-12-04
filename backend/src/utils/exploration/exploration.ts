import Joi from 'joi';
import { IPaginationPayload, IPaginationResponse, PaginationDto, PaginationPayloadSwaggerSchemas } from './pagination';

export interface IExplorationPayload {
  query?: string;
  pagination: IPaginationPayload;
}

export const explorationPayloadSchema = Joi.object<IExplorationPayload>({
  query: Joi.string().allow(null, '').default(null),
  pagination: PaginationDto.required()
});

export interface IExplorationRes<T> {
  data: T[],
  exploration: IExplorationPayload & {
    pagination: IPaginationResponse
  }
}

export const explorationSwaggerSchemas = {
  explorationPayload: {
    query: { type: 'string' },
    pagination: { ...PaginationPayloadSwaggerSchemas }
  }
};
