import { useState, useEffect } from "react";
export default function useTask() {
  const url = import.meta.env.VITE_API_URL;
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch(`${url}/tasks`)
      .then((r) => r.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error(error));
  }, []);

  async function addTask(taskObj) {
    try {
      const response = await fetch(`${url}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskObj),
      });
      const data = await response.json();
      if (data.success) {
        const newTask = [...taskList, data.task];
        setTaskList(newTask);
      } else {
        throw new Error("Ops c'è stato un errore");
      }
    } catch (error) {
      throw error;
    }
  }
  async function removeTask(taskId) {
    try {
      const response = await fetch(`${url}/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        const updatedList = taskList.filter((task) => task.id !== taskId);
        setTaskList(updatedList);
      } else {
        throw new Error("Task non eliminata");
      }
    } catch (error) {
      throw error;
    }
  }
  async function updateTask(updatedTask) {
    try {
      const response = await fetch(`${url}/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();

      if (data.success) {
        const modifyTask = taskList.map((task) => {
          if (task.id === updatedTask.id) {
            return data.task;
          }
          return task;
        });
        setTaskList(modifyTask);
      } else {
        throw new Error("La task non può essere modificata");
      }
    } catch (error) {
      throw error;
    }
  }
  return { addTask, removeTask, updateTask, taskList };
}
