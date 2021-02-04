import Head from 'next/head';
import { useRouter } from 'next/router';
import useProduct from '../../../src/hooks/product';

export default function ProductPage() {
  const router = useRouter();
  const { storeId, productId } = router.query;

  return (
    <>
      <Head>
        <title key="title">Product | Shop Backoffice</title>
      </Head>

      {storeId && productId ? (
        <ProductPageContent
          storeId={storeId as string}
          productId={productId as string}
        />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}

interface ProductPageContentProps {
  storeId: string;
  productId: string;
}

function ProductPageContent({ storeId, productId }: ProductPageContentProps) {
  const { data: product, isLoading, isError } = useProduct(storeId, productId);

  if (isLoading) {
    return <strong>Loading...</strong>;
  }

  if (isError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <>
      <Head>
        <title key="title">{product?.title} | Shop Backoffice</title>
      </Head>

      <span>{product?.title}</span>
    </>
  );
}
