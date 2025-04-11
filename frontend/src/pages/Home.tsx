import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed(!collapsed)}
        onLogout={logout}
      />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Table />
      </div>
    </div>
  );
};

export default Home;
