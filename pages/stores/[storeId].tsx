import Head from 'next/head';
import { useRouter } from 'next/router';
// import useProducts from '../../hooks/products';
import useStore from '../../hooks/store';

export default function StorePage() {
  return (
    <>
      <Head>
        <title> | Shop Backoffice</title>
      </Head>

      <StorePageContent />
    </>
  );
}

function StorePageContent() {
  const router = useRouter();
  const { storeId } = router.query;
  const {
    data: store,
    isError: isStoreError,
    isLoading: isStoreLoading,
  } = useStore(storeId as string);
  // const {
  //   data: products,
  //   isError: isProductsError,
  //   isLoading: isProductsLoading,
  // } = useProducts(storeId as string);

  if (isStoreLoading) {
    return <strong>Loading...</strong>;
  }

  if (isStoreError) {
    return <strong>Error!!!</strong>;
  }

  return <main>{store?.name}</main>;
}
