import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
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
          className="text-primary-400 hover:text-primary dark:text-primary-300 dark:hover:text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-2">
        <Link
          to={`/category/${question.categoryId}`}
          className="inline-flex items-center text-primary hover:text-primary-light dark:text-primary-200 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Category
        </Link>
      </div>

      <motion.div
        className="w-full max-w-3xl mx-auto bg-white dark:bg-primary-500 rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <ChatBubbleLeftRightIcon className="w-4 h-4 flex-shrink-0 sm:w-5 sm:h-5 text-primary dark:text-white" />
          <h2 className="text-[17px] font-bold text-primary dark:text-white">
            {question.title}
          </h2>
        </div>

        <div
          className="
            prose max-w-none 
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg 
            prose-p:my-3 prose-li:my-1 prose-ul:pl-5
            prose-headings:font-bold prose-headings:text-primary 
            prose-strong:text-primary-light 
            prose-a:text-primary hover:prose-a:text-primary-light
            prose-p:text-primary-600 dark:prose-p:text-white/80
            prose-li:text-primary-600 dark:prose-li:text-white/80
            prose-ul:marker:text-primary
            prose-th:text-center
            prose-td:px-4 prose-td:py-2
            dark:prose-a:text-primary-200 dark:hover:prose-a:text-white
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {question.answer}
          </ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  );
}
