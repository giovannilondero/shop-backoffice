import { Box, Grid, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { ViewList, ViewModule } from '@material-ui/icons';
import ProductCard from './ProductCard';
import Product from '../../domain/product';

interface ProductCardListProps {
  products: Product[];
  onProductDelete: (product: Product) => void;
}

type LayoutGridColumnSpan = 4;
type LayoutListColumnSpan = 12;

export default function ProductCardList({
  products,
  onProductDelete,
}: ProductCardListProps) {
  const layoutGridColumnSpan: LayoutGridColumnSpan = 4;
  const layoutListColumnSpan: LayoutListColumnSpan = 12;
  const [columnSpan, setColumnSpan] = useState<
    LayoutGridColumnSpan | LayoutListColumnSpan
  >(layoutGridColumnSpan);

  const setList = () => {
    setColumnSpan(layoutListColumnSpan);
  };

  const setGrid = () => {
    setColumnSpan(layoutGridColumnSpan);
  };

  return (
    <section>
      <Box mb={2}>
        <IconButton
          aria-label="Set list layout"
          color={columnSpan === layoutListColumnSpan ? 'primary' : 'default'}
          onClick={() => setList()}
        >
          <ViewList />
        </IconButton>
        <IconButton
          aria-label="Set grid layout"
          color={columnSpan === layoutGridColumnSpan ? 'primary' : 'default'}
          onClick={() => setGrid()}
        >
          <ViewModule />
        </IconButton>
      </Box>
      <Grid container alignItems="stretch" spacing={4}>
        {products?.map((product) => {
          return (
            <Grid item key={product.id} xs={columnSpan}>
              <ProductCard product={product} onDelete={onProductDelete} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
}