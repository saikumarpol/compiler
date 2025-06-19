import React from "react";
import { languageOptions } from "../constants/languageOptions";

const LanguageSidebar = ({ selectedLanguage, onSelectLanguage, isOpen, onClose, darkMode, setDarkMode }) => {
  return (
    <div
      className={`w-56 border-r h-full flex flex-col py-4 overflow-y-auto shadow-xl fixed top-0 left-0 z-30
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}
        ${isOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-10 opacity-0 scale-95 pointer-events-none'}`}
      style={{ boxShadow: isOpen ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : undefined }}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl font-bold focus:outline-none"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        ×
      </button>
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-lg font-bold">Languages</h2>
      </div>
      {languageOptions.map((lang) => (
        <button
          key={lang.id}
          className={`flex flex-col items-center justify-center m-2 p-3 rounded-lg border border-blue-200 shadow-sm ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-100'} transition-colors duration-150 focus:outline-none ${selectedLanguage?.id === lang.id ? (darkMode ? 'bg-blue-900 border-blue-400 font-semibold' : 'bg-blue-200 border-blue-400 font-semibold') : ''}`}
          onClick={() => onSelectLanguage(lang)}
        >
          {lang.icon && (
            <img src={lang.icon} alt={lang.label} className="w-8 h-8 mb-1" />
          )}
          <span className="text-xs text-center break-words">{lang.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSidebar;
