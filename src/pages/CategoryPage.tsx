import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Categories } from "../types";
import { CSVQuestion } from "../types";
import { loadQuestionsFromCSV } from "../utils/loadQuestionsFromCSV";
import questionsData from "../data/questions.json"; // 카테고리용

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const [questions, setQuestions] = useState<CSVQuestion[]>([]);

  useEffect(() => {
    loadQuestionsFromCSV("/data/questions.csv").then((allQuestions) => {
      const categoryQuestions = allQuestions
        .filter((q) => q.categoryId.toLowerCase() === name?.toLowerCase())
        .sort((a, b) => a.id.localeCompare(b.id));
      setQuestions(categoryQuestions);
    });
  }, [name]);

  const categories = questionsData.categories as Categories;
  const category = categories[name as string];
  const categoryTitle = category?.name || name;
  const categoryDescription = category?.description;

  return (
    <motion.div
      className="py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryTitle}
          </h1>
          {categoryDescription && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {categoryDescription}
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            지금까지 {questions.length}개의 질문들이 쌓여있어요
          </p>
        </div>

        {questions.length > 0 ? (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            {questions.map((question) => (
              <motion.div
                key={question.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full"
              >
                <Link
                  to={`/question/${question.id}`}
                  className="flex flex-col gap-3 p-5 group"
                >
                  <div className="flex items-start gap-2">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400 group-hover:text-[#B4A69F] mt-1" />
                    <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-gray-900 group-hover:text-[#B4A69F]">
                      {question.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-16 text-center max-w-md w-full mx-auto">
            <p className="flex flex-col items-center justify-center mb-3">
              <InboxIcon className="w-10 h-10 text-gray-400 group-hover:text-[#B4A69F] mt-1" />
            </p>
            <p className="text-base font-medium text-gray-800 dark:text-white mb-2">
              여기엔 아직 등록된 질문이 없어요
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              곧 질문이 추가될 예정이에요!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
