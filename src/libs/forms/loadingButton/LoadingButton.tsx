import { forwardRef } from 'react';
import { CircularProgress, Button, ButtonProps, styled } from '@mui/material';

interface loadingButtonProps {
  loading: string;
}
const Styled = {
  LoadingButton: styled(Button)<loadingButtonProps>``,
};

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  name?: string;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>((props, ref) => {
  const { children, variant = 'contained', disabled = false, loading = false, onClick, className, name } = props;

  return (
    <Styled.LoadingButton
      ref={ref}
      className={className}
      classes={props.classes}
      variant={variant}
      disabled={disabled || loading}
      onClick={onClick}
      loading={loading.toString()}
      id={'e2e-' + name}
    >
      {loading ? (
        <>
          <CircularProgress aria-labelledby={'loading indicator'} color="inherit" size={16} />
        </>
      ) : (
        children
      )}
    </Styled.LoadingButton>
  );
});

export default LoadingButton;
