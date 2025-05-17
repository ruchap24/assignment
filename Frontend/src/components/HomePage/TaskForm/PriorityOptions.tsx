import React, { useState } from "react";

function PriorityOptions({ onSelect }) {
  const [selectedPriority, setSelectedPriority] = useState("");

  const handleSelectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    const priority = event.target.value;
    setSelectedPriority(priority);
    onSelect(priority);
  };

  return (
    <div className="w-32">
      <select
        value={selectedPriority}
        onChange={handleSelectChange}
        className="w-full rounded-lg border-2 py-2 bg-white"
      >
        <option value="" disabled>
          Select Priority
        </option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default PriorityOptions;
