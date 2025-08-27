// 파일: components/pjtLoginForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function PjtLoginForm({ onLogin, onSignUp }) {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Box component="form" onSubmit={e => { e.preventDefault(); onLogin(userid, password); }}>
      <TextField label="Userid" value={userid} onChange={e=>setUserid(e.target.value)} fullWidth margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} fullWidth margin="normal" />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" type="submit">로그인</Button>
        <Button variant="outlined" color="secondary" onClick={onSignUp}>회원가입</Button>
      </Box>
    </Box>
  );
}
