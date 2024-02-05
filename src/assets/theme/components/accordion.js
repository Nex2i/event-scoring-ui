import colors from '../base/colors';
import borders from '../base/borders';

import pxToRem from '../functions/pxToRem';

const accordion = {
  styleOverrides: {
    root: {},
  },
};

export const AccordionSummary = {
  styleOverrides: {
    root: {
      backgroundColor: colors.grey[200],

      '.MuiAccordionSummary-content': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
    },
  },
};

export const AccordionDetails = {
  styleOverrides: {
    root: {
      backgroundColor: colors.grey[300],
    },
  },
};

export default accordion;
