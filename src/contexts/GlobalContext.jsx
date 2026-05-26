import { createContext, useContext } from "react";
import useTask from "../task/useTask";
const GlobalContext = createContext();

function ContextProvider({ children }) {
  const { addTask, removeTask, updateTask, taskList } = useTask();

  const value = { addTask, removeTask, updateTask, taskList };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useTaskList() {
  const context = useContext(GlobalContext);
  return context;
}

export { ContextProvider, useTaskList };
