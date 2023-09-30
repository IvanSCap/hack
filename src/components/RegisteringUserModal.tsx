import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Registration } from '../app/AuthPage/Registration/Registration';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const RegisteringUserModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle color="primary">
        {t('auth.register.submitButton')}
      
        <IconButton
          color="primary"
          edge="end"
          sx={{
            position: 'absolute',
            right: 26,
            top: 8
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Registration />
    </Dialog>
  );
};
