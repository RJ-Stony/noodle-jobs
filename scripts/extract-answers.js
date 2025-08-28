import { readFileSync, writeFileSync, existsSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔄 Extracting answers from CSV to markdown files...');

try {
  // CSV 파일 읽기 (BOM 제거)
  const csvPath = join(projectRoot, 'public/data/questions.csv');
  let csv = readFileSync(csvPath, 'utf-8');
  if (csv.charCodeAt(0) === 0xFEFF) {
    csv = csv.slice(1); // BOM 제거
  }
  const records = parse(csv, { 
    columns: true,
    skip_empty_lines: true,
    trim: true 
  });

  const answersDir = join(projectRoot, 'public/data/answers');
  let extractedCount = 0;

  records.forEach(row => {
    if (row.answer && row.answer.trim()) {
      const filename = `${row.id}.md`;
      const filepath = join(answersDir, filename);
      
      // 이미 파일이 있으면 건너뛰기
      if (existsSync(filepath)) {
        console.log(`⏭️  Skipping ${filename} (already exists)`);
        return;
      }

      // 마크다운 파일로 저장
      writeFileSync(filepath, row.answer.trim(), 'utf-8');
      console.log(`✅ Extracted ${filename}`);
      extractedCount++;
    }
  });

  console.log(`🎉 Successfully extracted ${extractedCount} answer files`);

} catch (error) {
  console.error('❌ Error extracting answers:', error);
  process.exit(1);
}