import React, { useEffect, useState } from "react";
import { getApiUrl } from "../api";
import axios from "axios";
import ColorPicker from "./ColorPicker";

async function fetchData(section, onDataChange) {
  try {
    const sectionId = (section.title || "").toLowerCase();
    const apiUrl = getApiUrl(sectionId);

    if (!apiUrl) {
      console.error("API URL not defined for section:", section);
      return;
    }

    const response = await axios.get(apiUrl);
    const sectionData = response.data;
    onDataChange(sectionId, sectionData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Section({
  section,
  provided,
  resumeData,
  selectedColor,
  apiUrl,
  setSelectedColor,
  onDataChange,
}) {
  const innerRef = provided ? provided.innerRef : null;
  const draggableProps = provided ? provided.draggableProps : {};
  const dragHandleProps = provided ? provided.dragHandleProps : {};
  const sectionItems = resumeData && resumeData.items ? resumeData.items : [];

  const [sectionColor, setSectionColor] = useState("white");
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    degree: "",
    college: "",
    graduationDate: "",
  });

  useEffect(() => {
    console.log("Section Object:", section);
    console.log("useEffect triggered:", section);
    if (section && onDataChange) {
      fetchData(section, onDataChange);
    } else {
      console.warn("Invalid section:", section);
    }
  }, [section, apiUrl, onDataChange]);

  const handleColorChange = (newColor) => {
    setSectionColor(newColor);
    setSelectedColor(newColor);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedSectionData = Array.isArray(resumeData.items)
      ? [...resumeData.items]
      : [];

    const newEntry = {};
    for (const key in formData) {
      if (formData[key]) {
        newEntry[key] = formData[key];
      }
    }

    updatedSectionData.push(newEntry);

    resumeData.onDataChange(section.title.toLowerCase().replace(/\s+/g, ""), {
      ...resumeData,
      items: updatedSectionData,
    });

    setFormData({
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      degree: "",
      college: "",
      graduationDate: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="section"
      style={{ backgroundColor: sectionColor }}
    >
      <div className="section-header">
        <h2>{section.title}</h2>
        <ColorPicker
          selectedColor={sectionColor}
          setSelectedColor={handleColorChange}
        />
      </div>
      {sectionItems.map((item, index) => (
        <div key={index} className="section-item">
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              <strong>{key}: </strong> {value}
            </div>
          ))}
        </div>
      ))}
      <div className="add-section">
        <h2>Add {section.title}</h2>
        <form onSubmit={handleFormSubmit}>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={formData[key]}
              onChange={handleInputChange}
            />
          ))}
          <button type="submit" className="btn-primary">
            Add {section.title}
          </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Section);
