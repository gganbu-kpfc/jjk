import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  MoreVertical, 
  ArrowUpDown,
  FileText,
  Phone
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const CustomerCRM = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  // 데이터 로딩 (Supabase RLS가 적용되어 본인의 고객만 가져옴)
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    // 실제 구현 시: const { data } = await supabase.from('customers').select('*');
    // 테스트용 가상 데이터
    const mockData = [
      { id: 1, name: '이종현', biz_name: '원주푸드', industry: '제조업', revenue: 500, debt_ratio: 280, credit: 850, status: '1차진단완료' },
      { id: 2, name: '김철수', biz_name: '깐부상사', industry: '서비스', revenue: 200, debt_ratio: 420, credit: 620, status: '문의' },
      { id: 3, name: '박영희', biz_name: '강원기술', industry: 'IT/SW', revenue: 1200, debt_ratio: 150, credit: 920, status: '현장실사예정' },
      { id: 4, name: '최민수', biz_name: '치악물류', industry: '운수업', revenue: 800, debt_ratio: 310, credit: 740, status: '계약완료' },
    ];
    setCustomers(mockData);
  };

  // 상태별 뱃지 컬러 설정
  const getStatusColor = (status) => {
    const colors = {
      '문의': 'bg-slate-100 text-slate-600',
      '1차진단완료': 'bg-blue-100 text-blue-600',
      '현장실사예정': 'bg-amber-100 text-amber-600',
      '계약완료': 'bg-emerald-100 text-emerald-600',
      '자금집행완료': 'bg-indigo-100 text-indigo-600'
    };
    return colors[status] || 'bg-gray-100';
  };

  // 신호등 로직 (부채비율 기준)
  const getSignal = (ratio) => {
    if (ratio > 400) return 'bg-red-500';
    if (ratio > 250) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* 상단 컨트롤 바 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">고객 통합 관리</h2>
          <p className="text-sm text-slate-500">KPFC DB 내 전체 고객 정보를 관리하고 분석합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition">
            <Download className="w-4 h-4" /> 엑셀 다운로드
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition shadow-sm">
            <UserPlus className="w-4 h-4" /> 신규 고객 등록
          </button>
        </div>
      </div>

      {/* 필터 섹션 */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="업체명, 대표자명, 지역 검색..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>전체 단계</option>
          <option>문의</option>
          <option>1차진단완료</option>
          <option>현장실사예정</option>
          <option>계약완료</option>
        </select>
        <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* 고객 리스트 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-100">
              <th className="p-4 font-semibold text-slate-600 text-sm">업체정보 <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
              <th className="p-4 font-semibold text-slate-600 text-sm">업종</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-right">매출액(억)</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-center">부채비율</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-center">신용</th>
              <th className="p-4 font-semibold text-slate-600 text-sm">진행단계</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-center">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-50 transition cursor-pointer">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{customer.biz_name}</span>
                    <span className="text-xs text-slate-400">{customer.name} 대표</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-600">{customer.industry}</td>
                <td className="p-4 text-sm text-right font-medium">{customer.revenue}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getSignal(customer.debt_ratio)}`}></div>
                    <span className="text-sm font-medium">{customer.debt_ratio}%</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${customer.credit > 800 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
                    {customer.credit}점
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2 text-slate-400">
                    <button className="p-1.5 hover:bg-white hover:text-blue-600 rounded-md transition" title="전화상담">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white hover:text-blue-600 rounded-md transition" title="진단서작성">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-white hover:text-slate-600 rounded-md transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* 하단 페이지네이션 */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
          <span>총 {customers.length}명의 고객 중 1-4 표시</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50">이전</button>
            <button className="px-3 py-1 bg-blue-700 text-white rounded shadow-sm">1</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCRM;
