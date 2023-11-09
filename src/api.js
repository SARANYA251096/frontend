export const getApiUrl = (sectionId) => {
  const apiUrls = {
    workExperience: "http://localhost:3001/api/resume/work-experience",
    education: "http://localhost:3001/api/resume/education",
  };

  return apiUrls[sectionId];
};
