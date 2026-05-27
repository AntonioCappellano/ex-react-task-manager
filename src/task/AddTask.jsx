import { useState, useRef } from "react";
import { useTaskList } from "../contexts/GlobalContext";

export default function AddTask() {
  const [taskName, setTaskName] = useState("");
  const textAreaRef = useRef();
  const selectedRef = useRef();
  const [error, setError] = useState("");
  const { addTask } = useTaskList();

  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\`~`;

  function handleTaskName(value) {
    if (value === "") {
      setError("il campo non può essere vuoto");
    } else if (value.split("").some((t) => symbols.includes(t))) {
      setError("Non puoi inserire caratteri speciali");
    } else {
      setError("");
      setTaskName(value);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (taskName === "") {
      setError("Il campo non può essere vuoto");
      return;
    }
    const taskObj = {
      title: taskName,
      description: textAreaRef.current.value,
      status: selectedRef.current.value,
    };
    try {
      await addTask(taskObj);
      alert("Task aggiunta");
      setTaskName("");
      textAreaRef.current.value = "";
      selectedRef.current.value = "To do";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card container mt-3">
      <div className="card-body">
        <h5 className="card-title">Aggiungi una task</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label mt-2">Nome del Task</label>
            <input
              className={`form-control ${error ? "is-invalid" : ""}`}
              type="text"
              value={taskName}
              onChange={(e) => handleTaskName(e.target.value)}
            />
            {error !== "" && <p className="text-danger">{error}</p>}
          </div>
          <div className="mb-2">
            <label className="form-label mt-2">Descrizione</label>
            <textarea ref={textAreaRef} className="form-control" />
          </div>
          <div className="mb-2">
            <label className="form-label mt-2">Stato</label>
            <select
              ref={selectedRef}
              className="form-select"
              defaultValue="To do"
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Invia
          </button>
        </form>
      </div>
    </div>
  );
}
