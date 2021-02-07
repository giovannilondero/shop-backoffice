import Head from 'next/head';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import CenterProgressIndicator from '../../src/components/CenterProgressIndicator';
import PageTitle from '../../src/components/PageTitle';
import ProductCardList from '../../src/components/products/ProductCardList';
import useProducts from '../../src/hooks/products';
import useStore from '../../src/hooks/store';
import ProductDeleteAlertDialog from '../../src/components/products/ProductDeleteAlertDialog';
import Product from '../../src/domain/product';

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
    return (
      <Alert severity="error">
        An error occured while loading store details!
      </Alert>
    );
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
  const { data: products, isError, isLoading, mutate } = useProducts(storeId);
  // TODO: extract the entire logic for the DeleteAlert open/close and product to delete
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product>();

  if (isLoading) {
    return <CenterProgressIndicator />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        An error occured while loading store products!
      </Alert>
    );
  }

  const openDeleteAlert = () => {
    setDeleteAlertOpen(true);
  };
  const closeDeleteAlert = () => {
    setDeleteAlertOpen(false);
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    openDeleteAlert();
  };

  const handleDeleteAlertClose = (confirmed: boolean) => {
    if (confirmed && productToDelete) {
      mutate(async () => {
        await fetch(`/api/stores/${storeId}/products/${productToDelete.id}`, {
          method: 'DELETE',
        });

        return products?.filter((prod) => prod.id !== productToDelete.id);
      });
    }

    closeDeleteAlert();
    setProductToDelete(undefined);
  };

  return (
    <>
      <ProductCardList
        products={products!}
        onProductDelete={handleDeleteProduct}
      />
      <ProductDeleteAlertDialog
        open={deleteAlertOpen}
        handleClose={handleDeleteAlertClose}
      />
    </>
  );
}
