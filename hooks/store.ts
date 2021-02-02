import useSWR from 'swr';
import Store from '../domain/store';
import fetcher from '../helpers/fetcher';

export default function useStore(id: string) {
  // TODO: error type
  const { data, error } = useSWR<Store>(`/api/stores/${id}`, fetcher);

  return {
    store: data,
    isLoading: !error && !data,
    isError: error,
  };
}
