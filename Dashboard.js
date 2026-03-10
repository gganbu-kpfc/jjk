import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Search, 
  Plus, 
  Calendar,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../supabaseClient'; // Supabase 설정 파일 연결

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, success: 0, rate: 0 });
  const [todayTasks, setTodayTasks] = useState([]);
  const [pipeline, setPipeline] = useState([]);

  // 데이터 로딩 로직 (실제 Supabase 연동 시 사용)
  useEffect(() => {
    // 여기에 데이터 페칭 로직 구현 (현재는 UI 구성을 위한 가상 데이터)
    setStats({ total: 128, pending: 45, success: 12, rate: 85 });
    setPipeline([
      { step: '신규문의', count: 12, color: 'bg-blue-100 text-blue-600' },
      { step: '1차진단완료', count: 8, color: 'bg-indigo-100 text-indigo-600' },
      { step: '현장실사예정', count: 5, color: 'bg-amber-100 text-amber-600' },
      { step: '계약완료', count: 3, color: 'bg-emerald-100 text-emerald-600' },
      { step: '자금집행완료', count: 17, color: 'bg-gray-100 text-gray-600' },
    ]);
    setTodayTasks([
      { id: 1, name: '원주상회', time: '10:00', type: '전화상담', desc: '부채비율 소명 자료 요청' },
      { id: 2, name: '깐부기술', time: '14:00', type: '현장실사', desc: '중진공 실사 동행 자문' },
      { id: 3, name: '강원로지스', time: '16:30', type: '서류피드백', desc: '사업계획서 키워드 교정' },
    ]);
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* 1. 상단 헤더 및 퀵 액션 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">KPFC 자문 대시보드</h1>
          <p className="text-slate-500">이종현 대표님, 오늘 하루도 사장님들을 응원합니다.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="업체명 검색..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition shadow-md">
            <Plus className="w-4 h-4" /> 신규 상담 등록
          </button>
        </div>
      </div>

      {/* 2. 주요 지표 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="전체 관리 업체" value={stats.total} icon={<Users />} color="blue" />
        <StatCard title="진행 중인 자문" value={stats.pending} icon={<Clock />} color="amber" />
        <StatCard title="자금 집행 완료" value={stats.success} icon={<CheckCircle />} color="emerald" />
        <StatCard title="목표 달성률" value={`${stats.rate}%`} icon={<TrendingUp />} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. 단계별 파이프라인 (좌측 2칸) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" /> 단계별 프로세스 현황
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {pipeline.map((item, idx) => (
                <div key={idx} className={`${item.color} p-4 rounded-xl text-center flex flex-col items-center justify-center border border-white shadow-sm`}>
                  <span className="text-sm font-medium mb-1">{item.step}</span>
                  <span className="text-2xl font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 활동 리스트 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">최근 활동 내역</h3>
              <button className="text-sm text-blue-600 flex items-center">전체보기 <ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="py-3 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">원주 푸드테크 외 1곳</p>
                      <p className="text-xs text-slate-400">1차 진단 리포트 생성 완료 · 2시간 전</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded">자문중</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. 오늘의 일정 (우측 1칸) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> 오늘의 주요 일정
            </h3>
            <div className="space-y-4">
              {todayTasks.map((task) => (
                <div key={task.id} className="p-4 bg-slate-50 rounded-lg border-l-4 border-blue-600 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{task.type}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.time}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800">{task.name}</h4>
                  <p className="text-sm text-slate-500 mt-1">{task.desc}</p>
                  <button className="mt-3 w-full py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100 transition">상세보기</button>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm hover:border-blue-400 hover:text-blue-500 transition">
                + 새 일정 추가
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 재사용 가능한 스탯 카드 컴포넌트
const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: "bg-blue-600 text-white shadow-blue-100",
    amber: "bg-white text-slate-800 border border-slate-100",
    emerald: "bg-white text-slate-800 border border-slate-100",
    indigo: "bg-indigo-700 text-white shadow-indigo-100",
  };
  
  return (
    <div className={`p-6 rounded-2xl shadow-lg ${colorMap[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color === 'blue' || color === 'indigo' ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
      </div>
      <div>
        <p className={`text-sm ${color === 'blue' || color === 'indigo' ? 'text-white/80' : 'text-slate-500'}`}>{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
