import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Boardlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const URL = "https://task-bridge-project-management-system.onrender.com/api/task/newtask";

  async function getTask() {
    try {
      const res = await axios.get(URL);
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTask();
  }); // ✅ IMPORTANT (prevent infinite re-render)

  if (loading) {
    return <p className="mt-4">Loading tasks...</p>;
  }

  return (
    <div className="flex gap-4 flex-col justify-center items-center w-full p-2">
      {data.map((item) => (
        <div
          key={item._id}
          className={`flex items-center justify-between w-[96%] rounded-2xl p-3 shadow-sm transition-all duration-300
            ${
              item.status === "Completed"
                ? "bg-green-200"
                : item.status === "In Progress"
                ? "bg-orange-200"
                : "bg-white"
            }`}
        >
          <div className="flex items-center gap-2">
            <div className="h-[3em] flex items-center justify-center w-[3em] rounded-full bg-gray-400 text-white font-semibold">
              <p>{item.Assignee?.charAt(0)}</p>
            </div>

            <div>
              <h1 className="font-medium">{item.Assignee}</h1>
              <h2>Project: {item.Project}</h2>
              <h3 className="text-sm font-medium">
                Status: {item.status}
                <span
                  className={`${
                    item.status === "Completed"
                      ? "text-green-600"
                      : item.Status === "In Progress"
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.Status}
                </span>
              </h3>
            </div>
          </div>

          <button
            onClick={() => navigate(`/taskinfo/${item._id}`)}
            className="bg-gray-200 px-3 py-2 rounded-2xl hover:bg-black hover:text-white transition"
          >
            View Task
          </button>
        </div>
      ))}
    </div>
  );
};

export default Boardlist;