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

  useEffect(() => {
    console.log(taskList);
  }, [taskList]);

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
      return {
        success: false,
        message: error.message || "Impossibile connettersi al server",
      };
    }
  }
  function removeTask(id) {}
  function updateTask(id) {}
  return { addTask, removeTask, updateTask, taskList };
}
