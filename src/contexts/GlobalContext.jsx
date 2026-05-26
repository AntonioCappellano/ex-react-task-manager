import { createContext, useEffect, useState, useContext } from "react";

const GlobalContext = createContext();

function ContextProvider({ children }) {
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

  const value = { taskList, url, setTaskList };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useTaskList() {
  const context = useContext(GlobalContext);
  return context;
}

export { ContextProvider, useTaskList };
