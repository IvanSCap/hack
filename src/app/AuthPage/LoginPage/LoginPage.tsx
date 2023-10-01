import { useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Button, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { preventDefault } from '../../../helpers';
import { Yup } from '../../../utils/validation';
import * as authApi from '../../../api/auth';
import { TextField } from '../../../components/TextField';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../components/AuthProvider';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface FormValues {
  email: string | null,
  password: string | null,
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3)
  }
}));

const defaultValues = {
  email: null,
  password: null
};

const schema = Yup.object({
  email: Yup.string().nullable().required(),
  password: Yup.string().nullable().required()
});

export const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [ isError, setIsError ] = useState(false);
  const { login } = useContext(AuthContext);
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleSubmit = (values: FormValues) => {
    authApi.login(values).then((user) => {
      login(user);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    }).catch(() => {
      setIsError(true);
    });
  };

  return (
    <FormProvider {...form}>

      <Box display="flex" flexDirection="column" alignItems="center">
        <LockOpenIcon  color="primary"/>
        <Typography variant="h6" color="primary" mt={1}>
          {t('auth.login.header')}
        </Typography>
      </Box>
      
      <Grid
        noValidate
        container
        spacing={2}
        alignItems="center"
        direction="column"
        component="form"
        className={classes.container}
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <Grid item >
          <TextField
            required
            margin="dense"
            multiline
            type="email"
            name="email"
            label={t('auth.login.emailLabel')}
            placeholder={t('auth.login.emailPlaceholder')}
            maxRows={4}
          />

          <TextField
            required
            margin="dense"
            type="password"
            name="password"
            label={t('auth.login.passwordLabel')}
            placeholder={t('auth.login.passwordPlaceholder')}
          />
        </Grid>

        {isError &&
          <>
            <Typography align="center" color="error">
              {t('auth.login.errorMessage')}
            </Typography>
          </>
        }

        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            {t('auth.login.submitButton')}
          </Button>
        </Grid>

        <Grid item>
          <Link to="/auth/registration" color="red">
            {t('auth.login.forgotPassword')}
          </Link>
        </Grid>

        <Grid item>
          <Link to="/auth/registration" color="primary">
            {t('auth.login.registerLink')}
          </Link>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
