import { Box, Typography } from '@material-ui/core';
import { StoreData } from '../../domain/store';

interface StoreDetailsProps {
  store: StoreData;
}

export default function StoreDetails({ store }: StoreDetailsProps) {
  return (
    <>
      <Box color="text.secondary" mb={4}>
        <Typography>{store.category}</Typography>
        <Typography>Employees: {store.employees.join(', ')}</Typography>
      </Box>
    </>
  );
}
