import { Link } from "react-router-dom";
import analysisimg from "../assets/analysis.png";
import boardimg from "../assets/board.png";
import dashboardimg from "../assets/dashboard.png";
const Menu = () => {
  return (
    <div className=" w-full bg-white flex items-center justify-between p-2">
      <Link to="/dashboard" className="flex flex-col items-center">
        <img
          src={dashboardimg}
          alt="logo"
          className=" h-[10%] sm:w-[10%] w-[25%] "
        />
        <h4>Dashboard</h4>
      </Link>

      <Link to="/board" className=" flex flex-col items-center">
        <img
          src={boardimg}
          alt="logo"
          className=" h-[10%] sm:w-[10%] w-[25%]"
        />

        <h4>Board</h4>
      </Link>

      <Link to="/chat" className=" flex flex-col items-center">
        <img
          src={analysisimg}
          alt="logo"
          className="  h-[10%] sm:w-[10%] w-[25%]"
        />

        <h4>Analysis</h4>
      </Link>
    </div>
  );
};

export default Menu;
