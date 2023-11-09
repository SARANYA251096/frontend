import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Section from "./Section";

const initialSections = [
  {
    id: "education",
    title: "Education",
  },
  {
    id: "workExperience",
    title: "Work Experience",
  },
];

function Resume({ resumeData, selectedColor,setSelectedColor }) {
  const [sections, setSections] = React.useState(initialSections);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedSections = [...sections];
    const [reorderedSection] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, reorderedSection);

    setSections(updatedSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(draggableProvided) => (
                  <Section
                    section={section}
                    provided={draggableProvided}
                    resumeData={resumeData[section.id] || { items: [] }}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Resume;
