import { useTaskList } from "../contexts/GlobalContext";
import TaskRow from "./TaskRow";
export default function TaskList() {
  const { taskList } = useTaskList();
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Stato</th>
            <th scope="col">Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              status={task.status}
              createdAt={task.createdAt}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
