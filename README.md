# 🍜 Noodle Jobs

개발자 면접 준비를 위한 CS 질문/답변 학습 플랫폼입니다.

## 주요 기능

- 운영체제, 네트워크, 데이터베이스 등 주요 CS 주제별 질문 모음
- 카테고리별 질문 브라우징
- 질문 상세 보기 및 답변 학습
- 새로운 질문 등록 기능
- 반응형 디자인으로 모바일 지원

## 기술 스택

- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- Heroicons

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/your-username/noodle-jobs.git
cd noodle-jobs

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
# 프로덕션용 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### GitHub Pages 배포

1. `package.json`의 `homepage` 필드를 자신의 GitHub Pages URL로 수정:

```json
{
  "homepage": "https://your-username.github.io/noodle-jobs"
}
```

2. 배포 실행:

```bash
npm run deploy
```

## 프로젝트 구조

```
noodle-jobs/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── data/          # 질문/답변 데이터
│   ├── types/         # TypeScript 타입 정의
│   └── App.tsx        # 메인 앱 컴포넌트
├── public/            # 정적 파일
└── index.html         # 진입점
```

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 문의

- GitHub Issues를 통해 버그를 제보하거나 새로운 기능을 제안해주세요.
- 이메일: your-email@example.com
  > > > > > > > 6e504f9 (deploy: 초기 설정 및 배포 준비)
