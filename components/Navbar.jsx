import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [projectname, setprojectname] = useState("");
  const [projectdesription, setprojectdescription] = useState("");
  const [selectprojectcolor, setselectprojectcolor] = useState("");
  const [showmodul, setshowmodul] = useState(false);
  const projectcolor = ["lightblue", "lightgreen", "#FFE4E1", "#F08080", "#E6E6FA", "lightpink"];
  const url = "https://task-bridge-project-management-system.onrender.com/api/project/newProject";
 async function createproject() {
  try {
    const response = await axios.post(url, {
      name: projectname,
      description: projectdesription,
      color: selectprojectcolor
    });

    console.log("Created:", response.data);

    // Reset form
    setprojectname("");
    setprojectdescription("");
    setselectprojectcolor("");
    setshowmodul(false);

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

  function handelcreateproject(e) {
  e.preventDefault();

  if (!selectprojectcolor) {
    alert("Please select a project color");
    return;
  }

  createproject();
}

  return (
    <div className="w-full bg-white flex justify-between items-center p-2 ">
      <div className=" flex gap-2 items-center ">
        <img src="./src/assets/logo.svg" className=" w-[18em]  h-min" alt="logo" />
        {/* <h1 className=" font-medium sm:text-[2em]">
          Project Management System
        </h1> */}
      </div>
      <div className=" flex items-center justify-end gap-2 flex-wrap sm:flex-nowrap">
        <button
          onClick={() => setshowmodul(true)}
          className="text-white bg-black hover:cursor-pointer rounded-full px-4 py-2"
        >
          + New Project
        </button>

        <Link to="/login">
        <button className="rounded-full hover:bg-red-500 hover:text-white hover:cursor-pointer border-2 border-gray-300 px-4 py-2 flex gap-8">
         <img src="./src/assets/box-arrow-right.svg" alt="logo" className="" /> Logout
        </button>
        </Link>
      </div>

      {showmodul && (
        <form onSubmit={handelcreateproject}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 h-full w-full">
            <div className=" fixed max-h-max w-[70%] bg-white rounded-2xl flex flex-col gap-3 p-4">
              <div>
                <h1>Create New Project</h1>
              </div>

              <div>
                <h1>Project Name</h1>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className=" border-2 border-gray-400 rounded w-full p-1"
                  value={projectname}
                  onChange={(e) => setprojectname(e.target.value)}
                  required
                />
              </div>

              <div>
                <h1>Description</h1>
                <textarea
                  type="text"
                  placeholder="Enter project description"
                  className=" border-2 border-gray-400 rounded w-full p-1"
                  rows={4}
                  required
                  value={projectdesription}
                  onChange={(e) => setprojectdescription(e.target.value)}
                />
              </div>
              <div>
                <h1>Project Color</h1>
                <div className=" flex gap-2">
                  {projectcolor.map((color) => (
                    <div
                      onClick={() => setselectprojectcolor(color)}
                      className="w-8 h-8 rounded-full cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className=" flex justify-between">
                <button
                  onClick={() => setshowmodul(false)}
                  className=" p-0.5 rounded-[5px] border-2 border-gray-200"
                >
                  Cancel
                </button>
                <button className=" text-white bg-gray-400 p-1 rounded-[5px]">
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Navbar;
