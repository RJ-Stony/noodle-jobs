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
            지금까지 {questions.length}개의 질문들이 쌓여있었어요
          </p>
        </div>

        {questions.length > 0 ? (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-6">
              <Link
                to="/submit"
                className="mt-1 inline-block group relative px-5 py-2 rounded-md border border-transparent
              hover:border-[#B4A69F] dark:hover:border-[#D6C8C2]
              bg-gradient-to-r from-[#B4A69F] to-[#9E8E88] dark:bg-[#4a3f3a]
              text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300
              focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                <span className="absolute inset-0 bg-white dark:bg-gray-800 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <span className="relative group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors duration-300">
                  질문 등록하기
                </span>
              </Link>
            </div>
            {questions.map((question) => (
              <motion.div
                key={question.id}
                className="w-[640px] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 min-h-32 break-words"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <Link
                      to={`/question/${question.id}`}
                      className="flex-1 group"
                    >
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors">
                        {question.title}
                      </h2>
                    </Link>
                    <div className="flex space-x-2 ml-4">
                      <Link
                        to={`/question/edit/${question.id}`}
                        className="p-2 rounded-md bg-blue-500 hover:bg-white hover:text-blue-500 dark:hover:bg-gray-800 dark:hover:text-blue-400 text-white dark:bg-blue-400 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(question.id)}
                        className="p-2 rounded-md bg-red-500 hover:bg-white hover:text-red-500 dark:hover:bg-gray-800 dark:hover:text-red-400 text-white dark:bg-red-400 border-2 border-transparent hover:border-red-500 dark:hover:border-red-400 transition-all"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
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
          <div className="w-[640px] mx-auto flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md px-6 py-12 text-center max-w-md w-full">
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                아직 등록된 질문이 없어요 !
              </p>
              <Link
                to="/submit"
                className="group relative inline-block px-5 py-2 rounded-md border border-transparent
                  hover:border-[#B4A69F] dark:hover:border-[#D6C8C2]
                  bg-gradient-to-r from-[#B4A69F] to-[#9E8E88] dark:bg-[#4a3f3a]
                  text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300
                  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                <span className="absolute inset-0 bg-white dark:bg-gray-800 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <span className="relative group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors duration-300">
                  첫 질문 등록하기
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="질문 삭제"
        confirmText="삭제"
        cancelText="취소"
      >
        <p>정말로 이 질문을 삭제하시겠습니까?</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          이 작업은 되돌릴 수 없습니다.
        </p>
      </Modal>
    </motion.div>
  );
}
