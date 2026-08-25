const XLSX = require('xlsx');

const classWorkbook = XLSX.readFile('C:\\Projetos\\escala eventual\\horario-turmas-individual (2) Agosto.xlsx');

console.log('Class Sheets:', classWorkbook.SheetNames);

classWorkbook.SheetNames.forEach(sheetName => {
  console.log(`\n=== SHEET: ${sheetName} ===`);
  const sheet = classWorkbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  for (let i = 0; i < Math.min(25, data.length); i++) {
    console.log(`Row ${i}:`, JSON.stringify(data[i]));
  }
});
