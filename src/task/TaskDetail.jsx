import { useParams } from "react-router-dom";
import { useTaskList } from "../contexts/GlobalContext";
export default function TaskDetail() {
  const { id } = useParams();
  const { taskList } = useTaskList();
  const taskFind = taskList.find((task) => task.id === Number(id));

  function handleDelete() {
    console.log("Eliminio task");
  }

  if (!taskFind) {
    return <p>{"Task non trovata"}</p>;
  }

  const color = {
    "To do": "red",
    Doing: "yellow",
    Done: "green",
  };
  const statusColor = color[taskFind.status];

  return (
    <div className="card container mt-3">
      <div className="card-body">
        <h5 className="card-title">{taskFind.title}</h5>
        <p>
          <strong>Descrizione: </strong>
          {taskFind.description}
        </p>
        <strong>Stato: </strong>
        <span style={{ backgroundColor: statusColor }}>{taskFind.status}</span>
        <p>
          <strong>Data: </strong>
          {new Date(taskFind.createdAt).toLocaleDateString()}
        </p>
        <button className="btn btn-danger" onClick={handleDelete}>
          Elimina Task
        </button>
      </div>
    </div>
  );
}
