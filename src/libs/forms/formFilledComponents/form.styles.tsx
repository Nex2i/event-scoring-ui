import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { FormHelperText, Tooltip, tooltipClasses, TooltipProps, styled } from '@mui/material';

export const SharedErrorFormHelperText = styled(FormHelperText)`
  color: #d32f2f;
`;

export const ErrorFormHelperText = styled(SharedErrorFormHelperText)``;

export const FormFilledInputContainer = styled('div')`
  width: 100%;
  .form-filled-input-control {
    min-width: 327.5px;
    width: 100%;
  }
`;

// This is a workaround for the tooltip not being able to be styled with styled-components
export const HelpToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[2],
    fontSize: 14,
    padding: 8,
  },
}));

export const HelpAdornment = styled(HelpOutlineOutlinedIcon)`
  color: #5e676c;

  :hover {
    cursor: pointer;
  }
`;

export const FormFilledSelectContainer = styled('div')`
  width: 100%;

  .form-filled-select-control {
    min-width: 327.5px;
    width: 100%;
  }
`;
