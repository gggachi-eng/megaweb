// src/pages/pjtMenuList.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Table, TableHead, TableRow,  TableCell, TableBody, Paper, Dialog, DialogTitle, DialogContent} from '@mui/material';
import axios from 'axios';
import { Edit, Delete } from '@mui/icons-material';
import PjtMenuForm from '../components/pjtMenuForm';

const API = process.env.REACT_APP_MEGA_API;

export default function PjtMenuList() {
  const [menus, setMenus] = useState([]);
  //const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

    const fetchMenus = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API}/api/menu/menus`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (Array.isArray(res.data)) {
                setMenus(res.data);
            } else {
                console.error("응답이 배열이 아님:", res.data);
            }
        } catch (err) {
            console.error("메뉴 로딩 실패:", err);
            alert('메뉴 로딩 실패');
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

  const handleCreate = () => {
    setEditTarget(null);
    setOpen(true);
  };

  const handleEdit = (menu) => {
    setEditTarget(menu);
    setOpen(true);
  };

  const handleDelete = async (menuid) => {
    const token = localStorage.getItem('token');
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`${API}/api/menu/${menuid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenus();
    } catch (err) {
      alert("삭제 실패");
    }
  };

//   const handleFormSubmitted = () => {
//     setEditing(null);
//     fetch();
//   };
  const handleClose = () => {
    setOpen(false);
    setEditTarget(null);
    fetchMenus(); // 등록/수정 후 목록 재로드
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>메뉴 목록</Typography>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        신규 메뉴 등록
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>메뉴ID</TableCell>
              <TableCell>메뉴명</TableCell>
              <TableCell>경로</TableCell>
              <TableCell>상위메뉴ID</TableCell>
              <TableCell>순서</TableCell>
              <TableCell>아이콘</TableCell>
              <TableCell>활성화</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menus.map((m) => (
              <TableRow key={m.menuid}>
                <TableCell>{m.menuid}</TableCell>
                <TableCell>{m.menuname}</TableCell>
                <TableCell>{m.path}</TableCell>
                <TableCell>{m.parent_id}</TableCell>
                <TableCell>{m.order_seq}</TableCell>
                <TableCell>{m.icon}</TableCell>
                <TableCell>{m.active ? 'Y' : 'N'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(m)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(m.menuid)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editTarget ? "메뉴 수정" : "신규 메뉴 등록"}</DialogTitle>
        <DialogContent>
          {/* <PjtMenuForm menu={editTarget} onClose={handleClose} /> */}
            <PjtMenuForm
            menu={editTarget}
            onSubmit={handleClose}     // 저장 성공 시 다이얼로그 닫기 + 목록 재조회
            onCancel={handleClose}     // 취소 시도 동일하게 닫기
            />
        </DialogContent>
      </Dialog>
    </Box>
  );
}