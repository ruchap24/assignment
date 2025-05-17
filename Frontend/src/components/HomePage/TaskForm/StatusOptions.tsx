import React from "react";

function StatusOptions({ selectedStatus, onStatusChange }) {
  return (
    <div className="w-32 rounded-lg border-[1px] pl-2">
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full rounded-lg border-[1px] p-2 bg-white"
      >
        <option value="completed">Completed</option>
        <option value="in-progress">In-progress</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}

export default StatusOptions;
