import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./task/AddTask";
import TaskList from "./task/TaskList";
import NavBar from "./components/NavBar";
export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}
