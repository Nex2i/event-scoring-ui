import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { FC, useState } from 'react';
import { resetSnackBar, setSnackBarOpen } from '@/stores/slices/SnackBar.slice';
import { useAppDispatch } from '@/stores/store.hooks';

export interface SnackBarComponentProps {
  message: string;
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error';
}

// Eventually add stacking notifications
// https://www.npmjs.com/package/notistack

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const SnackBarComponent: FC<SnackBarComponentProps> = ({ open, message, severity }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(open);

  function onClose() {
    setIsOpen(false);
    dispatch(setSnackBarOpen(isOpen));

    // Needed for animation to complete
    setTimeout(() => {
      dispatch(resetSnackBar());
    }, 250);
  }

  return (
    <Snackbar
      data-cy="snackbar-component"
      open={isOpen}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
