gganbu-note/

├── public/              # KPFC 로고, 직인 이미지, 파비콘

├── src/

│   ├── components/      # UI 부품 (신호등 아이콘, 등급 카드, 입력 폼)

│   ├── hooks/           # 데이터 로직 (Supabase 고객 불러오기/수정)

│   ├── pages/           # 메인 화면 (Login, Dashboard, CustomerDetail, Scheduler)

│   ├── utils/           # KPFC 심사 로직 (부채비율 계산, PDF 생성기)

│   ├── App.js           # 전체 화면 경로 및 권한 설정

│   └── index.js         # 앱 진입점

├── .env                 # 보안 파일 (Supabase 주소 및 Key - 유출 주의!)

├── .gitignore           # .env 파일을 깃허브 업로드에서 제외하는 설정

└── README.md            # 프로젝트 개요 및 메뉴얼


분류,필드명 (Column),설명 (Max Information)
기본 정보,"client_name, biz_name","대표자명, 업체명"
,"biz_number, biz_type","사업자번호, 업태/업종(세분화 필요)"
,"location, founding_date","지역(원주 등), 개업일(업력 계산용)"
재무 지표,revenue_3y,최근 3년 매출 추이 (성장성 파악)
,"total_debt, total_asset","총 부채, 총 자산 (부채비율 자산부채​×100 자동 계산)"
,operating_profit,영업이익 (상환 능력 파악)
신용/세무,credit_score_nice_kcb,NICE/KCB 점수 각각 기록
,tax_delinquency,국세/지방세 체납 여부 (Y/N - 중요!)
가점 사항,employee_count,4대보험 가입자 수 (고용 가점)
,"is_youth, is_female","청년(만 39세), 여성 기업 여부"
,"patents_count, iso_cert","특허 보유 수, ISO 인증 등 기술력 지표"
상담 관리,consult_audio_url,녹음 파일 저장 위치
,consult_memo_history,상담 회차별 상세 메모 (시간순 정렬)
,current_step,현재 단계 (문의~집행완료 5단계)
