/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f5f7fa", // 아주 연한 네이비 배경용 (라이트모드 카드 배경)
          100: "#e0e6ed", // 라이트 톤 엣지
          200: "#c6d0dc", // 흐릿한 보조
          300: "#8e99af", // 텍스트용 (연한 톤)
          400: "#5c6881", // 텍스트 강조
          500: "#344055", // 기본 강조색 / 버튼 hover
          600: "#1a1e29", // 라이트 모드 강조 or 다크모드 베이스
          700: "#151821", // 다크모드 깊은 영역
          800: "#10131b", // 더 어두운 다크 배경
          900: "#0b0d14", // 가장 깊은 네이비
          DEFAULT: "#1a1e29", // 대표 컬러로 지정
          light: "#344055", // 밝은 강조색
          dark: "#0f131a", // 아주 어두운 네이비
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
