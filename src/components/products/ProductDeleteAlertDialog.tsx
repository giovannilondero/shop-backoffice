import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

interface ProductDeleteAlertDialogProps {
  open: boolean;
  handleClose: (confirmed: boolean) => void;
}

export default function ProductDeleteAlertDialog({
  open,
  handleClose,
}: ProductDeleteAlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete product?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The product will be removed and you want be able to revert this
          action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
          Cancel
        </Button>
        <Button
          onClick={() => handleClose(true)}
          color="secondary"
          variant="outlined"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
