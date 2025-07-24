import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  FileText,
  BookOpen,
  Users,
  User,
  Search,
  Trash2,
  Copy,
  MoveRight,
  Menu,
  Edit,
  Plus,
  Circle,
} from "lucide-react";

// Header Component
interface HeaderProps {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, sidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
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
        <div className="flex items-center space-x-4">
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
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span className="font-semibold text-gray-800">Admin</span>
          </div>
        </div>
      </div>
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

// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const handleSectionClick = (section: string) => {
    const hash = section.toLowerCase().replace(/\s+\(\d+\)/, "");
    window.location.hash = hash;
  };

  return (
    <aside
      className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-3 space-y-6">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-small hover:bg-blue-700 transition-colors">
          ADD QUESTION
        </button>
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            SNAP SHOT
          </h3>
        </div>
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

// MainContent Component
const QUESTIONS_PER_PAGE = 10;

const MainContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFullView, setIsFullView] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(
    null
  );
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(QUESTIONS_PER_PAGE);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + QUESTIONS_PER_PAGE, filteredQuestions.length)
    );
  };

  const showLess = () => {
    setVisibleCount((prev) =>
      Math.max(QUESTIONS_PER_PAGE, prev - QUESTIONS_PER_PAGE)
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setViewDropdownOpen(false);
      }
    }
    if (viewDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewDropdownOpen]);

  const questionsData = [
    {
      id: 1,
      question:
        "What is the primary function of the operating system in a computer?",
      answer:
        "The primary function of an operating system (OS) is to manage computer hardware and software resources and to provide common services for computer programs. It acts as an intermediary between the user and the computer hardware.",
      owner: "Admin",
      type: "Theory",
      marks: 5,
    },
    {
      id: 2,
      question: "What is the result of 5 + 3?",
      answer: "8",
      owner: "Admin",
      type: "Numerical",
      marks: 2,
    },
    {
      id: 3,
      question: "Is React a JavaScript library?",
      answer:
        "Yes, React is a JavaScript library for building user interfaces.",
      owner: "Admin",
      type: "MCQ",
      marks: 1,
    },
    {
      id: 4,
      question: "Explain the concept of 'hoisting' in JavaScript.",
      answer:
        "Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase, before code execution. This means you can use variables and functions before they are declared.",
      owner: "Admin",
      type: "Theory",
      marks: 3,
    },
    {
      id: 5,
      question: "What is the capital of France?",
      answer: "Paris",
      owner: "Admin",
      type: "MCQ",
      marks: 2,
    },
    {
      id: 6,
      question: "Define Newton's Second Law.",
      answer:
        "Newton's Second Law states that the acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object. Mathematically, it's often expressed as F = ma (Force = mass × acceleration).",
      owner: "Admin",
      type: "Theory",
      marks: 4,
    },
    {
      id: 7,
      question: "What is the square root of 64?",
      answer: "8",
      owner: "Admin",
      type: "Numerical",
      marks: 3,
    },
    {
      id: 8,
      question: "What are props in React?",
      answer:
        "Props (short for properties) are read-only attributes that are passed from a parent component to a child component in React. They allow components to receive data and behave dynamically based on that data, without modifying the child component itself.",
      owner: "Editor",
      type: "Theory",
      marks: 5,
    },
    {
      id: 9,
      question: "What is the purpose of the useEffect hook in React?",
      answer:
        "The useEffect hook in React allows you to perform side effects in functional components. Common side effects include data fetching, subscriptions, or manually changing the DOM. It runs after every render, but you can control when it runs by specifying a dependency array.",
      owner: "Editor",
      type: "Coding",
      marks: 5,
    },
    {
      id: 10,
      question: "Explain the concept of Virtual DOM in React.",
      answer:
        "The Virtual DOM (VDOM) is a lightweight copy of the real DOM. When the state of a component changes, React first updates the Virtual DOM, then compares it with the previous Virtual DOM to find the minimal changes. Finally, it updates only those specific changes in the real DOM, which makes React applications very efficient.",
      owner: "Admin",
      type: "Theory",
      marks: 5,
    },
    {
      id: 11,
      question: "What is state in React?",
      answer:
        "State in React refers to an object that holds data or information about the component. A component's state can change over time, and when it does, the component will re-render to reflect the new state. It's a way for components to manage and react to user interactions or network responses.",
      owner: "Editor",
      type: "Coding",
      marks: 5,
    },
    {
      id: 12,
      question: "What is prop drilling in React and how can it be avoided?",
      answer:
        "Prop drilling is a scenario in React where you pass props down through multiple layers of components, even if some intermediate components don't directly use those props. It can be avoided using context API, Redux, or component composition to directly provide data to components that need it.",
      owner: "Editor",
      type: "Coding",
      marks: 5,
    },
    {
      id: 13,
      question: "What is the capital of Spain?",
      answer: "Madrid",
      owner: "Admin",
      type: "MCQ",
      marks: 1,
    },
    {
      id: 14,
      question: "What is the useState hook used for?",
      answer:
        "The useState hook is a fundamental React hook that allows functional components to have state. It returns a stateful value and a function to update it, enabling components to manage dynamic data.",
      owner: "Editor",
      type: "Coding",
      marks: 5,
    },
    {
      id: 15,
      question: "What is the capital of Japan?",
      answer: "Tokyo",
      owner: "Admin",
      type: "MCQ",
      marks: 1,
    },
    {
      id: 16,
      question: "What is kinetic energy?",
      answer:
        "Kinetic energy is the energy that an object possesses due to its motion. It is defined as the work needed to accelerate a given mass from rest to its stated velocity.",
      owner: "Editor",
      type: "Theory",
      marks: 5,
    },
    {
      id: 17,
      question: "What is 15 / 3?",
      answer: "5",
      owner: "Admin",
      type: "Numerical",
      marks: 2,
    },
    {
      id: 18,
      question: "What is the capital of India?",
      answer: "New Delhi",
      owner: "Admin",
      type: "MCQ",
      marks: 1,
    },
    {
      id: 19,
      question: "Explain the concept of closures in JavaScript.",
      answer:
        "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler words, a closure gives you access to an outer function’s scope from an inner function.",
      owner: "Editor",
      type: "Coding",
      marks: 4,
    },
    {
      id: 20,
      question:
        "What is the difference between 'let', 'const', and 'var' in JavaScript?",
      answer:
        "'var' is function-scoped and can be re-declared and re-assigned. 'let' is block-scoped and can be re-assigned but not re-declared. 'const' is block-scoped and cannot be re-assigned or re-declared after its initial assignment, making it ideal for constant values.",
      owner: "Admin",
      type: "Coding",
      marks: 5,
    },
  ];

  const filteredQuestions = questionsData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.filter((id) => filteredQuestions.some((q) => q.id === id))
    );
  }, [filteredQuestions]);

  useEffect(() => {
    setVisibleCount(QUESTIONS_PER_PAGE);
  }, [searchTerm]);

  const toggleFullView = () => {
    setIsFullView((prev) => !prev);
    setExpandedQuestionId(null);
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
      setSelectAll(false);
    } else {
      setSelectedQuestions(filteredQuestions.map((q) => q.id));
      setSelectAll(true);
    }
  };

  const handleQuestionSelect = (questionId: number) => {
    const newSelected = selectedQuestions.includes(questionId)
      ? selectedQuestions.filter((id) => id !== questionId)
      : [...selectedQuestions, questionId];

    setSelectedQuestions(newSelected);
    setSelectAll(newSelected.length === filteredQuestions.length);
  };

  const [viewOptions, setViewOptions] = useState({
    questions: true,
    owner: false,
    type: false,
    marks: false,
    actions: false,
  });

  const gridColumns = `
    24px
    ${viewOptions.questions ? "minmax(250px, 1fr)" : "0fr"}
    ${viewOptions.owner ? "minmax(100px, 0.5fr)" : "0fr"}
    ${viewOptions.type ? "minmax(100px, 0.5fr)" : "0fr"}
    ${viewOptions.marks ? "minmax(80px, 0.3fr)" : "0fr"}
    ${viewOptions.actions ? "minmax(120px, 0.5fr)" : "0fr"}
  `.trim();

  return (
    <main className="lg:ml-64 pt-16 p-4 bg-gray-50 min-h-[calc(100vh-4rem)] w-full">
      <div className="w-full max-w-full mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-800">
            Test 1 Questions
          </h1>
          <div className="flex items-center space-x-2 relative">
            <button
              className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 bg-white text-xs font-medium transition-colors hover:bg-blue-500 hover:text-white focus:outline-none"
              onClick={toggleFullView}
            >
              Full View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewDropdownOpen((open) => !open);
              }}
              className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 bg-white text-xs font-medium transition-colors hover:bg-gray-100 focus:outline-none"
            >
              View
            </button>
            {viewDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
              >
                <div className="py-2 space-y-2">
                  {[
                    { key: "questions", label: "Questions" },
                    { key: "owner", label: "Owner" },
                    { key: "type", label: "Type" },
                    { key: "marks", label: "Marks" },
                    { key: "actions", label: "Actions" },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center px-3 py-1 cursor-pointer hover:bg-gray-100 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={
                          viewOptions[option.key as keyof typeof viewOptions]
                        }
                        onChange={() =>
                          setViewOptions((prev) => ({
                            ...prev,
                            [option.key]:
                              !prev[option.key as keyof typeof prev],
                          }))
                        }
                        className="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span
                        className={`ml-2 font-medium ${
                          viewOptions[option.key as keyof typeof viewOptions]
                            ? "text-blue-600"
                            : "text-gray-700"
                        } text-sm`}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="px-3 py-1 border-t border-gray-200">
                  <button
                    className="w-full bg-blue-600 text-white rounded-md py-1 text-sm font-medium hover:bg-blue-700 transition"
                    onClick={() => setViewDropdownOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
        <div className="p-3">
          <div
            className="grid items-center bg-gray-100 px-3 py-1 rounded-t-lg border border-b-0 border-gray-200 h-14"
            style={{ gridTemplateColumns: gridColumns }}
          >
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 justify-self-start"
              checked={
                selectedQuestions.length === filteredQuestions.length &&
                filteredQuestions.length > 0
              }
              onChange={handleSelectAll}
            />
            {viewOptions.questions && (
              <h2 className="text-base font-medium text-gray-800 mb-0">
                Questions
              </h2>
            )}
            {viewOptions.owner && (
              <h2 className="text-base font-medium text-gray-800 text-center mb-0">
                Owner
              </h2>
            )}
            {viewOptions.type && (
              <h2 className="text-base font-medium text-gray-800 text-center mb-0">
                Type
              </h2>
            )}
            {viewOptions.marks && (
              <h2 className="text-base font-medium text-gray-800 text-center mb-0">
                Marks
              </h2>
            )}
            {viewOptions.actions && (
              <h2 className="text-base font-medium text-gray-800 text-center mb-0">
                Actions
              </h2>
            )}
          </div>
          <div>
            {filteredQuestions.slice(0, visibleCount).map((item) => (
              <QuestionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                owner={item.owner}
                type={item.type}
                marks={item.marks}
                isSelected={selectedQuestions.includes(item.id)}
                onSelect={() => handleQuestionSelect(item.id)}
                isExpanded={isFullView || expandedQuestionId === item.id}
                onExpand={() =>
                  setExpandedQuestionId(
                    expandedQuestionId === item.id ? null : item.id
                  )
                }
                isFullView={isFullView}
                viewOptions={viewOptions}
                gridColumns={gridColumns}
              />
            ))}
            <div className="flex flex-col items-center justify-center mt-4">
              {visibleCount < filteredQuestions.length ? (
                <button
                  className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium text-sm px-6 py-1.5 rounded-full transition"
                  onClick={loadMore}
                >
                  Load More
                </button>
              ) : (
                filteredQuestions.length > QUESTIONS_PER_PAGE && (
                  <button
                    className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium text-sm px-6 py-1.5 rounded-full transition"
                    onClick={showLess}
                  >
                    Show Less
                  </button>
                )
              )}
              <p className="text-sm text-gray-500 mt-2">
                Showing {Math.min(visibleCount, filteredQuestions.length)} out
                of {filteredQuestions.length} Tests
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

interface QuestionItemProps {
  question: string;
  answer: string;
  owner: string;
  type: string;
  marks: number;
  isSelected: boolean;
  onSelect: () => void;
  isExpanded: boolean;
  onExpand: () => void;
  isFullView: boolean;
  viewOptions: {
    questions: boolean;
    owner: boolean;
    type: boolean;
    marks: boolean;
    actions: boolean;
  };
  gridColumns: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answer,
  owner,
  type,
  marks,
  isSelected,
  onSelect,
  isExpanded,
  onExpand,
  isFullView,
  viewOptions,
  gridColumns,
}) => {
  const MAX_QUESTION_LENGTH = 50;

  const displayQuestion =
    !isExpanded && !isFullView && question.length > MAX_QUESTION_LENGTH
      ? question.substring(0, MAX_QUESTION_LENGTH) + "..."
      : question;

  return (
    <div
      className="border border-gray-200 rounded-lg transition-colors mt-2 w-full"
      onClick={!isFullView ? onExpand : undefined}
    >
      <div
        className="grid items-start p-4 bg-gray-50 transition-colors"
        style={{ gridTemplateColumns: gridColumns }}
      >
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 justify-self-start"
          checked={isSelected}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          readOnly
        />
        {viewOptions.questions && (
          <div className="min-w-0 flex-1">
            <p className="text-blue-600 font-medium leading-relaxed text-sm">
              {displayQuestion}
            </p>
            {isExpanded && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {answer}
                </p>
              </div>
            )}
          </div>
        )}
        {viewOptions.owner && (
          <div className="text-gray-700 text-sm text-center self-center min-w-[100px]">
            {owner}
          </div>
        )}
        {viewOptions.type && (
          <div className="text-gray-700 text-sm text-center self-center min-w-[100px]">
            {type}
          </div>
        )}
        {viewOptions.marks && (
          <div className="text-gray-700 text-sm text-center self-center min-w-[80px]">
            {marks}
          </div>
        )}
        {viewOptions.actions && (
          <div className="flex items-center justify-center space-x-2 min-w-[120px]">
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
              title="Copy"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-gray-500 hover:text-gray-900 transition-colors"
              title="Move"
            >
              <MoveRight size={16} />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-gray-500 hover:text-green-500 transition-colors"
              title="more"
            >
              <Menu size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// App Component
const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
 
