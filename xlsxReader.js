import xlsx from "xlsx";
import * as path from 'path'
import {saveVector} from './zilliz.js'

// Function to read an XLSX file and log each line
async function readXlsxAndLog(filePath) {
    // Read the workbook
    const workbook = xlsx.readFile(filePath);
    
    // Assume the first sheet is the one we need
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Get the range of the sheet
    const range = xlsx.utils.decode_range(sheet['!ref']);
    
    // Read the first row (titles)
    const firstRow = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = xlsx.utils.encode_cell({ r: 0, c: col });
        const cell = sheet[cellAddress];
        firstRow.push(cell ? cell.v : undefined);
    }
    
    // Read subsequent rows
    for (let row = 1; row <= range.e.r; row++) {
        const rowData = {};
        let hasData = false;
        for (let col = 0; col < firstRow.length; col++) {
            const cellAddress = xlsx.utils.encode_cell({ r: row, c: col });
            const cell = sheet[cellAddress];
            const cellValue = cell ? cell.v : undefined;
            rowData[firstRow[col]] = cellValue;
            if (cellValue !== undefined) hasData = true;
        }
        
        // If row has data, log the "Prompt" and "Completion"
        if (hasData) {
            const prompt = rowData['Prompt'];
            const completion = rowData['Completion'];
            if (prompt !== undefined && completion !== undefined) {
                //timer to avoid being blocked by the zilliz api
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log(`Prompt: ${prompt}\nCompletion: ${completion}\n\n\n`);
                saveVector(prompt, completion, row)
            }
        }
    }
}

// usage
const __dirname = path.resolve();

const filePath = path.join(__dirname, 'prompt.xlsx');
readXlsxAndLog(filePath);
