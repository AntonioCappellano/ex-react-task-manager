import { useParams, useNavigate } from "react-router-dom";
import { useTaskList } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import { useState } from "react";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams();
  const { taskList, removeTask, updateTask } = useTaskList();
  const navigate = useNavigate();
  const taskFind = taskList.find((task) => task.id === Number(id));
  const [modifyTask, setModifyTask] = useState(false);

  const [isModal, setIsModal] = useState(false);

  function handleDelete() {
    setIsModal(true);
  }

  async function handleConfirm() {
    try {
      await removeTask(Number(id));
      alert("Task Eliminata");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSaveTask(modifyTask) {
    try {
      await updateTask(modifyTask);
      alert("Task modificata");
      setModifyTask(false);
    } catch (error) {
      alert(error.message);
    }
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
      <Modal
        title="Elimina task"
        content={`Sei sicuro di voler eliminare "${taskFind.title}"?`}
        show={isModal}
        onClose={() => setIsModal(false)}
        onConfirm={handleConfirm}
      />
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
        <button className="btn btn-primary m-2" onClick={() => setModifyTask(true)}>
          Modifica
        </button>
        <EditTaskModal
          show={modifyTask}
          onClose={() => setModifyTask(false)}
          task={taskFind}
          onSave={handleSaveTask}
        />
      </div>
    </div>
  );
}
