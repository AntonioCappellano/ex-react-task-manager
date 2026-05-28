import Modal from "./Modal";
import { useState, useRef } from "react";

export default function EditTaskModal({
  show = false,
  onClose = () => {},
  task = {},
  onSave = () => {},
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const editFormRef = useRef();
  if (!show) {
    return null;
  }
  function onSubmit(e) {
    e.preventDefault();
    onSave({
      id: task.id,
      title: title,
      description: description,
      status: status,
    });
  }

  return (
    <Modal
      title="Modifica Task"
      content={
        <form ref={editFormRef} onSubmit={onSubmit}>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}
