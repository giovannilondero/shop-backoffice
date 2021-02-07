import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
  Box,
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import Product from '../../domain/product';

interface ProductCardProps {
  product: Product;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  description: {
    marginTop: 12,
  },
  actions: {
    marginTop: 'auto',
  },
});

export default function ProductCard({ product }: ProductCardProps) {
  const classes = useStyles();
  const { data: productData } = product;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary" component="small">
            {productData.category}
          </Typography>
          <Typography color="primary" component="strong">
            €{productData.price}
          </Typography>
        </Box>

        <Typography variant="h5" component="h2">
          {productData.title}
        </Typography>

        {productData.employee && (
          <Typography variant="body2" component="small" color="textSecondary">
            By {productData.employee}
          </Typography>
        )}

        {productData.description && (
          <Typography className={classes.description} variant="body1">
            {productData.description}
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="secondary">
          <DeleteOutlined fontSize="small" />
          &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
}
