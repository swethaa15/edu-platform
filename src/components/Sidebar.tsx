import React from "react";
import { Plus, Circle } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const handleSectionClick = (section: string) => {
    const hash = section.toLowerCase().replace(/\s+\(\d+\)/, ""); // Remove "(5)" and convert to lowercase
    window.location.hash = hash;
  };

  return (
    <aside
      className={`z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${
          isOpen
            ? "fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto"
            : "fixed top-16 left-0 h-[calc(100vh-4rem)] -translate-x-full"
        }
        lg:static lg:h-auto lg:overflow-visible lg:top-0 lg:left-0 lg:translate-x-0`}
    >
      <div className="p-3 space-y-6">
        {/* Add Question Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-small hover:bg-blue-700 transition-colors">
          ADD QUESTION
        </button>

        {/* Snap Shot Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            SNAP SHOT
          </h3>
        </div>

        {/* Sections */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            SECTIONS
          </h3>
          <div className="space-y-2">
            <button
              className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => handleSectionClick("new-section")}
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">New Section</span>
            </button>
            <SectionItem
              label="Section 1"
              color="red"
              onClick={() => handleSectionClick("section-1")}
              
            />
            <SectionItem
              label="Section 2"
              color="blue"
              onClick={() => handleSectionClick("section-2")}
            />
            <div
              className="px-3 py-2 cursor-pointer"
              onClick={() => handleSectionClick("uncategorized")}
            >
              <span className="text-sm text-gray-600">Uncategorized (5)</span>
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            TEST INFORMATION
          </h3>
          <div className="space-y-3">
            <TestInfoItem label="Marks" value="10" />
            <TestInfoItem label="No. of Q" value="10" />
            <TestInfoItem label="Neg" value="10" />
            <TestInfoItem label="Duration" value="10" />
          </div>
        </div>
      </div>
    </aside>
  );
};

interface SectionItemProps {
  label: string;
  color: "red" | "blue";
  onClick: () => void;
}

const SectionItem: React.FC<SectionItemProps> = ({ label, color, onClick }) => {
  const colorClasses = {
    red: "text-red-500",
    blue: "text-blue-500",
  };

  return (
    <button
      className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
      onClick={onClick}
    >
      <Circle className={`h-3 w-3 fill-current ${colorClasses[color]}`} />
      <span className="text-sm">{label}</span>
    </button>
  );
};

interface TestInfoItemProps {
  label: string;
  value: string;
}

const TestInfoItem: React.FC<TestInfoItemProps> = ({ label, value }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        readOnly
      />
      <span className="text-sm text-gray-700">
        {label} : ({value})
      </span>
    </div>
  );
};

export default Sidebar;
