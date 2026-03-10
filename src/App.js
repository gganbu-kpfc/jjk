import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  Calendar, 
  Archive, 
  Settings, 
  LogOut 
} from 'lucide-react';

// 임시 페이지들 (나중에 개별 파일로 분리)
import Dashboard from './pages/Dashboard';
import CustomerCRM from './pages/CustomerCRM';
import AssessmentEngine from './pages/AssessmentEngine';
import GganbuScheduler from './pages/GganbuScheduler';

function App() {
  const location = useLocation();

  // 현재 활성화된 메뉴 스타일을 위한 함수
  const isActive = (path) => location.pathname === path ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-800";

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* [SIDEBAR] 좌측 고정 메뉴 */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-xl font-black tracking-tighter">KPFC 깐부노트</h1>
          <p className="text-xs text-blue-300 mt-1">한국정책자금지원센터</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/')}`}>
            <LayoutDashboard size={20} /> <span className="font-bold">1. 대시보드</span>
          </Link>
          <Link to="/crm" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/crm')}`}>
            <Users size={20} /> <span className="font-bold">2. 고객 통합 관리</span>
          </Link>
          <Link to="/assessment" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/assessment')}`}>
            <Calculator size={20} /> <span className="font-bold">3. KPFC 1차 진단</span>
          </Link>
          <Link to="/scheduler" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/scheduler')}`}>
            <Calendar size={20} /> <span className="font-bold">4. 업무 스케줄러</span>
          </Link>
          <Link to="/archive" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/archive')}`}>
            <Archive size={20} /> <span className="font-bold">5. 깐부 아카이브</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <button className="w-full flex items-center gap-3 p-3 text-blue-300 hover:text-white transition">
            <Settings size={20} /> <span className="text-sm">시스템 설정</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-rose-400 hover:text-rose-300 transition">
            <LogOut size={20} /> <span className="text-sm font-bold">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* [MAIN CONTENT] 우측 화면 본문 */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="text-sm font-bold text-slate-500">
            {location.pathname === '/' ? '대시보드' : 
             location.pathname === '/crm' ? '고객 관리' : 
             location.pathname === '/assessment' ? '진단 엔진' : '스케줄러'}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">이종현 대표님</span>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">JH</div>
          </div>
        </header>

        <section className="p-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crm" element={<CustomerCRM />} />
            <Route path="/assessment" element={<AssessmentEngine />} />
            <Route path="/scheduler" element={<GganbuScheduler />} />
            {/* 404 처리: 페이지가 없을 때 대시보드로 */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
