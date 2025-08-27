// 파일: /App.jsx
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PjtLogin from './pages/pjtLogin';
import PjtSignUp from './pages/pjtSignUp';
//import PjtDashboard from './pages/pjtDashboard';
import PjtLayout from './layout/pjtLayout';
import PjtMenuList from './pages/pjtMenuList';
// import PjtScheduleEdit from './pages/pjtScheduleEdit';
// import PjtScheduleFinal from './pages/pjtScheduleFinal';
// import PjtClassHours from './pages/pjtClassHours';

function App() {
  //const token = localStorage.getItem('token');  // !! => true

  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ 루트(/) 접근 시 /login으로 리다이렉트 */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/login" element={<PjtLogin setAuthenticated={setAuthenticated} />} />
        <Route path="/signup" element={<PjtSignUp />} />
        {/* ✅ 로그인 이후 공통 레이아웃 */}
        <Route path="/*" element={authenticated ? <PjtLayout /> : <Navigate to="/login" />} >
            {/* <Route path="dashboard" element={<PjtDashboard />} /> */}
            {/* <Route path="/dashboard" element={token ? <PjtDashboard /> : <Navigate to="/login" />} /> */}
            {/* 다른 메뉴도 여기에 추가 가능 */}
            <Route path="settings/menus" element={<PjtMenuList />} />
            {/* <Route path="/schedule/edit" element={<PjtScheduleEdit />} /> */}
            {/* <Route path="/schedule/final" element={<PjtScheduleFinal />} /> */}
            {/* <Route path="/schedule/class-hours" element={<PjtClassHours />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
