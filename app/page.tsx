"use client";

import { CiTrash } from "react-icons/ci";
import { IoPencilSharp } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import TaskIcon from "./component/taskIcon";
import "./styles/global.scss";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  isEditing: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titleTask, setTitleTask] = useState(""); // Para novas tarefas
  const [editingTaskTitle, setEditingTaskTitle] = useState(""); // Para título da tarefa em edição
  const [tasksCompleted, setTasksCompleted] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  // Adicionar ou Atualizar Tarefa
  const addOrUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      // Atualizar tarefa
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, title: editingTaskTitle, isEditing: false } : task
        )
      );
      setIsEditing(false);
      setEditingTaskTitle(""); // Limpa o título da tarefa em edição
    } else {
      // Adicionar nova tarefa
      if (titleTask.trim() === "") {
        console.log("Por favor, preencha todos os campos.");
        return;
      }

      const newTask: Task = {
        id: tasks.length + 1,
        title: titleTask,
        isCompleted: false,
        isEditing: false,
      };
      setTasks([...tasks, newTask]);
      setTitleTask(""); // Limpa o título da nova tarefa
    }
  };

  const editTask = (task: Task) => {
    setIsEditing(true);
    setEditTaskId(task.id);
    setEditingTaskTitle(task.title); // Atualiza o título da tarefa em edição

    // Atualiza a lista de tarefas para definir a tarefa atual como editável
    setTasks(tasks.map(t => t.id === task.id ? { ...t, isEditing: true } : t));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const AddTaskCompletion = (id: number) => {
    const taskToComplete = tasks.find((task) => task.id === id);
    if (taskToComplete) {
      setTasksCompleted([
        ...tasksCompleted,
        { ...taskToComplete, isCompleted: true },
      ]);
      removeTask(id);
    }
  };

  return (
    <div>
      <div className="">
        {/* Container de Tarefas ocupando toda a largura */}
        <div className="tasks-container light-grey-bg p-6 w-100">
          <div className="d-flex justify-content-center text-light mb-4">
            <h2>Get Things Done!</h2>
          </div>
          <div className="d-flex mb-4">
            <input
              type="text"
              className="form-input-custom search-bar"
              placeholder="What is the task?"
              value={titleTask}
              onChange={(e) => setTitleTask(e.target.value)}
            />
            <button
              className="btn btn-add-task"
              onClick={addOrUpdateTask}
            >
              <GoPlus className="text-white me-2 fs-5" />
              Add task
            </button>
          </div>

          <div className="">
            <h5 className="text-light mb-3">Tasks ({tasks.length})</h5>
          </div>
          <div>
            {tasks.length === 0 ? (
              <div className="d-flex justify-content-center mt-3">
                <p className="text-custom-color">Add some tasks...</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id}>
                  {task.isEditing ? (
                    // Renderiza o campo de edição se a tarefa estiver em modo de edição
                    <div className="d-flex mb-3">
                      <input
                        type="text"
                        className="form-input-custom search-bar"
                        value={editingTaskTitle}
                        onChange={(e) => setEditingTaskTitle(e.target.value)} // Atualiza o título da tarefa em edição
                        placeholder="Editar Título..."
                      />
                      <button
                        className="btn btn-add-task"
                        onClick={addOrUpdateTask}
                      >
                        <GoPlus className="text-white me-2 fs-5" />
                        Update task
                      </button>
                    </div>
                  ) : (
                    // Renderiza o ícone e o título normalmente dentro do div estilizado
                    <div
                      className="task-item d-flex justify-content-between align-items-center p-3 mb-3 rounded"
                      style={{ backgroundColor: "#7a60e3" }}
                    >
                      <div className="d-flex align-items-center">
                        <TaskIcon taskId={task.id} AddTaskCompletion={AddTaskCompletion} />
                        <p className="ms-3">{task.title}</p>
                      </div>
                      <div>
                        <IoPencilSharp
                          className="fs-5 text-light me-3 hover-icon"
                          onClick={() => editTask(task)}
                        />
                        <CiTrash
                          className="fs-4 text-light hover-icon"
                          onClick={() => removeTask(task.id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
