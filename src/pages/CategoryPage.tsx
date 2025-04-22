import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { useInView } from "react-intersection-observer";
import { Categories } from "../types";
import { CSVQuestion } from "../types";
import questionsData from "../data/questions.json";
import SortDropdown from "../components/SortDropdown";
import { useQuestions } from "../contexts/QuestionContext";

const LOCAL_KEY = "checkedQuestions";

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const { questions } = useQuestions();
  const [filteredQuestions, setFilteredQuestions] = useState<CSVQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<"title" | "recent" | "checked">(
    "recent"
  );
  const [visibleCount, setVisibleCount] = useState(10);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setCheckedIds(JSON.parse(saved));
    }
  }, []);

  const toggleChecked = (id: string) => {
    setCheckedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (!name) return;

    const categoryQuestions = questions
      .filter((q) => q.categoryId.toLowerCase() === name.toLowerCase())
      .sort((a, b) => a.id.localeCompare(b.id));

    setFilteredQuestions(categoryQuestions);
    setVisibleCount(10);
  }, [name, questions]);

  const searchedQuestions = filteredQuestions.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.title.toLowerCase().includes(term) ||
      q.answer.toLowerCase().includes(term)
    );
  });

  const sortedQuestions = (() => {
    if (sortType === "checked") {
      return searchedQuestions.filter((q) => checkedIds.includes(q.id));
    } else if (sortType === "title") {
      return [...searchedQuestions].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      return [...searchedQuestions].sort((a, b) => b.id.localeCompare(a.id));
    }
  })();

  const visibleQuestions = sortedQuestions.slice(0, visibleCount);

  useEffect(() => {
    if (inView && visibleCount < sortedQuestions.length) {
      setVisibleCount((prev) => prev + 10);
    }
  }, [inView, sortedQuestions.length]);

  function highlightText(text: string, keyword: string) {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark
          key={index}
          className="bg-primary-100 dark:bg-primary-600/60 text-inherit px-[2px] py-[0.5px] rounded-sm"
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
      className="py-3 px-3 sm:px-3 lg:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary-light dark:text-primary-200 dark:hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Home
        </Link>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-2">
            {categoryTitle}
          </h1>
          {categoryDescription && (
            <p className="text-sm text-primary-500 dark:text-white/70 mb-1">
              {categoryDescription}
            </p>
          )}
          {searchTerm ? (
            <p className="text-sm text-primary-500 dark:text-white/70">
              {filteredQuestions.length}개 중에 {sortedQuestions.length}개가
              검색되었어요
            </p>
          ) : (
            <p className="text-sm text-primary-500 dark:text-white/70">
              지금까지 {filteredQuestions.length}개의 질문들이 쌓여있어요
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
              className="w-full max-w-xl px-4 py-2 border border-primary-200 dark:border-primary-600 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary 
                         text-primary dark:text-white bg-white dark:bg-primary-500 
                         placeholder:text-primary-400 dark:placeholder:text-white/50"
            />
          </div>

          <div className="flex justify-end mt-4 max-w-3xl mx-auto">
            <SortDropdown sortType={sortType} setSortType={setSortType} />
          </div>
        </div>

        {visibleQuestions.length > 0 ? (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            {visibleQuestions.map((question) => (
              <motion.div
                key={question.id}
                layout
                layoutId={question.id}
                initial={{ opacity: 0.8, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="bg-white dark:bg-primary-500 rounded-xl shadow-md hover:shadow-lg w-full"
              >
                <Link
                  to={`/question/${question.id}`}
                  className="flex flex-col gap-3 p-5 group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkedIds.includes(question.id)}
                      onChange={() => toggleChecked(question.id)}
                      className="w-3 h-3 flex-shrink-0 sm:w-4 sm:h-4 accent-primary-400 dark:accent-primary-600 transition-all duration-100 ease-in-out scale-100 hover:scale-110 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <ChatBubbleLeftRightIcon className="w-4 h-4 flex-shrink-0 sm:w-5 sm:h-5 text-primary-500 dark:text-white group-hover:text-primary dark:group-hover:text-primary-200" />
                    <h2 className="text-sm sm:text-[17px] font-semibold leading-snug tracking-tight text-primary-500 dark:text-white group-hover:text-primary dark:group-hover:text-primary-200">
                      {highlightText(question.title, searchTerm)}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
            {visibleCount < sortedQuestions.length && (
              <div
                ref={ref}
                className="h-10 w-full flex justify-center items-center text-sm text-primary-400"
              >
                질문을 더 찾고 있어요...
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-primary-800 rounded-xl shadow-md px-16 py-16 text-center max-w-md w-full mx-auto">
            <p className="flex flex-col items-center justify-center mb-3">
              <InboxIcon className="w-10 h-10 text-primary-300 group-hover:text-primary mt-1" />
            </p>
            <p className="text-base font-medium text-primary dark:text-white mb-2">
              해당하는 질문이 없어요
            </p>
            <p className="text-sm text-primary-400 dark:text-white/70 leading-relaxed">
              다시 시도해봐요 !
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
