import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CenterProgressIndicator from '../src/components/CenterProgressIndicator';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/stores');
  }, []);

  return (
    <>
      <Head>
        <title>Shop Backoffice</title>
        {/* TODO: change favicon */}
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <CenterProgressIndicator />
    </>
  );
}
