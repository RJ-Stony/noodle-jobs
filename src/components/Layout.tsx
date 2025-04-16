import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-primary-50 text-primary dark:bg-primary-dark dark:text-white transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-primary-dark/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-primary-light dark:text-white dark:hover:text-primary-200 transition-colors"
            >
              Noodle Jobs
            </Link>

            <button
              onClick={toggleTheme}
              className="group relative p-2 rounded-md border border-transparent 
              hover:border-primary dark:hover:border-primary-300
              bg-gradient-to-r from-primary to-primary-light dark:bg-primary 
              text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute inset-0 bg-white dark:bg-primary-dark transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              <span className="relative group-hover:text-primary dark:group-hover:text-primary-200 transition-colors duration-300">
                {theme === "dark" ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-md dark:bg-primary-dark/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-primary-400 dark:text-primary-300">
              © 2025 Noodle Jobs. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="https://injoycode.tistory.com/"
                className="text-sm text-primary-400 hover:text-primary dark:text-primary-300 dark:hover:text-primary-100 transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/"
                className="text-sm text-primary-400 hover:text-primary dark:text-primary-300 dark:hover:text-primary-100 transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/"
                className="text-sm text-primary-400 hover:text-primary dark:text-primary-300 dark:hover:text-primary-100 transition-colors"
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
