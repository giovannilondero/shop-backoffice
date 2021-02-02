import useSWR from 'swr';
import Store from '../domain/store';
import fetcher from '../helpers/fetcher';

export default function useStores() {
  // TODO: error type
  const { data, error } = useSWR<Store[]>(`/api/stores`, fetcher);

  return {
    stores: data,
    isLoading: !error && !data,
    isError: error,
  };
}
