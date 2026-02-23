import Progress from "../components/Progress";
import Memberlist from "../components/Memberlist";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const taskURL =
    "https://task-bridge-project-management-system.onrender.com/api/task/newtask";
  const memberURL =
    "https://task-bridge-project-management-system.onrender.com/api/data/members";

  // 🔹 Protect route

  const getTasks = async () => {
    try {
      const { data } = await axios.get(taskURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(memberURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembers(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getTasks();
      fetchMembers();
    }
  }, []);

  const totalTasks = tasks.length;

  const completedCount = tasks.filter((t) => t.status === "Completed").length;

  const progressCount = tasks.filter((t) => t.status === "In Progress").length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueCount = tasks.filter((t) => {
    const taskDate = new Date(t.Date);
    return taskDate < today && t.status !== "Completed";
  }).length;

  return (
    <div className="h-full w-full flex flex-col items-center gap-4">
      {/* 🔹 Overall Progress */}
      <div className="flex flex-col bg-white w-[96%] p-4 rounded-2xl gap-3">
        <h1 className="text-lg font-semibold">Overall Progress</h1>

        <Progress value={completedCount} max={totalTasks} />

        <h6>
          {completedCount} of {totalTasks} tasks completed
        </h6>
      </div>

      {/* 🔹 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-4 w-[96%]">
        <StatCard
          title="Total Task"
          value={totalTasks}
          icon="./public/task-square-svgrepo-com.png"
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon="./public/circle-check-filled-svgrepo-com.png"
        />
        <StatCard
          title="In Progress"
          value={progressCount}
          icon="./public/progress.png"
        />
        <StatCard
          title="Overdue"
          value={overdueCount}
          icon="./public/task-past-due-symbolic-svgrepo-com.png"
        />
        <StatCard
          title="Team Members"
          value={members.length}
          icon="./public/team-svgrepo-com.png"
        />
        <StatCard
          title="Recent Activity"
          value="--"
          icon="./public/trending-up-svgrepo-com.png"
        />
      </div>

      <Memberlist />
    </div>
  );
};

// 🔹 Reusable Stat Card
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white shadow flex items-center justify-between gap-2 p-3 rounded-2xl">
    <img src={icon} alt="icon" className="h-[2em] w-[2em]" />
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-medium">{title}</h1>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
