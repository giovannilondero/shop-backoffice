import Head from 'next/head';
import StoreCard from '../components/StoreCard';
import useStores from '../hooks/stores';

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
    return <strong>Loading...</strong>;
  }

  if (isError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <main>
      {stores?.map((store) => (
        <StoreCard key={store.id} store={store} to={`/stores/${store.id}`} />
      ))}
    </main>
  );
}
