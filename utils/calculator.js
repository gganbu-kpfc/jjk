/**
 * KPFC 정책자금 1차 진단 엔진
 * 작성자: 깐부파트너스 이종현 대표
 */

export const calculateAssessment = (data) => {
  const { total_asset, total_debt, revenue, credit_score, birth_date, employee_count, tax_delinquency } = data;

  // 1. 부채비율 계산
  const debtRatio = total_asset > 0 ? (total_debt / total_asset) * 100 : 0;

  // 2. 청년 기준 확인 (2026년 기준 만 39세 이하)
  const currentYear = new Date().getFullYear();
  const birthYear = new Date(birth_date).getFullYear();
  const age = currentYear - birthYear;
  const isYouth = age <= 39;

  // 3. 심사 신호등 (Signal) 로직
  let status = "green"; // 기본값: 양호
  let message = "승인 가능성이 높습니다. 적극적인 준비를 권고합니다.";
  const warnings = [];

  // [위험 신호 - Red]
  if (tax_delinquency === true) {
    status = "red";
    message = "국세/지방세 체납이 감지되었습니다. 즉시 보완이 필요합니다.";
    warnings.push("체납 정보 존재 (심사 불가)");
  } else if (debtRatio > 500) {
    status = "red";
    message = "부채비율이 매우 높습니다. 특별 보증 상품 검토가 필요합니다.";
    warnings.push(`부채비율 과다 (${debtRatio.toFixed(1)}%)`);
  } else if (credit_score < 600) {
    status = "red";
    message = "신용점수가 보수적인 권역입니다. 정책적 특례 자금 확인이 필요합니다.";
    warnings.push("신용점수 관리 필요 (600점 미만)");
  }

  // [주의 신호 - Yellow]
  else if (debtRatio > 300 || (credit_score >= 600 && credit_score < 720)) {
    status = "yellow";
    message = "일부 항목 보완 시 승인 가능성이 높습니다.";
    if (debtRatio > 300) warnings.push("부채비율 300% 초과");
    if (credit_score < 720) warnings.push("신용도 보완 필요 (720점 미만)");
  }

  // 4. 가점 항목 및 추천 전략
  const tips = [];
  if (isYouth) tips.push("청년창업자금 우선 매칭 가능");
  if (employee_count > 0) tips.push("일자리 창출 가점 확보 (유리)");
  if (revenue > 0) tips.push("기업 성장성 지표 반영 가능");

  return {
    score: calculateScore(debtRatio, credit_score, revenue), // 종합 점수 산출 함수(별도)
    status,
    message,
    warnings,
    tips,
    isYouth,
    debtRatio: debtRatio.toFixed(1)
  };
};

// 종합 점수 산출 로직 (100점 만점 기준)
const calculateScore = (debtRatio, creditScore, revenue) => {
  let score = 50; // 기본 시작 점수

  // 부채비율에 따른 가감점
  if (debtRatio < 150) score += 20;
  else if (debtRatio < 300) score += 10;
  else if (debtRatio > 500) score -= 30;

  // 신용점수에 따른 가감점
  if (creditScore > 850) score += 30;
  else if (creditScore > 750) score += 15;
  else if (creditScore < 650) score -= 20;

  return Math.min(Math.max(score, 0), 100); // 0~100점 사이로 제한
};
