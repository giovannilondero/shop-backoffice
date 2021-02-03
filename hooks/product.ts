import Product from '../domain/product';
import { useApi } from './_hooks_utils';

export default function useProduct(storeId: string, productId: string) {
  // TODO: error type
  return useApi<Product>(`/api/stores/${storeId}/products/${productId}`);
}
