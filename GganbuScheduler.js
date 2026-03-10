import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  User, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const GganbuScheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 가상 데이터: 실제로는 Supabase 'tasks' 테이블에서 manager_id로 필터링해 가져옴
    const mockTasks = [
      { id: 1, date: '2026-03-12', time: '10:00', client: '원주상사', type: '현장실사', priority: 'high', status: 'pending' },
      { id: 2, date: '2026-03-12', time: '15:30', client: '깐부푸드', type: '전화상담', priority: 'medium', status: 'completed' },
      { id: 3, date: '2026-03-15', time: '09:00', client: '강원기술', type: '계약체결', priority: 'high', status: 'pending' },
      { id: 4, date: '2026-03-20', time: '18:00', client: '소진공공고', type: '접수마감', priority: 'urgent', status: 'pending' },
    ];
    setTasks(mockTasks);
  }, []);

  // 캘린더 날짜 계산 로직 (간략화)
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="text-blue-700" /> 업무 스케줄러
          </h2>
          <p className="text-sm text-slate-500 font-medium">KPFC 자문 일정 및 주요 정책 마감일을 관리합니다.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition shadow-md font-bold text-sm">
          <Plus className="w-4 h-4" /> 일정 추가
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 왼쪽: 캘린더 메인 (2칸) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-slate-800">
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition"><ChevronLeft className="w-5 h-5 text-slate-500" /></button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition"><ChevronRight className="w-5 h-5 text-slate-500" /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 text-center bg-slate-50 border-b border-slate-100">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 h-[600px]">
            {/* 날짜 칸 생성 (예시) */}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - firstDayOfMonth + 1;
              const isToday = day === new Date().getDate();
              const hasTask = tasks.some(t => new Date(t.date).getDate() === day);

              return (
                <div key={i} className={`p-2 border-b border-r border-slate-50 relative hover:bg-slate-50 transition cursor-pointer`}>
                  <span className={`text-sm font-medium ${isToday ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full' : 'text-slate-600'}`}>
                    {day > 0 && day <= daysInMonth ? day : ''}
                  </span>
                  {day > 0 && hasTask && (
                    <div className="mt-2 space-y-1">
                      {tasks.filter(t => new Date(t.date).getDate() === day).map(t => (
                        <div key={t.id} className={`text-[10px] p-1 rounded truncate font-bold ${
                          t.priority === 'urgent' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {t.client}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 오늘의 할 일 & 리마인더 (1칸) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" /> 긴급 및 리마인더
            </h3>
            <div className="space-y-4">
              <ReminderItem 
                title="소진공 정책자금 마감" 
                date="D-3" 
                desc="원주 지역 청년창업자금 일제 접수"
                type="urgent"
              />
              <ReminderItem 
                title="강원로지스 서류 보완" 
                date="내일" 
                desc="부가세과세표준증명원 추가 제출"
                type="normal"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> 오늘 예정 업무
            </h3>
            <div className="space-y-4">
              {tasks.filter(t => t.date === '2026-03-12').map(task => (
                <div key={task.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:shadow-md transition">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs font-bold text-slate-400 uppercase">{task.time}</p>
                    <div className={`mt-1 w-1 h-8 mx-auto rounded-full ${task.priority === 'high' ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{task.client}</h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {task.type}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-slate-100">상세</button>
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-100">완료처리</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReminderItem = ({ title, date, desc, type }) => (
  <div className={`p-4 rounded-xl border-l-4 ${type === 'urgent' ? 'bg-rose-50 border-rose-500' : 'bg-blue-50 border-blue-500'}`}>
    <div className="flex justify-between items-center mb-1">
      <span className={`text-[10px] font-black uppercase ${type === 'urgent' ? 'text-rose-600' : 'text-blue-600'}`}>{date}</span>
    </div>
    <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    <p className="text-xs text-slate-500 mt-1">{desc}</p>
  </div>
);

export default GganbuScheduler;
