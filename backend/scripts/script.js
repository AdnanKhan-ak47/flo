import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, 'data.csv'); // Path to your CSV file
const jsonFilePath = path.join(__dirname, 'data.json'); // Path to save the JSON file

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // Write the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    console.log('CSV file has been converted to JSON.');
  });
