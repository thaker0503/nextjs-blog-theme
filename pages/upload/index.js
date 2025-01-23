// pages/upload.js
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function UploadPage() {
  const [outputData, setOutputData] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const formattedData = jsonData.slice(1).map((row) => {
        const name = row[0] || '';
        const street = row[1] || '';
        const city = row[2] || '';
        const state = row[3] || '';
        const zip = row[4] || '';
        const email = row[5] || '';
        const esim = row[6] || '';

        return `-----------------------------\n\n${name}\n${street}\n${city} ${state} ${zip}\n\n${email}\n\n ${esim}\n\n-----------------------------`;
      });

      setOutputData(formattedData.join('\n\n'));
    }
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(outputData);
    alert('All data copied to clipboard!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Upload CSV or Excel File</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
      </div>

      {outputData && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <textarea
            style={{ width: '100%', height: '300px', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            value={outputData}
            readOnly
          />
          <button
            onClick={handleCopyAll}
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Copy All
          </button>
        </div>
      )}
    </div>
  );
}
