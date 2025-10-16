import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ExportButtons from "./components/ExportButtons";

import "./App.css";
import apiAxios from "./API/Api";

export default function App() {
  const [formData, setFormData] = useState({
    personalInfo: { fullName: "", email: "", phone: "", summary: "" },
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ title: "", company: "", from: "", to: "", description: "" }],
    skills: [],
    projects: [{ name: "", link: "" }],
  });

  const [resumeHTML, setResumeHTML] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerateResume() {
    setLoading(true);
    try {
      const response = await apiAxios.post("/api/generate-resume", formData);

      setResumeHTML(response.data.resumeHTML);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Failed to generate resume.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:flex md:space-x-8">
      <div className="md:w-1/2 bg-white p-6 rounded shadow max-h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Resume & Portfolio Builder</h1>
        <ResumeForm formData={formData} setFormData={setFormData} />
        <button
          onClick={handleGenerateResume}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
        <ExportButtons resumeHTML={resumeHTML} />
      </div>

      <div className="md:w-1/2 bg-white p-6 rounded shadow max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <ResumePreview resumeHTML={resumeHTML} />
      </div>
    </div>
  );
}
