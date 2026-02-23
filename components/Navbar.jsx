import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// import mainlogo from "../assets/mainlogo.png";
// import logoutIcon from "../assets/box-arrow-right.png";

const Navbar = () => {
  const [projectname, setprojectname] = useState("");
  const [projectdesription, setprojectdescription] = useState("");
  const [selectprojectcolor, setselectprojectcolor] = useState("");
  const [showmodul, setshowmodul] = useState(false);

  const projectcolor = [
    "lightblue",
    "lightgreen",
    "#FFE4E1",
    "#F08080",
    "#E6E6FA",
    "lightpink",
  ];

  const url =
    "https://task-bridge-project-management-system.onrender.com/api/project/newProject";

  async function createproject() {
    try {
      const response = await axios.post(url, {
        name: projectname,
        description: projectdesription,
        color: selectprojectcolor,
      });

      console.log("Created:", response.data);

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
    <div className="w-full bg-white flex justify-between items-center p-2 rounded-xl">

      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="./components/mainlogo.png"
          className=" w-[12em] sm:w-[16em] h-auto"
          alt="logo"
        />
      </div>

      {/* Buttons Section */}
      <div className="flex items-center  gap-2 sm:flex-row flex-col">
        <button
          onClick={() => setshowmodul(true)}
          className="text-white bg-black rounded-full px-4 py-2 hover:bg-gray-800 transition"
        >
          + New Project
        </button>

        <Link to="/login">
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-red-500 hover:text-white transition">
            <img src="./components/logout.png" alt="logout" className="w-5 h-5" />
            Logout
          </button>
        </Link>
      </div>

      {/* Modal */}
      {showmodul && (
        <form onSubmit={handelcreateproject}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-h-[90vh] overflow-auto p-6 flex flex-col gap-4">

              <h1 className="text-lg font-semibold">Create New Project</h1>

              <div>
                <label className="block text-sm font-medium">Project Name</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="border rounded w-full p-2 mt-1 bg-gray-100"
                  value={projectname}
                  onChange={(e) => setprojectname(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter project description"
                  className="border rounded w-full p-2 mt-1 bg-gray-100"
                  rows={4}
                  required
                  value={projectdesription}
                  onChange={(e) => setprojectdescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {projectcolor.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setselectprojectcolor(color)}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectprojectcolor === color
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setshowmodul(false)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
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