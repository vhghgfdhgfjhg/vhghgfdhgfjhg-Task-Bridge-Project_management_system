import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Project from "../components/Project";
import Menu from "../components/Menu";
import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Taskinfo from "../pages/Taskinfo";
import Analysis from "../pages/Analysis";

const routes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/board", element: <Board /> },
  { path: "/chat", element: <Analysis /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {path :'/taskinfo/:id', element:<Taskinfo/>}
];

const App = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Navbar />
      <Project />
      <Menu />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>

      {/* ✅ Keep this once in root */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
