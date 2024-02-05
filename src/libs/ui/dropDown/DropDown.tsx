import { Menu } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NavBarText } from '../Styles';

interface DropDownProps {
  text: string;
  children?: ReactNode;
  closeMenu?: boolean;
}

export const DropDown: FC<DropDownProps> = ({ text, children, closeMenu }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (closeMenu) handleCloseUserMenu();

    return handleCloseUserMenu();
  }, [closeMenu]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <NavBarText onClick={handleOpenUserMenu}>
        {text} <ArrowDropDownIcon />
      </NavBarText>
      <Menu
        sx={{ mt: '30px', ml: '65px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {children}
      </Menu>
    </>
  );
};
