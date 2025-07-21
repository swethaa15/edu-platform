import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 pt-20">
        {" "}
        {/* Add pt-20 here */}
        <Sidebar isOpen={sidebarOpen} />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
