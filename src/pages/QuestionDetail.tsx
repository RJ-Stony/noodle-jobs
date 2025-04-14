import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import questionsData from "../data/questions.json";
import { Question } from "../types";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    // localStorage와 기본 데이터에서 질문 찾기
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );
    const defaultQuestions = questionsData.questions || {};
    const allQuestions = { ...defaultQuestions, ...localQuestions };

    const foundQuestion = allQuestions[id as string] as Question;
    if (!foundQuestion) {
      navigate("/");
      return;
    }

    setQuestion(foundQuestion);
    setLoading(false);
  }, [id, navigate]);

  const handleDelete = () => {
    if (!id) return;

    try {
      const localQuestions = JSON.parse(
        localStorage.getItem("questions") || "{}"
      );
      delete localQuestions[id];
      localStorage.setItem("questions", JSON.stringify(localQuestions));
      navigate("/");
    } catch (error) {
      console.error("질문 삭제 실패:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B4A69F]"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          질문을 찾을 수 없습니다.
        </h1>
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <Link
          to={`/category/${question.categoryId}`}
          className="inline-flex items-center text-[#B4A69F] hover:text-[#9E8E88] dark:text-[#D6C8C2] dark:hover:text-[#E8DCD6] transition-colors mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          카테고리로 돌아가기
        </Link>
      </div>

      <motion.div
        className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {question.title}
          </h1>
          <div className="flex space-x-3">
            <Link
              to={`/question/edit/${question.id}`}
              className="p-2 rounded-md bg-blue-500 hover:bg-white hover:text-blue-500 dark:hover:bg-gray-800 dark:hover:text-blue-400 text-white dark:bg-blue-400 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
            >
              <PencilIcon className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="p-2 rounded-md bg-red-500 hover:bg-white hover:text-red-500 dark:hover:bg-gray-800 dark:hover:text-red-400 text-white dark:bg-red-400 border-2 border-transparent hover:border-red-500 dark:hover:border-red-400 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
            {question.answer}
          </p>
        </div>
      </motion.div>

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
