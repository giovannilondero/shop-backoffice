import {
  Box,
  Button,
  TextField,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { ProductData } from '../../domain/product';
import useSnackbar from '../../hooks/snackbar';

interface AddProductFormProps {
  onSubmit: (data: ProductData) => Promise<void>;
}

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: '25ch',
  },
  fieldset: {
    borderRadius: '5px',
    borderColor: theme.palette.divider,
  },
  submitButton: {
    margin: theme.spacing(1),
  },
}));

export default function AddProductForm({ onSubmit }: AddProductFormProps) {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm<ProductData>({
    mode: 'onChange',
  });
  const { Snackbar, showSnackbar } = useSnackbar();

  const internalOnSubmit = async (data: ProductData) => {
    await onSubmit({
      ...data,
      price: Number(data.price),
    });

    reset();
    showSnackbar();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(internalOnSubmit)}
        noValidate
        autoComplete="off"
      >
        <fieldset className={classes.fieldset}>
          <legend>Insert a new product</legend>

          <Box>
            <TextField
              name="title"
              inputRef={register({ required: true })}
              className={classes.textField}
              label="Title"
              error={!!errors?.title}
            />
            <TextField
              name="category"
              inputRef={register({ required: true })}
              className={classes.textField}
              label="Category"
              error={!!errors?.category}
            />
            <TextField
              name="price"
              inputRef={register({
                required: true,
                pattern: { value: /\d+/, message: 'Must be numeric' },
              })}
              className={classes.textField}
              label="Price"
              type="tel"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              error={!!errors?.price}
            />
            <TextField
              name="employee"
              inputRef={register({ required: true })}
              className={classes.textField}
              label="Employee"
              error={!!errors?.employee}
            />
            {/* TODO: usare textarea magari per la description */}
            <TextField
              name="description"
              inputRef={register({ required: true })}
              className={classes.textField}
              label="Description"
              error={!!errors?.description}
            />
          </Box>

          <Button
            type="submit"
            className={classes.submitButton}
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
        </fieldset>
      </form>
      <Snackbar message="Product added successfully!" severity="success" />
    </>
  );
}
