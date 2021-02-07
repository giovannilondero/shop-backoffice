import Head from 'next/head';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import { Box } from '@material-ui/core';
import CenterProgressIndicator from '../../src/components/CenterProgressIndicator';
import PageTitle from '../../src/components/PageTitle';
import useStore from '../../src/hooks/store';
import ProductsList from '../../src/components/products/ProductsList';
import StoreDetails from '../../src/components/stores/StoreDetails';
import StoreCategoriesChart from '../../src/components/stores/StoreCategoriesChart';
import useCategories from '../../src/hooks/categories';

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
  const { data: store, isError, isLoading } = useStore(storeId);
  const { data: categories } = useCategories(storeId);

  if (isLoading) {
    return <CenterProgressIndicator />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        An error occured while loading store details!
      </Alert>
    );
  }

  if (!store) {
    return <Alert severity="error">Store not found!</Alert>;
  }

  return (
    <>
      <Head>
        <title key="title">{store.name} | Shop Backoffice</title>
      </Head>

      <main>
        <PageTitle>{store.name}</PageTitle>
        <StoreDetails store={store} />
        {categories && (
          <Box mb={6}>
            <StoreCategoriesChart statsCategories={categories} />
          </Box>
        )}
        <ProductsList storeId={storeId as string} />
      </main>
    </>
  );
}
