import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Taskinfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const URL = `https://task-bridge-project-management-system.onrender.com/api/task/${id}`;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const getinfo = async () => {
    try {
      const res = await axios.get(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(res.data.data || res.data); // supports both formats
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const updateStatus = async (status) => {
    try {
      setLoading(true);

      const res = await axios.put(
        URL,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // ✅ Update UI instantly
      setData(res.data.task || res.data);
      console.log(res.data.task || res.data)
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getinfo();
  }, [id]);

  if (!data) {
    return <p className="mt-4">Loading task...</p>;
  }

  return (
    <div className="w-[96%] flex flex-col items-center gap-3">
      <div className="bg-gray-300 w-[96%] rounded-2xl p-4 flex flex-col gap-3">
        <h1 className="text-lg font-semibold">Team Member: {data.Assignee}</h1>

        <h2 className="font-medium">Task: {data.Title}</h2>

        <p className="bg-white/70 p-3 rounded-xl">
          Description: {data.Description}
        </p>

        <h3>Priority: {data.Priority}</h3>

        <h3>Due Date: {new Date(data.Date).toLocaleDateString()}</h3>

        {/* ✅ FIXED Status */}
        <h3>
          Status:{" "}
          <span
            className={`font-semibold ${
              data.status === "Completed"
                ? "text-green-600"
                : data.status === "In Progress"
                  ? "text-orange-500"
                  : "text-gray-600"
            }`}
          >
            {data.status}
          </span>
        </h3>

        <div className="flex justify-between mt-3">
          {/* Completed Button */}
          <button
            disabled={loading}
            onClick={() => updateStatus("Completed")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Completed
          </button>

          {/* Progress Button */}
          <button
            disabled={loading}
            onClick={() => updateStatus("In Progress")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Mark Progress
          </button>
        </div>
      </div>

      <button
        onClick={() => navigate("/board")}
        className="bg-gray-300 p-2 rounded-xl font-medium hover:bg-black hover:text-white"
      >
        Back
      </button>
    </div>
  );
};

export default Taskinfo;
