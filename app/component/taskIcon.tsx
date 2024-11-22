// taskIcon.tsx
import { RiCircleLine, RiCircleFill } from "react-icons/ri";
import { useState } from "react";

// Defina uma interface para as propriedades do componente
interface TaskIconProps {
  taskId: number; // Ajuste o tipo conforme necessário
  AddTaskCompletion: (id: number) => void; // Ajuste o tipo conforme necessário
}

function TaskIcon({ taskId, AddTaskCompletion }: TaskIconProps) {
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
