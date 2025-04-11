import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import questionsData from "../data/questions.json";
import { Category } from "../types";

export default function EditQuestion() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const categories = questionsData.categories as { [key: string]: Category };

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );
    const defaultQuestions = questionsData.questions || {};
    const allQuestions = { ...defaultQuestions, ...localQuestions };
    const question = allQuestions[id as string];

    if (!question) {
      navigate("/");
      return;
    }

    setTitle(question.title);
    setCategoryId(question.categoryId);
    setContent(question.content);
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !categoryId || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const localQuestions = JSON.parse(
        localStorage.getItem("questions") || "{}"
      );
      localQuestions[id as string] = {
        ...localQuestions[id as string],
        title,
        categoryId,
        content,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("questions", JSON.stringify(localQuestions));

      navigate(`/question/${id}`);
    } catch (error) {
      console.error("질문 수정 실패:", error);
    }
  };

  return (
    <motion.div
      className="py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            질문 수정
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="title"
                className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                질문 제목
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-[#B4A69F] dark:focus:border-[#D6C8C2] transition-all"
                placeholder="질문 제목을 입력하세요"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                카테고리
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-[#B4A69F] dark:focus:border-[#D6C8C2] transition-all"
              >
                <option value="">카테고리를 선택하세요</option>
                {Object.values(categories).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                답변
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-[#B4A69F] dark:focus:border-[#D6C8C2] transition-all resize-none"
                placeholder="답변을 입력하세요"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                취소
              </button>
              <button
                type="submit"
                className="group relative px-6 py-2.5 rounded-md bg-gradient-to-r from-[#B4A69F] to-[#9E8E88] dark:from-[#D6C8C2] dark:to-[#E8DCD6] text-white overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white dark:bg-gray-800 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                <span className="relative group-hover:text-[#B4A69F] dark:group-hover:text-[#D6C8C2] transition-colors duration-300">
                  수정하기
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
