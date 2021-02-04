import Store from '../domain/store';
import { useApi } from './_hooks_utils';

export default function useStores() {
  // TODO: error type
  return useApi<Store[]>(`/api/stores`);
}
