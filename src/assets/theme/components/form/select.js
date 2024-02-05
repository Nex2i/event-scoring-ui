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

const { transparent } = colors;

const select = {
  styleOverrides: {
    select: {
      display: 'grid',
      alignItems: 'center',

      '& .Mui-selected': {
        backgroundColor: transparent.main,
      },

      '&:focus': {
        background: transparent.main,
      },
    },

    selectMenu: {
      background: 'none',
      height: 'none',
      minHeight: 'none',
      overflow: 'unset',
    },
  },
};

export default select;
