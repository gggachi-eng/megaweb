// 파일: src/layout/pjtLayout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import PjtNavigationBar from '../components/pjtNavigationBar';

export default function PjtLayout() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');

    if (!token || !userid) {
      navigate('/login');
      return;
    }

    const storedMenus = localStorage.getItem('menus');

    if (storedMenus) {
      try {
        const parsedMenus = JSON.parse(storedMenus);
        if (Array.isArray(parsedMenus) && parsedMenus.length > 0) {
          setMenus(parsedMenus);
        } else {
          alert('메뉴 불러오기 실패: 메뉴 데이터가 비어있습니다.');
          navigate('/login');
        }
      } catch (e) {
        console.error('메뉴 파싱 실패:', e);
        alert('메뉴 불러오기 실패: 메뉴 데이터가 올바르지 않습니다.');
        navigate('/login');
      }
    } else {
      alert('메뉴 불러오기 실패: 메뉴 데이터가 없습니다.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 네비게이션바 */}
      <PjtNavigationBar menus={menus} />

      {/* 메인 컨텐츠 영역 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
          minHeight: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
