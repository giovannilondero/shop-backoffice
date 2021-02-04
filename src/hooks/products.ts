import Product from '../domain/product';
import { useApi } from './_hooks_utils';

export default function useProducts(storeId: string) {
  // TODO: error type
  return useApi<Product[]>(`/api/stores/${storeId}/products`);
}
