import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';

interface SnackbarProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export default function useSnackbar() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    Snackbar: ({ message, severity }: SnackbarProps) => (
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    ),
    showSnackbar: () => {
      setSnackbarOpen(true);
    },
    hideSnackbar: () => {
      setSnackbarOpen(false);
    },
  };
}
