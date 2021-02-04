import { ProductData } from '../domain/product';
import { useApi } from './_hooks_utils';

export default function useProduct(storeId: string, productId: string) {
  // TODO: error type
  return useApi<ProductData>(`/api/stores/${storeId}/products/${productId}`);
}
