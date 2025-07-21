import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  FileText,
  BookOpen,
  Users,
  User,
} from "lucide-react";

interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, sidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo and sidebar toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronRight className="h-5 w-5 text-blue-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            )}
          </button>
          <span className="text-lg font-semibold text-gray-800 ml-2">
            EDUCATION
          </span>
        </div>

        {/* Menus: Collapsible on small screens */}
        <nav className="hidden lg:flex items-center space-x-5">
          <MenuItem
            icon={<LayoutGrid className="h-5 w-4" />}
            label="Dashboard"
          />
          <MenuItem
            icon={<FileText className="h-4 w-4" />}
            label="Tests"
            active
          />
          <MenuItem
            icon={<BookOpen className="h-4 w-4" />}
            label="Question Banks"
          />
          <MenuItem icon={<Users className="h-4 w-4" />} label="Classes" />
          <MenuItem icon={<User className="h-4 w-4" />} label="Teachers" />
        </nav>

        {/* Right: Profile and Menu Toggle for small screens */}
        <div className="flex items-center space-x-4">
          {/* Menu toggle button for small screens, placed before profile */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <ChevronRight className="h-5 w-5 text-blue-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-blue-600" />
            )}
          </button>
          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="font-semibold text-gray-800">Admin</span>
          </div>
        </div>
      </div>

      {/* Small screen: Collapsed menu dropdown */}
      {menuOpen && (
        <nav className="lg:hidden absolute left-0 top-full w-full bg-white border-b border-gray-200 shadow z-40">
          <div className="flex flex-col items-start px-4 py-2 space-y-3">
            <MenuItem
              icon={<LayoutGrid className="h-5 w-4" />}
              label="Dashboard"
            />
            <MenuItem
              icon={<FileText className="h-4 w-4" />}
              label="Tests"
              active
            />
            <MenuItem
              icon={<BookOpen className="h-4 w-4" />}
              label="Question Banks"
            />
            <MenuItem icon={<Users className="h-4 w-4" />} label="Classes" />
            <MenuItem icon={<User className="h-4 w-4" />} label="Teachers" />
          </div>
        </nav>
      )}
    </header>
  );
};

const MenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ icon, label, active }) => (
  <div
    className={`flex items-center space-x-2 cursor-pointer py-2 ${
      active ? "text-blue-600 font-semibold" : "text-gray-800"
    } `}
  >
    {icon}
    <span className="text-sm leading-loose">{label}</span>
  </div>
);

export default Header;
