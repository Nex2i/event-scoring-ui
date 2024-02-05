import { Snackbar, Alert, AlertColor, SnackbarOrigin } from '@mui/material';
import { FC } from 'react';

interface SnackBarAlertProps {
  handleSnackBarClose: () => void;
  isOpen: boolean;
  text: string;
  severity?: AlertColor;
  anchorOrigin?: SnackbarOrigin;
  duration?: number;
}

const defaultOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'right' };
const defaultSeverity: AlertColor = 'info';
const defaultDuration = 6000;

export const SnackBarAlert: FC<SnackBarAlertProps> = ({
  handleSnackBarClose,
  isOpen: isSnackBarOpen,
  text: snackBarText,
  severity = defaultSeverity,
  anchorOrigin = defaultOrigin,
  duration = defaultDuration,
}) => {
  return (
    <Snackbar
      open={isSnackBarOpen}
      autoHideDuration={duration}
      onClose={handleSnackBarClose}
      anchorOrigin={anchorOrigin}
      id="e2e-snackbar-alert"
    >
      <Alert severity={severity}>{snackBarText}</Alert>
    </Snackbar>
  );
};
