import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./task/AddTask";
import TaskList from "./task/TaskList";
import TaskDetail from "./task/TaskDetail";
import NavBar from "./components/NavBar";
import { ContextProvider } from "./contexts/GlobalContext";

export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
