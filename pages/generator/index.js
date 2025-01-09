import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const generateCSV = () => {
    const numbers = input.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (numbers.length === 0) {
      alert("Please enter at least one number.");
      return;
    }

    const maxCell = 9898; // A9898 corresponds to 9898 cells
    const firstName = "John"; // Example first name
    const lastName = "Doe"; // Example last name

    let repeatedRows = [];

    while (repeatedRows.length < maxCell) {
      repeatedRows = repeatedRows.concat(
        numbers.map((number) => `${number},${firstName},${lastName}`)
      );
    }

    // Truncate the array to exactly 9898 rows
    repeatedRows = repeatedRows.slice(0, maxCell);

    // Convert to CSV format
    const csvContent =
      "Number,First Name,Last Name\n" + repeatedRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create a hidden download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "numbers.csv"; // Name the file
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Number Repeater to CSV</h1>
      <p>Enter numbers in the text area below (one per line):</p>
      <textarea
        style={{
          width: "100%",
          height: "150px",
          marginBottom: "20px",
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers here..."
      ></textarea>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={generateCSV}
      >
        Generate CSV
      </button>
    </div>
  );
}
