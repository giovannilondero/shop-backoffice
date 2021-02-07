import Head from 'next/head';
import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import CenterProgressIndicator from '../../src/components/CenterProgressIndicator';
import PageTitle from '../../src/components/PageTitle';
import ProductCardList from '../../src/components/products/ProductCardList';
import useProducts from '../../src/hooks/products';
import useStore from '../../src/hooks/store';
import ProductDeleteAlertDialog from '../../src/components/products/ProductDeleteAlertDialog';
import Product, { ProductData } from '../../src/domain/product';
import AddProductForm from '../../src/components/products/AddProductForm';
import useSnackbar from '../../src/hooks/snackbar';

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
  const { Snackbar, showSnackbar } = useSnackbar();

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

        showSnackbar();

        return products?.filter((prod) => prod.id !== productToDelete.id);
      });
    }

    closeDeleteAlert();
    setProductToDelete(undefined);
  };

  const onSubmit = (data: ProductData) => {
    return new Promise<void>((resolve) => {
      mutate(async () => {
        const newProduct: Product = await fetch(
          `/api/stores/${storeId}/products`,
          {
            method: 'POST',
            body: JSON.stringify(data),
          },
        ).then((response) => response.json());

        resolve();

        return products?.concat(newProduct);
      });
    });
  };

  return (
    <>
      <AddProductForm onSubmit={onSubmit} />
      <Box mt={3} mb={1}>
        <Divider />
      </Box>
      <ProductCardList
        products={products!}
        onProductDelete={handleDeleteProduct}
      />
      <ProductDeleteAlertDialog
        open={deleteAlertOpen}
        handleClose={handleDeleteAlertClose}
      />
      <Snackbar message="Product removed successfully!" severity="success" />
    </>
  );
}
