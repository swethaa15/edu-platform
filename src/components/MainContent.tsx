import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

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
    { id: 1, question: "What is the result of 5 + 3?", answer: "8" },
    {
      id: 2,
      question: "Is React a JavaScript library?",
      answer:
        "Yes, React is a JavaScript library for building user interfaces.",
    },
    {
      id: 3,
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that looks similar to HTML.",
    },
    { id: 4, question: "What is the capital of France?", answer: "Paris" },
    { id: 5, question: "Define Newton's Second Law.", answer: "F = ma" },
    { id: 6, question: "What is 10 * 5?", answer: "50" },
    { id: 7, question: "Capital of Germany?", answer: "Berlin" },
    { id: 8, question: "Square root of 64?", answer: "8" },
    {
      id: 9,
      question: "What are props?",
      answer: "Props are read-only data passed from parent to child.",
    },
    {
      id: 10,
      question: "What is useEffect?",
      answer: "A hook for side effects in React.",
    },
    {
      id: 11,
      question: "What is virtual DOM?",
      answer: "A lightweight copy of the real DOM used for performance.",
    },
    {
      id: 12,
      question: "What is state in React?",
      answer: "Data that determines how a component renders and behaves.",
    },
    { id: 13, question: "Capital of Spain?", answer: "Madrid" },
    {
      id: 14,
      question: "What is prop drilling?",
      answer: "Passing props through many layers unnecessarily.",
    },
    { id: 15, question: "What is the capital of Japan?", answer: "Tokyo" },
    {
      id: 16,
      question: "What is useState?",
      answer: "Hook to manage state in functional components.",
    },
    { id: 17, question: "Square root of 100?", answer: "10" },
    { id: 18, question: "What is the capital of India?", answer: "New Delhi" },
    {
      id: 19,
      question: "What is kinetic energy?",
      answer: "Energy of motion.",
    },
    { id: 20, question: "What is 15 / 3?", answer: "5" },

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

  return (
    <main className=" flex-1 p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
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
                              [option.key]: !prev[option.key],
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
        </div>

        {/* Search */}
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

        {/* Question List */}
        <div className="p-3">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-t-lg border border-b-0 border-gray-200 h-14">
            <input
              type="checkbox"
              className="h-4 w-4 ml-1 space-y-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
              checked={
                selectedQuestions.length === filteredQuestions.length &&
                filteredQuestions.length > 0
              }
              onChange={handleSelectAll}
            />
            <h2 className="text-base font-large text-gray-800 ml-6 mb-0">
              Questions
            </h2>
          </div>

          <div>
            {filteredQuestions.slice(0, visibleCount).map((item) => (
              <QuestionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isSelected={selectedQuestions.includes(item.id)}
                onSelect={() => handleQuestionSelect(item.id)}
                isExpanded={isFullView || expandedQuestionId === item.id}
                onExpand={() =>
                  setExpandedQuestionId(
                    expandedQuestionId === item.id ? null : item.id
                  )
                }
                isFullView={isFullView}
              />
            ))}

            {/* Load More / Show Less / Count */}
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
  isSelected: boolean;
  onSelect: () => void;
  isExpanded: boolean;
  onExpand: () => void;
  isFullView: boolean;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  answer,
  isSelected,
  onSelect,
  isExpanded,
  onExpand,
  isFullView,
}) => {
  const displayQuestion =
    question.length > 100 && !isExpanded
      ? question.substring(0, 20) + "..."
      : question;

  return (
    <div
      className="border border-gray-200 rounded-lg transition-colors cursor-pointer"
      onClick={!isFullView ? onExpand : undefined}
    >
      <div className="p-4 bg-gray-50 transition-colors flex items-start">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
          checked={isSelected}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          readOnly
        />
        <div className="flex-1 min-w-0 ml-6">
          <p className="text-blue-600 font-medium leading-relaxed text-sm">
            {displayQuestion}
          </p>
          {isExpanded && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed text-sm">{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
