import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { FC } from 'react';

interface ConfirmCloseDialogProps {
  isConfirmationDialogOpen: boolean;
  handleConfirmationNo: () => void;
  handleConfirmationYes: () => void;
  dialogTitle?: string;
  dialogContent?: string;
}

const defaultTitle = 'Are you sure you want to exit?';
const defaultContent = 'If you exit, you will lose all progress.';

export const ConfirmCloseDialog: FC<ConfirmCloseDialogProps> = ({
  isConfirmationDialogOpen,
  handleConfirmationNo,
  handleConfirmationYes,
  dialogTitle = defaultTitle,
  dialogContent = defaultContent,
}) => {
  return (
    <Dialog open={isConfirmationDialogOpen}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmationNo}>No</Button>
        <Button color="error" onClick={handleConfirmationYes}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
