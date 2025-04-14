import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import questionsData from "../data/questions.json";
import { Question } from "../types";
import { useState, useEffect } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );
    const defaultQuestions = questionsData.questions || {};
    const allQuestions = { ...defaultQuestions, ...localQuestions };

    const categoryQuestions = Object.values(allQuestions)
      .filter((q: any) => q.categoryId === name)
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ) as Question[];

    setQuestions(categoryQuestions);
  }, [name]);

  const categoryNames: { [key: string]: string } = {
    "operating-system": "운영체제",
    network: "네트워크",
    database: "데이터베이스",
    "data-structure": "자료구조와 알고리즘",
    "system-architecture": "시스템 아키텍처",
  };

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
            {categoryNames[name as string] || name}
          </h1>
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
                  <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(question.createdAt).toLocaleDateString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-16 text-center max-w-md w-full mx-auto">
            <p className="text-3xl mb-3">📭</p>
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
