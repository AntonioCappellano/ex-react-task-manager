import React from "react";
import { Link } from "react-router-dom";

export default React.memo(function TaskRow({ title, status, createdAt, id }) {
  const formattedDate = new Date(createdAt);

  const color = {
    "To do": "red",
    Doing: "yellow",
    Done: "green",
  };
  const statusColor = color[status];

  return (
    <tr>
      <td>
        <Link className="nav-link" to={`/task/${id}`}>
          {title}
        </Link>
      </td>
      <td style={{ backgroundColor: statusColor }}>{status}</td>
      <td>{formattedDate.toLocaleDateString()}</td>
    </tr>
  );
});
