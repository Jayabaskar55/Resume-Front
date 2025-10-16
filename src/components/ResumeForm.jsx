import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  FaTools,
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb } from "react-icons/si";

const iconMap = {
  react: <FaReact className="text-blue-500 text-xl" />,
  "node.js": <FaNodeJs className="text-green-600 text-xl" />,
  nodejs: <FaNodeJs className="text-green-600 text-xl" />,
  python: <FaPython className="text-yellow-500 text-xl" />,
  html: <FaHtml5 className="text-orange-500 text-xl" />,
  css: <FaCss3Alt className="text-blue-600 text-xl" />,
  javascript: <FaJsSquare className="text-yellow-400 text-xl" />,
  tailwind: <SiTailwindcss className="text-cyan-500 text-xl" />,
  mongodb: <SiMongodb className="text-green-700 text-xl" />,
};

export default function ResumeForm({ formData, setFormData }) {
  const formRef = useRef(null);
  const [skillInput, setSkillInput] = useState("");
  const [projectInput] = useState("");

  const addSkill = useCallback(() => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  }, [skillInput, formData, setFormData]);
  const removeSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  const addProject = useCallback(() => {
    setFormData({
      ...formData,
      projects: [...(formData.projects || []), { name: "", link: "" }],
    });
  }, [formData, setFormData]);

  const removeProject = (index) => {
    const updated = [...formData.projects];
    updated.splice(index, 1);
    setFormData({ ...formData, projects: updated });
  };

  // Handle Enter key navigation
  useEffect(() => {
    if (!formRef.current) return;
    const inputs = Array.from(
      formRef.current.querySelectorAll("input, textarea, select")
    );

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (e.target.id === "skills-input" && skillInput.trim()) {
          addSkill();
          return;
        }

        if (e.target.id === "projects-input" && projectInput.trim()) {
          addProject();
          return;
        }

        const idx = inputs.indexOf(e.target);
        if (idx >= 0 && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }
      }
    };

    inputs.forEach((el) => el.addEventListener("keydown", handleKeyDown));
    return () =>
      inputs.forEach((el) => el.removeEventListener("keydown", handleKeyDown));
  }, [skillInput, projectInput, addSkill, addProject]);

  // Helpers
  const updateArrayField = (section, index, field, value) => {
    const newSection = [...formData[section]];
    newSection[index][field] = value;
    setFormData({ ...formData, [section]: newSection });
  };

  const addEntry = (section, emptyEntry) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyEntry] });
  };

  const removeEntry = (section, index) => {
    const newSection = [...formData[section]];
    newSection.splice(index, 1);
    setFormData({ ...formData, [section]: newSection });
  };

  // Skills
  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef

  // Projects
  const handleProjectNameChange = (index, value) => {
    const updated = [...formData.projects];
    updated[index].name = value;
    setFormData({ ...formData, projects: updated });
  };

  const handleProjectLinkChange = (index, value) => {
    const updated = [...formData.projects];
    updated[index].link = value;
    setFormData({ ...formData, projects: updated });
  };

  // UI classes
  const inputClass =
    "border border-gray-300 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";
  const sectionClass =
    "bg-white/90 backdrop-blur-sm shadow-lg p-5 rounded-2xl border border-gray-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-10 px-4">
      <form ref={formRef} className="max-w-3xl mx-auto space-y-8">
        {/* PERSONAL INFO */}
        <div className={sectionClass}>
          <h3 className="font-semibold mb-3 text-lg text-indigo-700">
            Personal Info
          </h3>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.personalInfo.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                personalInfo: {
                  ...formData.personalInfo,
                  fullName: e.target.value,
                },
              })
            }
            className={`${inputClass} mb-2`}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.personalInfo.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                personalInfo: {
                  ...formData.personalInfo,
                  email: e.target.value,
                },
              })
            }
            className={`${inputClass} mb-2`}
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.personalInfo.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                personalInfo: {
                  ...formData.personalInfo,
                  phone: e.target.value,
                },
              })
            }
            className={`${inputClass} mb-2`}
          />
          <textarea
            placeholder="Summary"
            value={formData.personalInfo.summary}
            onChange={(e) =>
              setFormData({
                ...formData,
                personalInfo: {
                  ...formData.personalInfo,
                  summary: e.target.value,
                },
              })
            }
            className={`${inputClass}`}
            rows={3}
          />
        </div>

        {/* EDUCATION */}
        <div className={sectionClass}>
          <h3 className="font-semibold mb-3 text-lg text-indigo-700">
            Education
          </h3>
          {formData.education.map((ed, i) => (
            <div
              key={i}
              className="mb-3 border p-3 rounded-xl relative bg-white"
            >
              <input
                type="text"
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) =>
                  updateArrayField("education", i, "degree", e.target.value)
                }
                className={`${inputClass} mb-1`}
              />
              <input
                type="text"
                placeholder="Institution"
                value={ed.institution}
                onChange={(e) =>
                  updateArrayField(
                    "education",
                    i,
                    "institution",
                    e.target.value
                  )
                }
                className={`${inputClass} mb-1`}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Start Year"
                  value={ed.startYear}
                  onChange={(e) =>
                    updateArrayField(
                      "education",
                      i,
                      "startYear",
                      e.target.value
                    )
                  }
                  className={`${inputClass}`}
                />
                <input
                  type="number"
                  placeholder="End Year"
                  value={ed.endYear}
                  onChange={(e) =>
                    updateArrayField("education", i, "endYear", e.target.value)
                  }
                  className={`${inputClass}`}
                />
              </div>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry("education", i)}
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addEntry("education", {
                degree: "",
                institution: "",
                startYear: "",
                endYear: "",
              })
            }
            className="text-indigo-600 underline"
          >
            + Add Education
          </button>
        </div>

        <div className={sectionClass}>
          <h3 className="font-semibold mb-3 text-lg text-gray-800">
            Experience
          </h3>
          {formData.experience.map((exp, i) => (
            <div
              key={i}
              className="mb-3 border p-3 rounded relative bg-white/60"
            >
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) =>
                  updateArrayField("experience", i, "title", e.target.value)
                }
                className={`${inputClass} mb-1`}
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  updateArrayField("experience", i, "company", e.target.value)
                }
                className={`${inputClass} mb-1`}
              />
              <div className="flex space-x-2 mb-1">
                <input
                  type="number"
                  placeholder="Start Year"
                  value={exp.from}
                  onChange={(e) =>
                    updateArrayField("experience", i, "from", e.target.value)
                  }
                  className={`${inputClass} w-1/2`}
                />
                <input
                  type="number"
                  placeholder="End Year"
                  value={exp.to}
                  onChange={(e) =>
                    updateArrayField("experience", i, "to", e.target.value)
                  }
                  className={`${inputClass} w-1/2`}
                />
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  updateArrayField(
                    "experience",
                    i,
                    "description",
                    e.target.value
                  )
                }
                className={`${inputClass}`}
                rows={3}
              />
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntry("experience", i)}
                  className="absolute top-2 right-2 text-red-600 font-bold"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addEntry("experience", {
                title: "",
                company: "",
                from: "",
                to: "",
                description: "",
              })
            }
            className="text-blue-600 underline"
          >
            + Add Experience
          </button>
        </div>

        {/* SKILLS */}
        <div className={sectionClass}>
          <h3 className="font-bold mb-3 text-lg text-gray-800 flex items-center gap-2">
            <FaTools className="text-blue-500 text-xl" />
            <span className="text-blue-500">Skills</span>
          </h3>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-gray-50">
            <FaTools className="text-gray-500 mr-2" />
            <input
              id="skills-input"
              type="text"
              placeholder="e.g. React"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-700 font-medium placeholder-gray-400"
            />
            <button
              type="button"
              onClick={addSkill}
              className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {formData.skills.map((skill, index) => {
              const key = skill.toLowerCase();
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 border rounded-lg bg-white shadow-sm"
                >
                  {iconMap[key] || <FaTools className="text-gray-400" />}
                  <span className="font-medium capitalize">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROJECTS */}
        <div className={sectionClass}>
          <h3 className="font-semibold mb-3 text-lg text-gray-800 flex items-center gap-2">
            📂 Projects
          </h3>
          {(formData.projects || []).map((proj, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) => handleProjectNameChange(index, e.target.value)}
                className={`${inputClass} flex-1`}
              />
              <input
                type="text"
                placeholder="Project Link"
                value={proj.link}
                onChange={(e) => handleProjectLinkChange(index, e.target.value)}
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700"
          >
            <FaPlus /> Add Project
          </button>
        </div>
      </form>
    </div>
  );
}
