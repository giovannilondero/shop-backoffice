import Store from '../domain/store';
import { useApi } from './_hooks_utils';

export default function useStore(id: string) {
  // TODO: error type
  return useApi<Store>(`/api/stores/${id}`);
}
