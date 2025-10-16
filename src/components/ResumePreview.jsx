import React from "react";

export default function ResumePreview({ resumeHTML }) {
  return (
    <div
      className="border p-4   bg-sky-100"
      dangerouslySetInnerHTML={{
        __html: resumeHTML || "<p>No resume generated yet.</p>",
      }}
    />
  );
}
