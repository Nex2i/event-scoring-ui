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

// Argon Dashboard 2 MUI helper functions
import pxToRem from '@/assets/theme/functions/pxToRem';

const { white } = colors;
const { borderRadius } = borders;

const sidenav = {
  styleOverrides: {
    root: {
      whiteSpace: 'nowrap',
      border: 'none',
    },

    paper: {
      backgroundColor: white.main,
      height: `calc(100vh - ${pxToRem(64)})`,
      borderRadius: borderRadius.xl,
      border: 'none',
    },
  },
};

export default sidenav;
