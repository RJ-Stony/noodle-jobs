import { useEffect, useState, SVGProps } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ComputerDesktopIcon,
  GlobeAltIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CubeIcon,
  FireIcon,
  ChartBarIcon,
  CloudIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
  BeakerIcon,
  RectangleStackIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import questionsData from "../data/questions.json";
import { CSVQuestion, Category } from "../types";
import { loadQuestionsFromCSV } from "../utils/loadQuestionsFromCSV";

const iconComponents: {
  [key: string]: React.ComponentType<SVGProps<SVGSVGElement>>;
} = {
  ComputerDesktopIcon,
  GlobeAltIcon,
  CircleStackIcon,
  CodeBracketIcon,
  CubeIcon,
  ChartBarIcon,
  CloudIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  Cog6ToothIcon,
  BeakerIcon,
  RectangleStackIcon,
  CommandLineIcon,
};

export default function Home() {
  const [questions, setQuestions] = useState<CSVQuestion[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const categories = questionsData.categories as { [key: string]: Category };

  useEffect(() => {
    loadQuestionsFromCSV("/data/questions.csv").then((qs) => {
      setQuestions(qs);
      setQuestionCount(qs.length);
    });
  }, []);

  return (
    <motion.div
      className="py-12"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-12 dark:text-white">
        <motion.h1
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          면<span className="text-[#B4A69F]">Job's</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 flex justify-center items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          기술 면접, 라면보다 쉽게 끓여드릴게요
          <FireIcon className="w-5 h-5 text-orange-500" />
        </motion.p>
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400 mt-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <span className="font-medium">{questionCount}개</span>의 질문이
          준비되어 있어요
        </motion.p>
      </div>

      <motion.div className="home-grid">
        {Object.values(categories).map((category, index) => {
          const Icon = iconComponents[category.icon];
          const count = questions.filter(
            (q) => q.categoryId.toLowerCase() === category.id.toLowerCase()
          ).length;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
            >
              <Link
                to={`/category/${category.id}`}
                className="card category-card"
              >
                <Icon className="category-icon" />
                <h2 className="category-title flex items-center mb-2 gap-2">
                  {category.name}
                  <span className="text-xs text-gray-400 font-normal">
                    총 {count}개
                  </span>
                </h2>
                <p className="category-description line-clamp-1">
                  {category.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
