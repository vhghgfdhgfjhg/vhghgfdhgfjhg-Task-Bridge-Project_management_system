import React, { useEffect, useState, useRef } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

const Analysis = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [chartWidth, setChartWidth] = useState(400);

  const containerRef = useRef(null);

  const URL = "https://task-bridge-project-management-system.onrender.com/api/task/newtask";

  useEffect(() => {
    axios.get(URL).then((res) => {
      setTasks(res.data);
    });
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setChartWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const members = [
    ...new Set(tasks.map((task) => task.Assignee).filter(Boolean)),
  ];

  const memberTasks = tasks.filter(
    (task) => task.Assignee === selectedMember
  );

  const critical = memberTasks.filter(t => t.Priority === "Critical").length;
  const high = memberTasks.filter(t => t.Priority === "High").length;
  const medium = memberTasks.filter(t => t.Priority === "Medium").length;
  const low = memberTasks.filter(t => t.Priority === "Low").length;

const completed = memberTasks.filter(
  (t) => t.status === "Completed"
).length;

const inProgress = memberTasks.filter(
  (t) => t.status === "In Progress"
).length;

  return (
    <div className="p-6 flex flex-col items-center gap-10 w-full">

      <select
        className="border p-2 rounded"
        value={selectedMember}
        onChange={(e) => setSelectedMember(e.target.value)}
      >
        <option value="">Select Member</option>
        {members.map((member, index) => (
          <option key={index} value={member}>
            {member}
          </option>
        ))}
      </select>

      {selectedMember && (
        <div
          ref={containerRef}
          className="w-full max-w-4xl flex flex-col lg:flex-row gap-10 justify-center items-center"
        >
          {/* 🔹 Priority Chart */}
          <div className="flex flex-col items-center w-full bg-white rounded-2xl">
            <h2 className="font-semibold mb-2 pt-2 text-xl">Priority Analysis</h2>
            <PieChart
              width={chartWidth > 300 ? 200 : chartWidth - 50}
              height={300}
              series={[
                {
                  data: [
                    { id: 0, value: critical, label: "Critical" },
                    { id: 1, value: high, label: "High" },
                    { id: 2, value: medium, label: "Medium" },
                    { id: 3, value: low, label: "Low" },
                  ],
                },
              ]}
            />
          </div>

          {/* 🔹 Completion Chart */}
          <div className="flex flex-col items-center w-full bg-white rounded-2xl p-1">
            <h2 className="font-semibold mb-2 pt-2 text-xl">Completion Analysis</h2>
            <PieChart
              width={chartWidth > 300 ? 200 : chartWidth - 40}
              height={300}
              series={[
                {
                  data: [
                    { id: 0, value: completed, label: "Completed" },
                    { id: 1, value: inProgress, label: "In Progress" },
                  ],
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;