import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/stores/store.hooks';
import { SnackBarComponentProps } from '@/components/SnackBar/SnackBar.component';

export const SnackBarState: SnackBarComponentProps = {
  open: false,
  message: '',
  severity: 'success',
};

const initialState: SnackBarComponentProps = SnackBarState;

export const snackBarSlice = createSlice({
  name: 'snackBarSlice',
  initialState,
  reducers: {
    setSnackbarProps: (state, action: PayloadAction<SnackBarComponentProps>) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    setSnackBarOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    resetSnackBar: (state) => {
      state.open = false;
      state.message = '';
      state.severity = 'success';
    },
  },
});

export const snackBarSelector = () => useAppSelector((store) => store.snackBar);

export const { setSnackbarProps, setSnackBarOpen, resetSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
