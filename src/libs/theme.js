import { createTheme } from '@mui/material';
// import colors from '@/assets/theme/base/colors';

// Argon Dashboard 2 MUI base styles
import colors from '@/assets/theme/base/colors';
import typography from '@/assets/theme/base/typography';
import boxShadows from '@/assets/theme/base/boxShadows';
import borders from '@/assets/theme/base/borders';
import globals from '@/assets/theme/base/globals';
import container from '@/assets/theme/components/container';

// Argon Dashboard 2 MUI helper functions
import boxShadow from '@/assets/theme/functions/boxShadow';
import hexToRgb from '@/assets/theme/functions/hexToRgb';
import linearGradient from '@/assets/theme/functions/linearGradient';
import pxToRem from '@/assets/theme/functions/pxToRem';
import rgba from '@/assets/theme/functions/rgba';

// Argon Dashboard 2 MUI components base styles for @mui material components
import sidenav from '@/assets/theme/components/sidenav';
import list from '@/assets/theme/components/list';
import listItem from '@/assets/theme/components/list/listItem';
import listItemText from '@/assets/theme/components/list/listItemText';
import card from '@/assets/theme/components/card';
import button from '@/assets/theme/components/button';
import iconButton from '@/assets/theme/components/iconButton';
import switchButton from '@/assets/theme/components/form/switchButton';
import divider from '@/assets/theme/components/divider';
import linearProgress from '@/assets/theme/components/linearProgress';
import breadcrumbs from '@/assets/theme/components/breadcrumbs';
import slider from '@/assets/theme/components/slider';
import avatar from '@/assets/theme/components/avatar';
import tooltip from '@/assets/theme/components/tooltip';
import tabs from '@/assets/theme/components/tabs';
import tab from '@/assets/theme/components/tabs/tab';
import stepper from '@/assets/theme/components/stepper';
import step from '@/assets/theme/components/stepper/step';
import stepConnector from '@/assets/theme/components/stepper/stepConnector';
import stepLabel from '@/assets/theme/components/stepper/stepLabel';
import stepIcon from '@/assets/theme/components/stepper/stepIcon';
import select from '@/assets/theme/components/form/select';
import formControlLabel from '@/assets/theme/components/form/formControlLabel';
import formLabel from '@/assets/theme/components/form/formLabel';
import checkbox from '@/assets/theme/components/form/checkbox';
import radio from '@/assets/theme/components/form/radio';
import autocomplete from '@/assets/theme/components/form/autocomplete';
import input from '@/assets/theme/components/form/input';
import popover from '@/assets/theme/components/popover';
import buttonBase from '@/assets/theme/components/buttonBase';
import icon from '@/assets/theme/components/icon';
import svgIcon from '@/assets/theme/components/svgIcon';
import link from '@/assets/theme/components/link';
import dialog from '@/assets/theme/components/dialog';
import dialogTitle from '@/assets/theme/components/dialog/dialogTitle';
import dialogContent from '@/assets/theme/components/dialog/dialogContent';
import dialogContentText from '@/assets/theme/components/dialog/dialogContentText';
import dialogActions from '@/assets/theme/components/dialog/dialogActions';
import stepContent from '@/assets/theme/components/stepper/stepContent';
import accordion, { AccordionSummary, AccordionDetails } from '@/assets/theme/components/accordion';

export const theme = createTheme({
  palette: { ...colors },
  transitions: {
    duration: {
      enteringScreen: 500,
      leavingScreen: 200,
    },
  },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      },
      defaultProps: {
        variant: 'dense',
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '6px',
          marginTop: '6px',
        },
      },
      defaultProps: {
        fullWidth: true,
        variant: 'filled',
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          paddingLeft: '10px',
          paddingRight: '10px',
        },
      },
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '8px',
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiAccordion: { ...accordion },
    MuiAccordionSummary: { ...AccordionSummary },
    MuiAccordionDetails: { ...AccordionDetails },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiStepContent: { ...stepContent },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiInput: { ...input },
    MuiOutlinedInput: { ...input },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
