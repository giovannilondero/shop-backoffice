import { StoreData } from '../domain/store';
import { useApi } from './_hooks_utils';

export default function useStore(id: string = '') {
  // TODO: error type
  // ! API docs are wrong. This API should return a Store, while it returns StoreData
  return useApi<StoreData>(`/api/stores/${id}`);
}
