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
    // 가상 데이터: 실제로는 Supabase 'tasks' 테이블에서 연동 예정
    const mockTasks = [
      { id: 1, date: '2026-03-12', time: '10:00', client: '원주상사', type: '현장실사', priority: '높음', status: '보류' },
      { id: 2, date: '2026-03-12', time: '15:30', client: '깐부푸드', type: '전화상담', priority: '보통', status: '완료' },
      { id: 3, date: '2026-03-15', time: '09:00', client: '강원기술', type: '계약체결', priority: '높음', status: '보류' },
      { id: 4, date: '2026-03-20', time: '18:00', client: '소진공공고', type: '접수마감', priority: '긴급', status: '보류' },
    ];
    setTasks(mockTasks);
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="text-blue-700" /> 업무 스케줄러
          </h2>
          <p className="text-sm text-slate-500 font-medium">KPFC 계약 및 주요 행사일을 관리합니다.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition shadow-md font-bold text-sm">
          <Plus className="w-4 h-4" /> 일정 추가
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 좌측: 메인 캘린더 (2칸) */}
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
          {/* 나머지 캘린더 렌더링 로직... */}
        </div>
      </div>
    </div>
  );
};

export default GganbuScheduler;
