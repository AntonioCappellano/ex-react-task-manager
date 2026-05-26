import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TaskManager
        </Link>
        <div className="navbar-nav ms-auto flex-row gap-3">
          <Link className="nav-link" to="/">
            Lista Task
          </Link>
          <Link className="nav-link" to="/add-task">
            Aggiungi Task
          </Link>
        </div>
      </div>
    </nav>
  );
}
