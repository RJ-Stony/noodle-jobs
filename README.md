# 🍜 Noodle Job's

**기술 면접 준비가 라면 끓이는 것보다 쉬워지는 순간!**  
개발자를 위한 기술 면접 질문 학습 웹앱, **Noodle Jobs**입니다.  
운영체제, 네트워크, 데이터베이스 등 핵심 CS 주제를 카테고리별로 정리하고, 체계적으로 학습할 수 있습니다.

---

## ✅ 주요 기능

- 📚 **CS 지식 기반 카테고리 구성**: 운영체제, 네트워크, DB, 아키텍처, 알고리즘 등 분야별 정리
- 🔍 **질문 리스트 탐색**: 카테고리별 질문들을 모아보기
- 🧠 **질문 상세 보기 및 답변 학습**: ReactMarkdown으로 마크다운 형식 답변 지원
- 📝 **사용자 질문 등록 기능**: 로컬스토리지 기반 저장 (향후 서버 연동 고려 가능)
- 📱 **모바일 최적화**: 반응형 Tailwind UI 설계
- 🌗 **다크 모드 지원**: ThemeContext 기반 테마 전환 가능

---

## 🛠️ 기술 스택

- **Frontend**: React + Vite
- **Language**: TypeScript
- **Style**: Tailwind CSS
- **Routing**: React Router
- **Icons**: Heroicons
- **State**: Context API

---

## 📁 디렉토리 구조

```
noodle-jobs/
├── public/                  # 정적 파일 (실제 질문 DB)
├── src/
│   ├── assets/              # 이미지, 아이콘 등
│   ├── components/          # Modal, Layout 등 재사용 UI
│   ├── contexts/            # ThemeContext, 테마 전환 관련
│   ├── data/                # questions.json (질문 카테고리)
│   ├── pages/               # Home, CategoryPage, QuestionDetail
│   ├── types/               # 공통 타입 정의 (Question 등)
│   ├── utils/               # 질문 CSV 로딩 유틸 함수
│   └── App.tsx              # 메인 라우팅 설정
├── tailwind.config.js       # Tailwind 설정
├── vite.config.ts           # Vite 설정
└── README.md
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
