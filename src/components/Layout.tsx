import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-[#B4A69F] dark:text-[#D6C8C2] hover:text-[#9E8E88] dark:hover:text-[#E8DCD6] transition-colors"
            >
              Noodle Jobs
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/submit"
                className="group relative px-4 py-2 rounded-md border border-transparent
    hover:border-[#B4A69F] dark:hover:border-[#D6C8C2]
    bg-gradient-to-r from-[#B4A69F] to-[#9E8E88] dark:bg-[#4a3f3a] 
    text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white dark:bg-gray-800 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                <span className="relative group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors duration-300">
                  질문 등록하기
                </span>
              </Link>
              <button
                onClick={toggleTheme}
                className="group relative p-2 rounded-md border border-transparent 
    hover:border-[#B4A69F] dark:hover:border-[#D6C8C2]
    bg-gradient-to-r from-[#B4A69F] to-[#9E8E88] dark:bg-[#4a3f3a] 
    text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white dark:bg-gray-800 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                <span className="relative group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors duration-300">
                  {theme === "dark" ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Noodle Jobs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/about"
                className="text-sm text-gray-500 hover:text-[#B4A69F] dark:text-gray-400 dark:hover:text-[#D6C8C2] transition-colors"
              >
                About
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-500 hover:text-[#B4A69F] dark:text-gray-400 dark:hover:text-[#D6C8C2] transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-500 hover:text-[#B4A69F] dark:text-gray-400 dark:hover:text-[#D6C8C2] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
