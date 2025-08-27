// 파일: pages/pjtLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PjtLoginForm from '../components/pjtLoginForm';
const API = process.env.REACT_APP_MEGA_API;

export default function PjtLogin({setAuthenticated}) {
  const navigate = useNavigate();

  const onLogin = async (userid, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { userid, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userid', res.data.userid);
      localStorage.setItem('username', res.data.username);

      // ✅ 로그인 성공 후 메뉴 불러오기
      const menuRes = await axios.get(`${API}/api/menu/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem('menus', JSON.stringify(menuRes.data));
      //navigate('/dashboard');
      setAuthenticated(true);
      navigate("/");
    } catch (err) {
      alert('로그인 실패');
    }
  };

  const onSignUp = () => navigate('/signup');

  return <PjtLoginForm onLogin={onLogin} onSignUp={onSignUp} />;
}
