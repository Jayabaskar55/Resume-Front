import React, { useState } from "react";
import axios from "axios";

export default function ExportButtons({ resumeHTML }) {
  const [loadingPDF, setLoadingPDF] = useState(false);

  async function exportPDF() {
    if (!resumeHTML) return alert("Generate resume first!");
    setLoadingPDF(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/export-pdf",
        { resumeHTML },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to export PDF");
    }
    setLoadingPDF(false);
  }

  function exportHTML() {
    if (!resumeHTML) return alert("Generate resume first!");
    const blob = new Blob([resumeHTML], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.html";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={exportPDF}
        disabled={loadingPDF}
        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loadingPDF ? "Exporting PDF..." : "Export as PDF"}
      </button>
      <button
        onClick={exportHTML}
        className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
      >
        Export as HTML
      </button>
    </div>
  );
}
