import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 글로벌 디자인
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// 1. HTML의 'root' 엘리먼트를 잡습니다.
const root = ReactDOM.createRoot(document.getElementById('root'));

// 2. 실제 화면을 그립니다.
root.render(
  <React.StrictMode>
    {/* 페이지 이동 기능을 앱 전체에 부여합니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
