import { Typography, Box } from '@material-ui/core';
import { PropsWithChildren } from 'react';

export default function PageTitle({ children }: PropsWithChildren<{}>) {
  return (
    <Box mt={3} mb={2}>
      <Typography variant="h2" component="h1">
        {children}
      </Typography>
    </Box>
  );
}
