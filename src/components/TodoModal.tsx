import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TaskCreationForm } from './TaskCreationForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const TodoModal = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle color="primary">
        Create new Task
      
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
      
      <TaskCreationForm onSubmited={onClose} />
    </Dialog>
  );
};
