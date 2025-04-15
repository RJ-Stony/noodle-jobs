import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Categories } from "../types";
import { CSVQuestion } from "../types";
import { loadQuestionsFromCSV } from "../utils/loadQuestionsFromCSV";
import questionsData from "../data/questions.json";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const [questions, setQuestions] = useState<CSVQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadQuestionsFromCSV("/data/questions.csv").then((allQuestions) => {
      const categoryQuestions = allQuestions
        .filter((q) => q.categoryId.toLowerCase() === name?.toLowerCase())
        .sort((a, b) => a.id.localeCompare(b.id));
      setQuestions(categoryQuestions);
    });
  }, [name]);

  const filteredQuestions = questions.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.title.toLowerCase().includes(term) ||
      q.answer.toLowerCase().includes(term)
    );
  });

  function highlightText(text: string, keyword: string) {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark
          key={index}
          className="bg-[#e8d3cc] dark:bg-[#6a361a]/60 text-inherit px-[2px] py-[0.5px] rounded-sm"
        >
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  }

  const categories = questionsData.categories as Categories;
  const category = categories[name as string];
  const categoryTitle = category?.name || name;
  const categoryDescription = category?.description;

  return (
    <motion.div
      className="py-3 px-3 sm:px-3 lg:px-4 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Link
          to="/"
          className="inline-flex items-center text-[#B4A69F] hover:text-[#9E8E88] dark:text-[#D6C8C2] dark:hover:text-[#E8DCD6] transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Home
        </Link>
      </div>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryTitle}
          </h1>
          {categoryDescription && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {categoryDescription}
            </p>
          )}
          {searchTerm ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {questions.length}개 중에 {filteredQuestions.length}개가
              검색되었어요
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              지금까지 {questions.length}개의 질문들이 쌓여있어요
            </p>
          )}

          <div className="mt-4 flex justify-center">
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              placeholder="질문이나 궁금한 내용을 검색해주세요 !"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xl px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#B4A69F] focus:border-[#B4A69F] bg-white text-[#B4A69F] dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            {filteredQuestions.map((question) => (
              <motion.div
                key={question.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full"
              >
                <Link
                  to={`/question/${question.id}`}
                  className="flex flex-col gap-3 p-5 group"
                >
                  <div className="flex items-center gap-3">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 flex-shrink-0 sm:w-5 sm:h-5 text-gray-400 dark:group-hover:text-[#b89685]" />
                    <h2 className="text-sm sm:text-[17px] font-semibold leading-snug tracking-tight text-gray-900 dark:group-hover:text-[#b89685]">
                      {highlightText(question.title, searchTerm)}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-16 py-16 text-center max-w-md w-full mx-auto">
            <p className="flex flex-col items-center justify-center mb-3">
              <InboxIcon className="w-10 h-10 text-gray-400 group-hover:text-[#B4A69F] mt-1" />
            </p>
            <p className="text-base font-medium text-gray-800 dark:text-white mb-2">
              해당하는 질문이 없어요
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              다시 시도해봐요 !
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
