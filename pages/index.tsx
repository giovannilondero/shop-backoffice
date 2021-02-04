import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/stores');
  }, []);

  return (
    <div>
      <Head>
        <title>Shop Backoffice</title>
        {/* TODO: change favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Loading...</main>
    </div>
  );
}
