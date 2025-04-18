import React, { createContext, useContext, useEffect, useState } from "react";
import { CSVQuestion } from "../types";
import { loadQuestionsFromCSV } from "../utils/loadQuestionsFromCSV";

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
    loadQuestionsFromCSV("/data/questions.csv").then((qs) => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  return (
    <QuestionContext.Provider value={{ questions, loading }}>
      {children}
    </QuestionContext.Provider>
  );
};
