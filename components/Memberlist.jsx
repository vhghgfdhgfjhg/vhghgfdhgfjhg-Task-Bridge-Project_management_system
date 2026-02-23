import axios from "axios";
import React, { useEffect, useState } from "react";

const Memberlist = () => {
  const [members, setMembers] = useState([]);
  const URL =
    "https://task-bridge-project-management-system.onrender.com/api/data/members";

  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  async function getmembersdata() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    getmembersdata();
  }, []);

  return (
    <div className="w-[96%] bg-white rounded-2xl h-min">
      <div className="flex justify-between items-center w-full p-3">
        <h1 className="font-medium">Team Members</h1>
      </div>

      <div>
        {members.map((member) => {
          // const isYou = member._id;
          return (
            <div key={member._id} className="p-2 flex gap-2 items-center">
              <div className="w-[3em] h-[3em] rounded-full bg-gray-300 flex items-center justify-center">
                <h1>{member.name?.charAt(0).toUpperCase()}</h1>
              </div>

              <div>
                <h1 className="font-medium text-2xl">{member.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memberlist;
