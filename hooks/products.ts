import useSWR from 'swr';
import Product from '../domain/product';
import fetcher from '../helpers/fetcher';

export default function useProducts(storeId: string) {
  // TODO: error type
  const { data, error } = useSWR<Product[]>(
    `/api/stores/${storeId}/products`,
    fetcher,
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}
