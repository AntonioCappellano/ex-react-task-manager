import React from "react";

export default React.memo(function TaskRow({ title, status, createdAt }) {
  const formattedDate = new Date(createdAt);

  const color = {
    "To do": "red",
    Doing: "yellow",
    Done: "green",
  };
  const statusColor = color[status];

  return (
    <tr>
      <td>{title}</td>
      <td style={{ backgroundColor: statusColor }}>{status}</td>
      <td>{formattedDate.toLocaleDateString()}</td>
    </tr>
  );
});
