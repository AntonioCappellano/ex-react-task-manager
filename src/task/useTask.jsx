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

  function addTask(id) {}
  function removeTask(id) {}
  function updateTask(id) {}
  return { addTask, removeTask, updateTask, taskList };
}
