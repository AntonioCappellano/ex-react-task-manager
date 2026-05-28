import { createPortal } from "react-dom";
export default function Modal({
  title = "Elimina task",
  content = "contenuto della modale",
  show = false,
  onClose = () => {},
  onConfirm = () => {},
  confirmText = "Conferma",
}) {
  if (!show) {
    return null;
  }
  return createPortal(
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{title}</h5>
            </div>
            <div className="modal-body">
              <div>{content}</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={onClose}>
                Annulla
              </button>
              <button className="btn btn-primary" onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
