import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import questionsData from "../data/questions.json";
import { Question } from "../types";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );

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

  const handleDeleteClick = (id: string) => {
    setSelectedQuestionId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedQuestionId) return;

    try {
      const localQuestions = JSON.parse(
        localStorage.getItem("questions") || "{}"
      );
      delete localQuestions[selectedQuestionId];
      localStorage.setItem("questions", JSON.stringify(localQuestions));

      setQuestions(questions.filter((q) => q.id !== selectedQuestionId));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("질문 삭제 실패:", error);
    }
  };

  const categoryNames: { [key: string]: string } = {
    "operating-system": "운영체제",
    network: "네트워크",
    database: "데이터베이스",
    "data-structure": "자료구조와 알고리즘",
    "system-architecture": "시스템 아키텍처",
  };

  return (
    <motion.div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryNames[name as string] || name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            지금까지 {questions.length}개의 질문들이 쌓여있어요
          </p>
        </div>

        {questions.length > 0 ? (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-6"></div>
            {questions.map((question) => (
              <motion.div
                key={question.id}
                className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 min-h-32 break-words"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <Link
                      to={`/question/${question.id}`}
                      className="flex-1 group pr-2"
                    >
                      <h2 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors line-clamp-2 leading-snug mb-1">
                        {question.title}
                      </h2>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-5">
                    {new Date(question.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-16 text-center max-w-md w-full">
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
