import Head from 'next/head';
import { useRouter } from 'next/router';
import CenterProgressIndicator from '../../src/components/CenterProgressIndicator';
import PageTitle from '../../src/components/PageTitle';
import ProductCardList from '../../src/components/products/ProductCardList';
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
        <CenterProgressIndicator />
      )}
    </>
  );
}

interface StorePageContentProps {
  storeId: string;
}

function StorePageContent({ storeId }: StorePageContentProps) {
  const { data: store, isError, isLoading } = useStore(storeId as string);

  if (isLoading) {
    return <CenterProgressIndicator />;
  }

  if (isError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <>
      <Head>
        <title key="title">{store?.name} | Shop Backoffice</title>
      </Head>

      <main>
        <PageTitle>{store?.name}</PageTitle>
        <ProductsList storeId={storeId as string} />
      </main>
    </>
  );
}

interface ProductsListProps {
  storeId: string;
}

function ProductsList({ storeId }: ProductsListProps) {
  const { data: products, isError, isLoading } = useProducts(storeId);

  if (isLoading) {
    return <CenterProgressIndicator />;
  }

  if (isError) {
    return <strong>Error!!!</strong>;
  }

  return <ProductCardList products={products!} />;
}
