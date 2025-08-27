// src/components/pjtMenuForm.jsx
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const API = process.env.REACT_APP_MEGA_API;

export default function PjtMenuForm({ menu = {}, onSubmit, onCancel }) {
    console.log(menu)
  const [menuId, setMenuId] = useState(menu?.menuid || '');
  const [parentId, setParentId] = useState(menu?.parent_id || '');
  const [menuName, setMenuName] = useState(menu?.menuname || '');
  const [path, setPath] = useState(menu?.path || '');

  useEffect(() => {
    if (menu?.menuId) {
      setMenuId(menu?.menuId || '');
      setParentId(menu?.parentId || '');
      setMenuName(menu?.menuName || '');
      setPath(menu?.path || '');
    }
  }, [menu]);

  const save = async () => {
    const token = localStorage.getItem('token');
    const payload = { menuId, parentId: parentId || null, menuName, path };
    try{
        if (menu.menuId) {
        await axios.put(`${API}/api/menus/${menu.menuId}`, payload, { headers: { Authorization:`Bearer ${token}` } });
        } else {
        await axios.post(`${API}/api/menus`, payload, { headers: { Authorization:`Bearer ${token}` } });
        }
        onSubmit();
    }catch(err){
      console.error('저장 실패:', err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">{menu?.menuId ? '메뉴 수정' : '메뉴 등록'}</Typography>
      <Box sx={{ display:'flex', flexDirection:'column', gap:2, mt:2 }}>
        <TextField label="메뉴 ID" value={menuId} onChange={e=>setMenuId(e.target.value)} disabled={menu?.menuId !== '' && menu?.menuId !== null && menu?.menuId !== undefined} />
        <TextField label="상위메뉴 ID" value={parentId} onChange={e=>setParentId(e.target.value)} />
        <TextField label="메뉴명" value={menuName} onChange={e=>setMenuName(e.target.value)} />
        <TextField label="경로" value={path} onChange={e=>setPath(e.target.value)} />
        <Box>
          <Button variant="contained" onClick={save} sx={{ mr:1 }}>저장</Button>
          <Button variant="outlined" onClick={onCancel}>취소</Button>
        </Box>
      </Box>
    </Paper>
  );
}
