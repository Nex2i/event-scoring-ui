/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Argon Dashboard 2 MUI base styles
import colors from '@/assets/theme/base/colors';
import borders from '@/assets/theme/base/borders';
const { borderWidth, borderColor } = borders;

// Argon Dashboard 2 MUI helper functions
import pxToRem from '@/assets/theme/functions/pxToRem';

const { transparent, dark } = colors;

const stepContent = {
  styleOverrides: {
    root: {
      margin: `0`,
      padding: `0 ${pxToRem(12)}`,
      color: borderColor,

      '&.MuiPaper-root': {
        backgroundColor: transparent.main,
      },

      borderWidth: `${borderWidth[2]} !important`,
      borderColor: 'currentColor',

      borderLeft: `solid ${dark.main} ${borderWidth[2]}`,
    },
    line: {
      borderWidth: `${borderWidth[2]} !important`,
      borderColor: 'currentColor',
    },
  },
};

export default stepContent;
