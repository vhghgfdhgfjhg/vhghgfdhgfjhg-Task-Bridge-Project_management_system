import axios from "axios";
import React, { useEffect, useState } from "react";

const Project = () => {
  const [showmodul, setshowmodul] = useState(false);
  const [data, setdata] = useState([]);
  const [members, setMembers] = useState([]);

  const [title, settitle] = useState("");
  const [description, setdeiscription] = useState("");
  const [assignee, setassignee] = useState("");
  const [priority, setpriority] = useState("");
  const [date, setdate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const getmemberURL = "https://task-bridge-project-management-system.onrender.com/api/data/members";
  const projectURL = "https://task-bridge-project-management-system.onrender.com/api/project/newProject";
  const createtaskURL = "https://task-bridge-project-management-system.onrender.com/api/task/newtask";

  const token = localStorage.getItem("token");


  async function getmembersdata() {
    try {
      const { data } = await axios.get(getmemberURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembers(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }


  async function getproject() {
    try {
      const response = await axios.get(projectURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setdata(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

 
  async function createtask() {
    try {
      const response = await axios.post(
        createtaskURL,
        {
          Title: title,
          Description: description,
          Assignee: assignee,
          Priority: priority,
          Date: date,
          Project: selectedProject, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("created:", response.data);

      settitle("");
      setdeiscription("");
      setassignee("");
      setpriority("");
      setdate("");
      setSelectedProject("");
      setshowmodul(false);

      await getproject();
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  function handelcreatetask(e) {
    e.preventDefault();
    createtask();
  }

  useEffect(() => {
    getproject();
    getmembersdata();
  }, []);

  return (
    <div className="w-[96%] bg-white p-2 flex flex-col gap-2 rounded items-center">
      {data.map((project) => (
        <div
          key={project._id}
          className="flex gap-2 p-4 rounded-xl shadow w-full justify-between"
          style={{ backgroundColor: project.color }}
        >
          <div>
            <h1 className="font-semibold text-lg">{project.name}</h1>
            <p className="text-gray-700">{project.description}</p>
          </div>

          <button
            onClick={() => {
              setSelectedProject(project.name); // ✅ set project name
              setshowmodul(true);
            }}
            className="text-white bg-black p-2 rounded-xl mt-2"
          >
            + New Task
          </button>
        </div>
      ))}

      {showmodul && (
        <form onSubmit={handelcreatetask}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-[70%] bg-white rounded-2xl flex flex-col gap-3 p-4">

            
              <div>
                <h1>Task Title</h1>
                <input
                  type="text"
                  className="border-2 border-gray-400 rounded w-full p-1 bg-gray-100"
                  required
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Enter the Task"
                />
              </div>

              
              <div>
                <h1>Description</h1>
                <textarea
                  className="border-2 border-gray-400 rounded w-full p-1 bg-gray-100"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setdeiscription(e.target.value)}
                  placeholder="Enter the Discription"
                />
              </div>

      
              <div>
                <h1>Assignee</h1>
                <select
                  className="w-full bg-gray-100 rounded p-1"
                  value={assignee}
                  onChange={(e) => setassignee(e.target.value)}
                  required
                >
                  <option value="">Select Member</option>
                  {members.map((member) => (
                    <option key={member._id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h1>Project</h1>
                <select
                  className="w-full bg-gray-100 rounded p-1"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  required
                >
                  <option value="">Select Project</option>
                  {data.map((project) => (
                    <option key={project._id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority & Date */}
              <div className=" w-full flex flex-wrap sm:flex-nowrap justify-between">
                <div>
                  <h1>Priority</h1>
                  <select
                    className="w-full bg-gray-100 rounded p-2"
                    value={priority}
                    onChange={(e) => setpriority(e.target.value)}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <h1>Due Date</h1>
                  <input
                    type="date"
                    className="bg-gray-100 rounded p-2"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setshowmodul(false)}
                  className="border-2 border-gray-200 px-3 py-1 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="text-white bg-black px-3 py-1 rounded"
                >
                  Create Task
                </button>
              </div>

            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Project;