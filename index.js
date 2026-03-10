/**
 * KPFC 깐부노트 - Entry Point
 * 시스템 보안 및 데이터 흐름의 최상단 루트 파일입니다.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 고성능 데이터 처리
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import './index.css';

// 1. 데이터 캐싱 및 성능 최적화를 위한 QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 전환 시 자동 새로고침 방지 (데이터 안정성)
      retry: 1, // 실패 시 1회 재시도
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 성능 최적화 프로바이더 */}
    <QueryClientProvider client={queryClient}>
      {/* 라우팅 프로바이더 (페이지 이동) */}
      <BrowserRouter>
        {/* 보안 프로바이더 (로그인 및 데이터 격리) */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
