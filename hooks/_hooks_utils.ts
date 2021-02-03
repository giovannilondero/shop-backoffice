import useSWR from 'swr';
import fetcher from '../helpers/fetcher';

// eslint-disable-next-line import/prefer-default-export
export function useApi<D = any, E = any>(path: string) {
  const { data, error } = useSWR<D, E>(path, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
