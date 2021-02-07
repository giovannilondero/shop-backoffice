import StatsCategory from '../domain/stats_category';
import { useApi } from './_hooks_utils';

export default function useCategories(storeId: string) {
  // TODO: error type
  return useApi<StatsCategory[]>(`/api/stores/${storeId}/stats/categories`);
}
