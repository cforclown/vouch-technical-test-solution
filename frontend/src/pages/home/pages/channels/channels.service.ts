import { callProtectedMainAPI, getAPIEndpoint } from '@/utils/call-api';

export const getChannels = () => callProtectedMainAPI(getAPIEndpoint('/channels'));
