import Head from 'next/head';
import Alert from '@material-ui/lab/Alert';
import StoreCard from '../src/components/stores/StoreCard';
import PageTitle from '../src/components/PageTitle';
import useStores from '../src/hooks/stores';
import CenterProgressIndicator from '../src/components/CenterProgressIndicator';

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
    return <CenterProgressIndicator />;
  }

  if (isError) {
    return (
      <Alert severity="error">An error occured while loading stores!</Alert>
    );
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
