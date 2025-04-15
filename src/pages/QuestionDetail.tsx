import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { CSVQuestion } from "../types";
import { loadQuestionsFromCSV } from "../utils/loadQuestionsFromCSV";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<CSVQuestion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestionsFromCSV("/data/questions.csv").then((allQuestions) => {
      const found = allQuestions.find((q) => q.id === id);
      if (!found) {
        navigate("/");
        return;
      }

      setQuestion(found);
      setLoading(false);
    });
  }, [id, navigate]);

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
        className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start mb-6 gap-2">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400 group-hover:text-[#B4A69F] mt-1" />
          <h1 className="text-xl font-bold text-gray-900">{question.title}</h1>
        </div>

        <div
          className="prose max-w-none
             prose-p:my-4 prose-li:my-2 prose-strong:text-[#43302b]
             prose-p:text-gray-700
             prose-ul:marker:text-[#B4A69F] prose-hr:border-[#D6C8C2]"
        >
          <ReactMarkdown>{question.answer}</ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  );
}
