import { Box, ButtonGroup, Grid, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { ViewList, ViewModule } from '@material-ui/icons';
import ProductCard from './ProductCard';
import Product from '../domain/product';

interface ProductCardListProps {
  products: Product[];
}

type LayoutGridColumnSpan = 4;
type LayoutListColumnSpan = 12;

export default function ProductCardList({ products }: ProductCardListProps) {
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
        <ButtonGroup variant="text" aria-label="Products layout button group">
          <IconButton
            color={columnSpan === layoutListColumnSpan ? 'primary' : 'default'}
            onClick={() => setList()}
          >
            <ViewList />
          </IconButton>
          <IconButton
            color={columnSpan === layoutGridColumnSpan ? 'primary' : 'default'}
            onClick={() => setGrid()}
          >
            <ViewModule />
          </IconButton>
        </ButtonGroup>
      </Box>
      <Grid container alignItems="stretch" spacing={4}>
        {products?.map((product) => {
          return (
            <Grid item key={product.id} xs={columnSpan}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
}
