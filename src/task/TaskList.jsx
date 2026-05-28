import { useMemo, useState } from "react";
import { useTaskList } from "../contexts/GlobalContext";
import TaskRow from "./TaskRow";
const statusOrder = { "To do": 1, Doing: 2, Done: 3 };

export default function TaskList() {
  const { taskList } = useTaskList();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === 1 ? -1 : 1));
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  }

  const sortedList = useMemo(() => {
    return [...taskList].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * sortOrder;
      } else if (sortBy === "status") {
        return statusOrder[a.status] - statusOrder[b.status];
      } else {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          sortOrder
        );
      }
    });
  }, [taskList, sortBy, sortOrder]);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("title")}
              scope="col"
            >
              Nome {sortBy === "title" ? (sortOrder === 1 ? "↑" : "↓") : ""}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("status")}
              scope="col"
            >
              Stato {sortBy === "status" ? (sortOrder === 1 ? "↑" : "↓") : ""}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("createdAt")}
              scope="col"
            >
              Data di Creazione{" "}
              {sortBy === "createdAt" ? (sortOrder === 1 ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((task) => (
            <TaskRow
              key={task.id}
              title={task.title}
              status={task.status}
              createdAt={task.createdAt}
              id={task.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
