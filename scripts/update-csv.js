import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔄 Updating CSV to use answerFile references...');

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

  console.log(`📊 Processing ${records.length} questions`);

  // answer 컬럼을 answerFile로 변경
  const updatedRecords = records.map(row => {
    const newRow = {
      id: row.id,
      title: row.title,
      categoryId: row.categoryId,
      answerFile: ''
    };

    // 답변이 있는 경우 answerFile 설정
    if (row.answer && row.answer.trim()) {
      newRow.answerFile = `${row.id}.md`;
      console.log(`✅ Set answerFile for ${row.id}: ${newRow.answerFile}`);
    }

    return newRow;
  });

  // 새로운 CSV 생성
  const newCsv = stringify(updatedRecords, {
    header: true,
    columns: ['id', 'title', 'categoryId', 'answerFile']
  });

  // 원본 백업
  writeFileSync(csvPath + '.backup', csv, 'utf-8');
  console.log(`📄 Backup created: questions.csv.backup`);

  // 새로운 CSV 저장
  writeFileSync(csvPath, newCsv, 'utf-8');
  console.log(`🎉 Successfully updated ${csvPath}`);

} catch (error) {
  console.error('❌ Error updating CSV:', error);
  process.exit(1);
}