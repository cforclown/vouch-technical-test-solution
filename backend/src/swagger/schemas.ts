import { AuthSwaggerSchemas, ChannelsSwaggerSchemas, UsersSwaggerSchemas } from '../modules';
import { ExplorationSwaggerSchemas, PaginationPayloadSwaggerSchemas } from '../utils';

const schemas = Object.assign(
  { ...ExplorationSwaggerSchemas },
  { ...PaginationPayloadSwaggerSchemas },
  { ...AuthSwaggerSchemas },
  { ...UsersSwaggerSchemas },
  { ...ChannelsSwaggerSchemas }
);

export default schemas;
