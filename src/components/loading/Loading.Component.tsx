import { CircularProgress, Typography } from '@mui/material';

export function LoadingComponent({
  loadingText,
  animateOnly = false,
}: {
  loadingText?: string;
  animateOnly?: boolean;
}) {
  const animation = <CircularProgress />;
  if (animateOnly) {
    return animation;
  }

  return (
    <div
      id="loading"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {animation}
      <Typography variant="h6">{loadingText}</Typography>
    </div>
  );
}
