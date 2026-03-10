import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  FileDown, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { calculateAssessment } from '../utils/calculator'; // 아까 만든 계산 로직

const AssessmentEngine = ({ customerData }) => {
  const [formData, setFormData] = useState(customerData || {
    revenue: 0,
    total_asset: 1,
    total_debt: 0,
    credit_score: 750,
    employee_count: 0,
    tax_delinquency: false
  });

  const [result, setResult] = useState(null);

  // 데이터 변경 시 실시간 진단 실행
  useEffect(() => {
    const assessment = calculateAssessment(formData);
    setResult(assessment);
  }, [formData]);

  const handleDownloadReport = () => {
    alert("KPFC 공식 1차 진단평가서(PDF)를 생성하여 다운로드합니다.");
    // 여기에 jsPDF 연동 로직 추가
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Calculator className="text-blue-700" /> KPFC 정밀 진단 엔진
          </h2>
          <button 
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition shadow-lg font-bold"
          >
            <FileDown className="w-5 h-5" /> 1차 진단평가서 다운로드 (PDF)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 데이터 입력 섹션 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold mb-6 border-b pb-2">기초 재무/신용 데이터 입력</h3>
            <div className="space-y-5">
              <InputGroup label="연 매출액 (단위: 만원)" value={formData.revenue} 
                onChange={(val) => setFormData({...formData, revenue: Number(val)})} />
              
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="자산총계 (만원)" value={formData.total_asset} 
                  onChange={(val) => setFormData({...formData, total_asset: Number(val)})} />
                <InputGroup label="부채총계 (만원)" value={formData.total_debt} 
                  onChange={(val) => setFormData({...formData, total_debt: Number(val)})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="신용점수 (NICE/KCB)" value={formData.credit_score} 
                  onChange={(val) => setFormData({...formData, credit_score: Number(val)})} />
                <InputGroup label="4대보험 인원 (명)" value={formData.employee_count} 
                  onChange={(val) => setFormData({...formData, employee_count: Number(val)})} />
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <input 
                  type="checkbox" 
                  id="tax" 
                  className="w-5 h-5 accent-blue-700"
                  checked={formData.tax_delinquency}
                  onChange={(e) => setFormData({...formData, tax_delinquency: e.target.checked})}
                />
                <label htmlFor="tax" className="text-sm font-medium text-slate-700">국세/지방세 체납 정보가 있습니까? (중요)</label>
              </div>
            </div>
          </div>

          {/* 오른쪽: 진단 결과 섹션 */}
          <div className="space-y-6">
            {result && (
              <>
                {/* 1. 종합 등급 카드 */}
                <div className={`p-8 rounded-2xl shadow-md border-t-8 transition-all ${
                  result.status === 'green' ? 'bg-emerald-50 border-emerald-500' : 
                  result.status === 'yellow' ? 'bg-amber-50 border-amber-500' : 'bg-rose-50 border-rose-500'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Overall Probability</p>
                      <h4 className="text-4xl font-black mt-1">예상 점수: {result.score}점</h4>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center animate-pulse ${
                      result.status === 'green' ? 'bg-emerald-500' : result.status === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}>
                      <ShieldCheck className="text-white w-7 h-7" />
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">{result.message}</p>
                </div>

                {/* 2. 주요 지표 분석 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" /> 핵심 재무 지표 분석
                  </h4>
                  <div className="flex items-end justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">부채비율 (Debt Ratio)</p>
                      <p className="text-2xl font-bold text-slate-800">{result.debtRatio}%</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold ${Number(result.debtRatio) > 300 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {Number(result.debtRatio) > 300 ? '기준치 초과' : '안정권 진입'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. KPFC 맞춤형 보완 전략 (Tips) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> KPFC 솔루션 가이드
                  </h4>
                  <ul className="space-y-3">
                    {result.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                    {result.warnings.map((warn, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-rose-600 font-medium">
                        <AlertTriangle className="w-4 h-4 shrink-0" /> {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 재사용 가능한 입력 폼 부품
const InputGroup = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-500 ml-1">{label}</label>
    <input 
      type="number" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
    />
  </div>
);

export default AssessmentEngine;
