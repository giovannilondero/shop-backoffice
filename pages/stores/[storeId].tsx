import Head from 'next/head';
import { useRouter } from 'next/router';
import useProducts from '../../src/hooks/products';
import useStore from '../../src/hooks/store';

export default function StorePage() {
  const router = useRouter();
  const { storeId } = router.query;

  return (
    <>
      <Head>
        <title key="title">Store | Shop Backoffice</title>
      </Head>

      {storeId ? (
        <StorePageContent storeId={storeId as string} />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

interface StorePageContentProps {
  storeId: string;
}

function StorePageContent({ storeId }: StorePageContentProps) {
  const {
    data: store,
    isError: isStoreError,
    isLoading: isStoreLoading,
  } = useStore(storeId as string);

  if (isStoreLoading) {
    return <strong>Loading...</strong>;
  }

  if (isStoreError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <>
      <Head>
        <title key="title">{store?.name} | Shop Backoffice</title>
      </Head>

      <main>
        {store?.name}
        <ProductsList storeId={storeId as string} />
      </main>
    </>
  );
}

interface ProductsListProps {
  storeId: string;
}

function ProductsList({ storeId }: ProductsListProps) {
  const {
    data: products,
    isError: isProductsError,
    isLoading: isProductsLoading,
  } = useProducts(storeId);

  if (isProductsLoading) {
    return <strong>Loading...</strong>;
  }

  if (isProductsError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <ul>
      {products?.map((product) => (
        <div key={product.id}>
          {product.data.title}
          <br />
          {product.data.price}
          <br />
          {product.data.employee}
          <br />
          {product.data.category}
          <br />
          {product.data.description}
        </div>
      ))}
    </ul>
  );
}
