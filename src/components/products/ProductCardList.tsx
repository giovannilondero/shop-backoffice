import { Box, Grid, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { ViewList, ViewModule } from '@material-ui/icons';
import ProductCard from './ProductCard';
import Product from '../../domain/product';

interface ProductCardListProps {
  products: Product[];
  onProductDelete: (product: Product) => void;
}

export default function ProductCardList({
  products,
  onProductDelete,
}: ProductCardListProps) {
  const [isListLayout, setListLayout] = useState(false);

  const setList = () => {
    setListLayout(true);
  };

  const setGrid = () => {
    setListLayout(false);
  };

  return (
    <section>
      <Box mb={2}>
        <IconButton
          aria-label="Set list layout"
          color={isListLayout ? 'primary' : 'default'}
          onClick={() => setList()}
        >
          <ViewList />
        </IconButton>
        <IconButton
          aria-label="Set grid layout"
          color={!isListLayout ? 'primary' : 'default'}
          onClick={() => setGrid()}
        >
          <ViewModule />
        </IconButton>
      </Box>
      <Grid container alignItems="stretch" spacing={4}>
        {products?.map((product) => {
          return (
            <Grid
              item
              key={product.id}
              xs={isListLayout ? 12 : 6}
              sm={isListLayout ? 12 : 6}
              md={isListLayout ? 12 : 4}
            >
              <ProductCard product={product} onDelete={onProductDelete} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
}
