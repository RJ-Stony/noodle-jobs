import React, { createContext, useContext, useEffect, useState } from "react";
import { CSVQuestion } from "../types";
import questionsData from "../data/questionsData.json";

interface QuestionContextType {
  questions: CSVQuestion[];
  loading: boolean;
}

const QuestionContext = createContext<QuestionContextType>({
  questions: [],
  loading: true,
});

export const useQuestions = () => useContext(QuestionContext);

export const QuestionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [questions, setQuestions] = useState<CSVQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JSON 데이터를 직접 사용 (빌드 타임에 이미 처리됨)
    setQuestions(questionsData as CSVQuestion[]);
    setLoading(false);
  }, []);

  return (
    <QuestionContext.Provider value={{ questions, loading }}>
      {children}
    </QuestionContext.Provider>
  );
};
