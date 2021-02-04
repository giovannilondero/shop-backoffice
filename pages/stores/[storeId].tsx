import Head from 'next/head';
import Link from 'next/link';
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
  const { data: store, isError, isLoading } = useStore(storeId as string);

  if (isLoading) {
    return <strong>Loading...</strong>;
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
  const { data: products, isError, isLoading } = useProducts(storeId);

  if (isLoading) {
    return <strong>Loading...</strong>;
  }

  if (isError) {
    return <strong>Error!!!</strong>;
  }

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>
          <Link href={`/stores/${storeId}/${product.id}`}>
            <a>
              {product.data.title}
              <br />
              {product.data.price}
              <br />
              {product.data.employee}
              <br />
              {product.data.category}
              <br />
              {product.data.description}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
