import React from "react";

function ColorPicker({ selectedColor, setSelectedColor }) {
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div className="colorPicker" style={{margin:"15px"}}>
    
      <label htmlFor="color">Select a background color:</label><br/>
      <select id="color" value={selectedColor} onChange={handleColorChange}>
        <option value="white">White</option>
        <option value="lightgrey">Light Grey</option>
        <option value="lightblue">Light Blue</option>
      </select>
    </div>
  );
}

export default ColorPicker;
