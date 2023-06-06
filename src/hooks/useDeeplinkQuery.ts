import { useQuery, UseQueryOptions } from 'react-query';

import { API, AuthData } from 'api/API';

export const DEEPLINK_QUERY_KEY = 'deeplink-query';

export const useDeeplinkQuery = (queryOptions?: UseQueryOptions<AuthData>) => {
  return useQuery<AuthData>(DEEPLINK_QUERY_KEY, () => API.fetchDeepLink(), {
    retry: false,
    cacheTime: 0,
    ...queryOptions,
  });
};
