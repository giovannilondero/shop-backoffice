import { CircularProgress } from '@material-ui/core';
import Head from 'next/head';
import Center from '../src/components/Center';
import StoreCard from '../src/components/StoreCard';
import PageTitle from '../src/components/PageTitle';
import useStores from '../src/hooks/stores';

export default function StoresPage() {
  return (
    <>
      <Head>
        <title>Stores | Shop Backoffice</title>
      </Head>

      <StoresPageContent />
    </>
  );
}

function StoresPageContent() {
  const { data: stores, isError, isLoading } = useStores();

  if (isLoading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  if (isError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <main>
      <PageTitle>Stores</PageTitle>

      {stores?.map((store) => (
        <StoreCard key={store.id} store={store} to={`/stores/${store.id}`} />
      ))}
    </main>
  );
}
