import { AuthSwaggerSchemas, ChannelsSwaggerSchemas, MessagesSwaggerSchemas, UsersSwaggerSchemas } from '../modules';
import { explorationSwaggerSchemas, PaginationPayloadSwaggerSchemas } from '../utils';

const schemas = Object.assign(
  { ...explorationSwaggerSchemas },
  { ...PaginationPayloadSwaggerSchemas },
  { ...AuthSwaggerSchemas },
  { ...UsersSwaggerSchemas },
  { ...ChannelsSwaggerSchemas },
  { ...MessagesSwaggerSchemas }
);

export default schemas;
