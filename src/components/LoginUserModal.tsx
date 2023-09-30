import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Registration } from '../app/AuthPage/Registration';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginUserModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle color="primary">
        {t('auth.login.header')}
      
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
