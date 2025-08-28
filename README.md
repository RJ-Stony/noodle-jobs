# 🍜 Noodle Job's

**기술 면접 준비가 라면 끓이는 것보다 쉬워지는 순간!**  
개발자를 위한 기술 면접 질문 학습 웹앱, **Noodle Jobs**입니다.  
운영체제, 네트워크, 데이터베이스 등 핵심 CS 주제를 카테고리별로 정리하고, 체계적으로 학습할 수 있습니다.

## 🌟 특별한 점

- **🚀 빠른 초기 로딩**: 빌드 타임에 CSV를 JSON으로 변환하여 런타임 파싱 없이 즉시 로드
- **📝 편리한 답변 관리**: 개별 마크다운 파일로 답변을 작성하고 자동으로 통합
- **🎯 체계적인 학습**: 12개 카테고리, 380개+ 질문으로 구성된 체계적인 면접 준비
- **📱 모바일 최적화**: 반응형 디자인으로 어디서나 학습 가능

---

## ✅ 주요 기능

### 📚 카테고리별 학습

- **운영체제**: 프로세스, 스레드, 메모리 관리 등 OS 핵심 개념
- **네트워크**: TCP/UDP, HTTP, 보안 등 네트워크 지식
- **데이터베이스**: SQL, NoSQL, 트랜잭션, 인덱스 등 DB 전반
- **시스템 아키텍처**: MSA, 로드밸런싱, 캐시 등 설계 패턴
- **자료구조/알고리즘**: 기본 자료구조부터 복잡한 알고리즘까지
- **프로그래밍 언어**: 다양한 언어별 특징과 패러다임
- **클라우드**: AWS, 컨테이너, 서버리스 등 클라우드 기술
- **보안**: 암호화, 인증, 웹 보안 등 보안 전반
- **DevOps**: CI/CD, 인프라 관리, 모니터링 등
- **테스트**: 테스트 전략, 자동화, TDD 등
- **모바일**: 앱 개발, 성능 최적화 등
- **머신러닝**: ML 기본 개념부터 딥러닝까지

### 🔍 스마트 검색 및 필터링

- 질문 제목과 답변 내용 전체 검색
- 카테고리별 필터링
- 학습 완료 체크 기능
- 정렬 옵션 (최신순, 제목순, 체크한 질문만)

### 🧠 학습 지원 기능

- **마크다운 지원**: 코드 블록, 표, 링크 등 풍부한 형식
- **다크 모드**: 눈의 피로를 줄이는 다크 테마
- **무한 스크롤**: 부드러운 페이지네이션
- **진행률 추적**: 로컬스토리지 기반 학습 진도 관리

---

## 🛠️ 기술 스택

### Frontend

- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성 보장
- **Vite**: 빠른 개발 서버 및 번들링
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Framer Motion**: 부드러운 애니메이션

### 라우팅 및 상태관리

- **React Router**: 클라이언트 사이드 라우팅
- **React Context API**: 전역 상태 관리
- **React Hooks**: 현대적인 상태 관리

### 데이터 처리

- **CSV Parse**: CSV 데이터 파싱
- **Build-time Processing**: 빌드 시점에 데이터 변환
- **Markdown Rendering**: React Markdown으로 마크다운 렌더링

---

## 📁 프로젝트 구조

### 전체 구조

```
noodle-jobs/
├── public/
│   ├── data/
│   │   ├── questions.csv         # 질문 메타데이터 (제목, 카테고리, 답변파일명)
│   │   └── answers/              # 개별 답변 마크다운 파일들
│   │       ├── q8.md
│   │       ├── q9.md
│   │       └── ...
│   └── manifest.json
├── src/
│   ├── assets/                   # 정적 이미지 파일
│   ├── components/               # 재사용 가능한 UI 컴포넌트
│   │   ├── Layout.tsx           # 공통 레이아웃
│   │   ├── Modal.tsx            # 모달 컴포넌트
│   │   ├── PageTransition.tsx   # 페이지 전환 애니메이션
│   │   └── SortDropdown.tsx     # 정렬 드롭다운
│   ├── contexts/                # React Context
│   │   ├── QuestionContext.tsx  # 질문 데이터 관리
│   │   ├── ThemeContext.tsx     # 테마 전환
│   │   └── theme.ts             # 테마 설정
│   ├── data/                    # 데이터 파일
│   │   ├── categories.json      # 카테고리 정보 (기존)
│   │   ├── questions.json       # 카테고리 메타데이터 (기존)
│   │   └── questionsData.json   # 빌드 시 생성되는 통합 질문 데이터
│   ├── pages/                   # 라우트 페이지들
│   │   ├── Home.tsx            # 메인 페이지 (카테고리 목록)
│   │   ├── CategoryPage.tsx    # 카테고리별 질문 목록
│   │   └── QuestionDetail.tsx  # 질문 상세 페이지
│   ├── types/                  # TypeScript 타입 정의
│   │   └── index.ts           # 공통 타입들 (Question, Category 등)
│   ├── utils/                 # 유틸리티 함수
│   │   └── loadQuestionsFromCSV.ts  # CSV 로딩 유틸 (현재 미사용)
│   ├── App.tsx               # 메인 앱 컴포넌트
│   ├── main.tsx             # 앱 진입점
│   └── index.css           # 전역 스타일
├── scripts/                # 빌드 스크립트들
│   ├── build-questions.js  # CSV→JSON 변환 스크립트
│   ├── extract-answers.js  # 기존 CSV에서 답변 추출
│   └── update-csv.js      # CSV 구조 업데이트
└── 설정 파일들...
```

### 데이터 플로우

```
📄 questions.csv + 📁 answers/*.md
            ↓ (빌드 시)
      🔧 build-questions.js
            ↓
    📄 questionsData.json
            ↓ (런타임)
    ⚛️ React 앱에서 즉시 로드
```

---

## 🚀 시작하기

### ⚙️ 설치 전 준비

- Node.js 18+
- npm 9+

### 🔧 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/noodle-jobs.git
cd noodle-jobs

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 🔨 프로덕션 빌드

```bash
npm run build      # 빌드
npm run preview    # 빌드된 결과 미리보기
```

---

## 🌐 GitHub Pages 배포

`gh-pages` 브랜치를 활용하여 정적 배포가 가능합니다.

1. `package.json` 수정:

```json
{
  "homepage": "https://your-username.github.io/noodle-jobs"
}
```

2. 배포 실행:

```bash
npm run deploy
```

---

## 💡 향후 개선 아이디어

- [ ] 질문 검색 기능 추가
- [ ] 서버 연동으로 질문 공유 기능
- [ ] GitHub OAuth 등 로그인 기능
- [ ] 질문 북마크 및 오답노트 기능

---

## 📜 라이선스

MIT
