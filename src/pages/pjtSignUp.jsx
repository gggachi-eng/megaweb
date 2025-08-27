// 파일: pages/pjtSignUp.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_MEGA_API;

export default function PjtSignUp() {
  const navigate = useNavigate();
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = () => {
    axios.post(`${API}/api/auth/signup`, { userid, username, password })
      .then(()=>{ alert('회원가입 성공'); navigate('/login'); })
      .catch(()=> alert('회원가입 오류'));
  };
  return (
    <Box>
      <TextField label="Userid" value={userid} onChange={e=>setUserid(e.target.value)} fullWidth margin="normal" />
      <TextField label="Username" value={username} onChange={e=>setUsername(e.target.value)} fullWidth margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" onClick={submit}>회원가입</Button>
    </Box>
  );
}
