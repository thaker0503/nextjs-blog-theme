// pages/upload.js
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function UploadPage() {
  const [outputData, setOutputData] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = jsonData.map((row) => {
        const name = row.name || '';
        const email = row.email || '';
        const address = row.address || '';
        const number = row.number || '';

        return `-----------------------------\n\n${name}\n${address}\n\n${email}\n\nESIM PHONE NUMBER:  ${number}\n\n-----------------------------`;
      });

      setOutputData(formattedData);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload CSV or Excel File</h1>
      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />

      {outputData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {outputData.map((output, index) => (
            <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
              <pre>{output}</pre>
              <button onClick={() => handleCopy(output)}>Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
