import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Button, Box, Typography } from '@mui/material';
import { preventDefault } from '../../../helpers';
import { Yup } from '../../../utils/validation';
import { TextField } from '../../../components/TextField';
import { useTranslation } from 'react-i18next';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as authApi from '../../../api/auth';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string | null,
  email: string | null,
  password: string | null,
  confirmPassword: string | null
};

const defaultValues = {
  name: null,
  email: null,
  password: null,
  confirmPassword: null
};

const schema = Yup.object({
  name: Yup.string().nullable().required(),
  email: Yup.string().nullable().email().required(),
  password: Yup.string().nullable().required(),
  confirmPassword: Yup.string().nullable().required()
});

export const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleSubmit = (values: FormValues) => {
    
    authApi.register(values).then(() => {
      navigate('/login');
    }).catch((error) => {
    });
  };

  return (
    <FormProvider {...form}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <LockOpenIcon color="primary"/>

        <Typography variant="h6" color="white" mt={1}>
          {t('auth.register.header')}
        </Typography>
      </Box>

      <Grid
        noValidate
        container
        spacing={2}
        alignItems="center"
        direction="column"
        component="form"
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <Grid item>
          <TextField
            required
            margin="dense"
            name="name"
            label={t('auth.register.nameLabel')}
            placeholder={t('auth.register.namePlaceholder')}
            variant="outlined"
          />
          
          <TextField
            required
            margin="dense"
            type="email"
            name="email"
            label={t('auth.register.emailLabel')}
            placeholder={t('auth.register.emailPlaceholder')}
            maxRows={4}
          />

          <TextField
            required
            margin="dense"
            type="password"
            name="password"
            label={t('auth.register.passwordLabel')}
            placeholder={t('auth.register.passwordPlaceholder')}
          />

          <TextField
            required
            type="password"
            margin="dense"
            name="confirmPassword"
            label={t('auth.register.passwordRepeatLabel')}
            placeholder={t('auth.register.passwordRepeatPlaceholder')}
          />
        </Grid>

        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            {t('auth.register.submitButton')}
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
