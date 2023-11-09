import React, { useState } from "react";
import Section from "./components/Section";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// import { getApiUrl } from "./api";

function App() {
  const initialResumeData = {
    resume: {
      sections: [
        {
          title: "Education",
          items: [
            {
              degree: "Bachelor of Science in Computer Science",
              college: "University of ABC",
              location: "Chicago, USA",
              graduationDate: "May 2019",
            },
            {
              degree: "High School Diploma",
              college: "High School XYZ",
              location: "Los Angeles, USA",
              graduationDate: "Jun 2015",
            },
          ],
        },
        {
          title: "Work Experience",
          items: [
            {
              position: "Intern",
              company: "XYZ Corporation",
              location: "San Francisco, USA",
              startDate: "May 2019",
              endDate: "Aug 2019",
              description: "Assisted with frontend development and bug fixing.",
            },
            {
              position: "Software Developer",
              company: "ABC Tech",
              location: "New York, USA",
              startDate: "Jan 2020",
              endDate: "Present",
              description: "Developed web applications using React and Node.js.",
            },
          ],
        },
      ],
    },
  };

  const [resumeData, setResumeData] = useState(initialResumeData.resume);
  const [selectedColor, setSelectedColor] = useState("white");

  const onDataChange = (sectionTitle, sectionData) => {
    setResumeData((prevData) => ({
      ...prevData,
      [sectionTitle]: { items: sectionData },
    }));
  };

  return (
    <div className="App">
      <h1
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          fontSize: "30px",
        }}
      >
        Resume Builder App
      </h1>
      {["Education", "Work Experience"].map((sectionTitle) => {
        const section = initialResumeData.resume.sections.find(
          (s) => s.title === sectionTitle
        );
        return (
          <Section
            key={sectionTitle}
            section={section}
            data={section.items}
            onDataChange={onDataChange}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        );
      })}
    </div>
  );
}

export default App;

