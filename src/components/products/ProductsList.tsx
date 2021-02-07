import { useState } from 'react';
import { Box, Divider } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CenterProgressIndicator from '../CenterProgressIndicator';
import ProductCardList from './ProductCardList';
import useProducts from '../../hooks/products';
import ProductDeleteAlertDialog from './ProductDeleteAlertDialog';
import Product, { ProductData } from '../../domain/product';
import AddProductForm from './AddProductForm';
import useSnackbar from '../../hooks/snackbar';

interface ProductsListProps {
  storeId: string;
}

export default function ProductsList({ storeId }: ProductsListProps) {
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
