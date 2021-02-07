import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';
import Product from '../domain/product';

interface ProductCardListProps {
  products: Product[];
}

export default function ProductCardList({ products }: ProductCardListProps) {
  return (
    <Grid container alignItems="stretch" spacing={4}>
      {products?.map((product) => {
        return (
          <Grid item key={product.id} xs={4}>
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
