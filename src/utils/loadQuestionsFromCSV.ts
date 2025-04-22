import { parse } from "csv-parse/browser/esm";
import type { CSVQuestion } from "../types";

export async function loadQuestionsFromCSV(): Promise<CSVQuestion[]> {
  const res = await fetch("/data/questions.csv"); // ✅ 절대경로 직접 지정

  if (!res.ok) {
    console.error("❌ CSV fetch 실패", res.status);
    throw new Error(`CSV 파일을 불러올 수 없습니다: ${res.status}`);
  }

  const text = await res.text();

  return new Promise((resolve, reject) => {
    parse(
      text,
      {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      },
      (err, records: CSVQuestion[]) => {
        if (err) {
          console.error("❌ CSV 파싱 실패", err);
          reject(err);
        } else {
          resolve(records);
        }
      }
    );
  });
}
