import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className=" w-full bg-white flex items-center justify-between p-2">
      <Link to="/dashboard" className="flex flex-col items-center">
        <img
          src="./src/assets/dashboard-1-svgrepo-com.svg"
          alt="logo"
          className=" h-[10%] sm:w-[10%] w-[25%] "
        />
        <h4>Dashboard</h4>
      </Link>

      <Link to="/board" className=" flex flex-col items-center">
        <img
          src="./src/assets/board-performance-profit-svgrepo-com.svg"
          alt="logo"
          className=" h-[10%] sm:w-[10%] w-[25%]"
        />

        <h4>Board</h4>
      </Link>

      <Link to="/chat" className=" flex flex-col items-center">
        <img
          src="./src/assets/analysis.svg"
          alt="logo"
          className="  h-[10%] sm:w-[10%] w-[25%]"
        />

        <h4>Analysis</h4>
      </Link>
    </div>
  );
};

export default Menu;
