import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import Store from '../../domain/store';

interface StoreCardProps {
  to?: string;
  store: Store;
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function StoreCard({ store, to = '' }: StoreCardProps) {
  const classes = useStyles();
  const { data: storeData } = store;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar>{storeData.name[0]}</Avatar>}
        title={storeData.name}
        subheader={storeData.category}
      />
      <CardMedia
        component="img"
        alt="Store"
        image="/images/store.svg"
        title="Store"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Employees: {storeData.employees.join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={to}>
          <Button component="a" color="primary">
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

StoreCard.defaultProps = {
  to: '',
};
