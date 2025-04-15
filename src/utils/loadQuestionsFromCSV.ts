import { parse } from "csv-parse/browser/esm";
import type { CSVQuestion } from "../types";

export async function loadQuestionsFromCSV(
  filePath: string
): Promise<CSVQuestion[]> {
  // import.meta.env.BASE_URL은 "/noodle-jobs/"로 자동 치환됨
  const fullPath = new URL(
    import.meta.env.BASE_URL + filePath,
    window.location.origin
  ).toString();
  const res = await fetch(fullPath);

  if (!res.ok) {
    console.error("[❌ fetch 실패]", fullPath, res.status);
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
          console.error("[❌ CSV 파싱 실패]", err);
          reject(err);
        } else {
          console.log("[✅ CSV 파싱 성공]", records.length, "개 질문 로드됨");
          resolve(records);
        }
      }
    );
  });
}
