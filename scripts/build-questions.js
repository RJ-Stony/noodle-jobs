import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔄 Building questions data...');

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

  console.log(`📊 Found ${records.length} questions in CSV`);

  // 답변 파일들을 읽어서 통합
  const questions = records.map(row => {
    const answerFile = row.answerFile;
    let answer = '';
    
    if (answerFile) {
      const answerPath = join(projectRoot, 'public/data/answers', answerFile);
      if (existsSync(answerPath)) {
        answer = readFileSync(answerPath, 'utf-8');
        console.log(`✅ Loaded answer from ${answerFile}`);
      } else {
        console.log(`⚠️  Answer file not found: ${answerFile}`);
      }
    } else if (row.answer) {
      // 기존 CSV의 answer 필드가 있다면 그것을 사용 (마이그레이션 지원)
      answer = row.answer;
    }

    return {
      id: row.id,
      title: row.title,
      categoryId: row.categoryId,
      answer: answer
    };
  });

  // src/data 디렉토리 확인 및 생성
  const srcDataDir = join(projectRoot, 'src/data');
  if (!existsSync(srcDataDir)) {
    mkdirSync(srcDataDir, { recursive: true });
  }

  // JSON 파일로 저장
  const outputPath = join(srcDataDir, 'questionsData.json');
  writeFileSync(outputPath, JSON.stringify(questions, null, 2), 'utf-8');

  console.log(`🎉 Successfully generated ${outputPath}`);
  console.log(`📦 Total questions processed: ${questions.length}`);

} catch (error) {
  console.error('❌ Error building questions:', error);
  process.exit(1);
}