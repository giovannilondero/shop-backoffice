import useSWR from 'swr';
import Product from '../domain/product';
import fetcher from '../helpers/fetcher';

export default function useProduct(storeId: string, productId: string) {
  // TODO: error type
  const { data, error } = useSWR<Product>(
    `/api/stores/${storeId}/products/${productId}`,
    fetcher,
  );

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
}
