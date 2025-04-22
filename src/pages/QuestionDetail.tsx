import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CSVQuestion } from "../types";
import { useQuestions } from "../contexts/QuestionContext";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const { questions, loading } = useQuestions();
  const [question, setQuestion] = useState<CSVQuestion | null>(null);

  useEffect(() => {
    if (!loading && id) {
      const found = questions.find((q) => q.id === id);
      setQuestion(found || null);
    }
  }, [id, loading, questions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!question) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            존재하지 않는 질문이에요
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            주소를 다시 확인하시거나 아래 버튼을 눌러 홈으로 함께 가요 !
          </p>
          <Link
            to="/"
            className="inline-block bg-primary-100 dark:bg-primary text-primary hover:text-primary-light dark:text-primary-200 dark:hover:text-white transition-colors font-medium px-5 py-2 rounded-lg hover:opacity-90"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </motion.div>
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
    prose-headings:font-bold prose-headings:text-primary 
    prose-h1:mb-4 prose-h2:mb-3 prose-h3:mb-2
    prose-p:my-4 prose-li:my-2 prose-ul:pl-5 prose-ol:pl-5
    prose-strong:text-primary dark:prose-strong:text-indigo-300
    prose-code:bg-primary-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
    dark:prose-code:bg-primary-600/30
    prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-md prose-pre:overflow-x-auto
    dark:prose-pre:bg-primary-600
    prose-blockquote:italic prose-blockquote:text-primary prose-blockquote:border-l-4 prose-blockquote:pl-4
    dark:prose-blockquote:text-white/70
    dark:prose-p:text-white/90 dark:prose-li:text-white/90 dark:prose-headings:text-white
  "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkToc]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className = "", children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark as any}
                    PreTag="div"
                    customStyle={{
                      backgroundColor: "#1e1e1e",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      overflowX: "auto",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {question.answer}
          </ReactMarkdown>
        </div>
      </motion.div>
    </motion.div>
  );
}
