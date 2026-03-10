/**
 * KPFC 깐부노트 - Routing & Layout
 * 각 페이지로의 경로와 보안 접근 권한을 관리합니다.
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// 페이지 컴포넌트 임포트
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './pages/CustomerDetail';
import Scheduler from './pages/Scheduler';
import LoadingScreen from './components/LoadingScreen';

// [중요] 보호된 경로 설정 (로그인 안 하면 접근 불가)
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />; // 로딩 중일 때
  return user ? children : <Navigate to="/login" />; // 로그인 여부에 따른 분기
};

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* 공용 경로 */}
        <Route path="/login" element={<Login />} />

        {/* 보호된 경로: 대표님 및 팀원 전용 */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/customer/:id" 
          element={
            <PrivateRoute>
              <CustomerDetail />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/scheduler" 
          element={
            <PrivateRoute>
              <Scheduler />
            </PrivateRoute>
          } 
        />

        {/* 잘못된 경로 접근 시 대시보드로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
