import { RiCircleLine, RiCircleFill } from "react-icons/ri";
import { useState } from "react";

function TaskIcon({ taskId, AddTaskCompletion }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => AddTaskCompletion(taskId)}
      style={{ cursor: "pointer" }}
    >
      {isHovered ? (
        <RiCircleFill className="fs-4" style={{ color: "white", border: "2px solid white", borderRadius: "50%" }} />
      ) : (
        <RiCircleLine className="text-light fs-4" />
      )}
    </div>
  );
}

export default TaskIcon;
