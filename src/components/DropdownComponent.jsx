import React, { useState } from "react";

export default function DropdownComponent({ assignedGroups, onSelectedOption }) {
    const [selectedGroup, setSelectedGroup] = useState("General");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleOptionClick = (group) => {
      setSelectedGroup(group);
      setIsMenuOpen(false);
      onSelectedOption(group);
    };
  
    const handleButtonClick = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    // Filter out the selected group from the options
    const filteredGroups = assignedGroups.filter((group) => group !== selectedGroup);
  
    return (
      <div className="inline-flex bg-white border rounded-md">
        <a
          href="#"
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
        >
          {selectedGroup}
        </a>
  
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
            onClick={handleButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
  
          {isMenuOpen && (
            <div className="absolute z-10 right-0 w-40 py-1 mt-2 bg-white border rounded-md shadow-lg">
              {filteredGroups.map((group) => (
                <a
                  key={group}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                  onClick={() => handleOptionClick(group)}
                >
                  {group}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  