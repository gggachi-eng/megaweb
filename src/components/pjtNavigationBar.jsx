// 파일: src/components/pjtNavigationBar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PjtNavigationBar({ menus }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const handleMenuClick = (event, menuId) => {
    setAnchorEl(event.currentTarget);
    setActiveMenuId(menuId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenuId(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(`/${path}`);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('menus');
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mega 프로젝트
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {menus.map(menu => (
            <Button
              key={menu.menuid}
              color="inherit"
              onClick={(e) => handleMenuClick(e, menu.menuid)}
              onMouseOver={(e) => handleMenuClick(e, menu.menuid)} // 마우스 오버 시 메뉴 열기
            >
              {menu.menuname}
            </Button>
          ))}
        </Box>


        {/* 로그아웃 버튼 */}
        <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
          로그아웃
        </Button>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{ onMouseLeave: handleMenuClose }}
      >
        {menus
          .filter(menu => menu.menuid === activeMenuId)
          .map(menu =>
            menu.children && menu.children.length > 0
              ? menu.children.map(subMenu => (
                  <MenuItem
                    key={subMenu.menuid}
                    onClick={() => handleMenuItemClick(subMenu.path)}
                  >
                    {subMenu.menuname}
                  </MenuItem>
                ))
              : <MenuItem disabled key="no-submenu">하위 메뉴 없음</MenuItem>
          )}
      </Menu>
    </AppBar>
  );
}
