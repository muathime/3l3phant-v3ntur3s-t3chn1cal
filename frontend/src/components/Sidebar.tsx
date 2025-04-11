import React from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineLogout,
} from "react-icons/hi";
import logo from "../assets/fbi_logo.png";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggleSidebar,
  onLogout,
}) => {
  return (
    <div
      className={`bg-gray-800 text-white flex flex-col justify-between h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-44"
      } p-4`}
    >
      <div className="relative w-full">
        <div className="absolute left-1 top-4">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            {collapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
          </button>
        </div>

        <div className="flex flex-col items-center mt-16">
          <div className="w-20 h-20 mb-4 flex justify-center items-center">
            <img
              src={logo}
              alt="Company Logo"
              className={`${collapsed ? "h-16" : "h-20"} w-auto`}
            />
          </div>

          {!collapsed && (
            <div className="text-center">
              <span className="font-bold text-lg text-white">FBI Wanted</span>
            </div>
          )}
        </div>
      </div>

      {collapsed ? (
        <button
          onClick={onLogout}
          className="text-red-500 hover:text-red-600 text-2xl"
        >
          <HiOutlineLogout />
        </button>
      ) : (
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
