import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitQuestion() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "os", // 카테고리 ID 값
  });
  const [copiedJson, setCopiedJson] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const localQuestions = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );
    const newId = `q${Date.now()}`;

    const newQuestion = {
      id: newId,
      title: form.question,
      answer: form.answer,
      categoryId: form.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 저장
    const updatedQuestions = {
      ...localQuestions,
      [newId]: newQuestion,
    };
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    // JSON 복사용
    const jsonString = `"${newId}": ${JSON.stringify(newQuestion, null, 2)},`;
    console.log("➡ questions.json에 붙여넣을 JSON:");
    console.log(jsonString);
    setCopiedJson(jsonString);

    // 페이지 이동
    navigate(`/category/${form.category}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(copiedJson).then(() => {
      alert("✅ JSON이 복사되었습니다!");
    });
  };

  return (
    <div className="min-h-screen text-gray-900 dark:bg-gray-900 dark:text-white p-6 transition-colors">
      <h2 className="text-2xl font-bold mb-6">질문 등록하기</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 질문 제목 */}
        <input
          type="text"
          placeholder="질문 제목"
          className="w-full p-3 rounded-lg border 
            bg-white text-gray-900 
            dark:bg-gray-800 dark:text-white 
            border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-[#B4A69F] dark:focus:ring-[#D6C8C2]"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />

        {/* 답변 내용 */}
        <textarea
          placeholder="답변 내용"
          className="w-full p-3 rounded-lg h-32 border resize-none 
            bg-white text-gray-900 
            dark:bg-gray-800 dark:text-white 
            border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-[#B4A69F] dark:focus:ring-[#D6C8C2]"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          required
        />

        {/* 카테고리 */}
        <select
          className="w-full p-3 rounded-lg border 
            bg-white text-gray-900 
            dark:bg-gray-800 dark:text-white 
            border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-[#B4A69F] dark:focus:ring-[#D6C8C2]"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="os">운영체제</option>
          <option value="network">네트워크</option>
          <option value="database">데이터베이스</option>
          <option value="algorithm">자료구조와 알고리즘</option>
          <option value="architecture">시스템 아키텍처</option>
        </select>

        {/* 등록 버튼 */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold
    bg-[#43302b] text-white 
    hover:bg-[#846358] 
    dark:bg-white dark:text-[#43302b] 
    hover:opacity-90 
    transition-all 
    border border-transparent
    focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent"
        >
          등록하기
        </button>
      </form>

      {/* JSON 복사 영역 */}
      {copiedJson && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-mono break-all text-gray-800 dark:text-gray-200">
            {copiedJson}
          </p>
          <button
            onClick={handleCopy}
            className="mt-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-opacity-80 transition"
          >
            JSON 복사하기
          </button>
        </div>
      )}
    </div>
  );
}
