import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const formatOptionLabel = ({ label, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {icon && (
      <img src={icon} alt="icon" style={{ width: 20, height: 20, marginRight: 8 }} />
    )}
    <span>{label}</span>
  </div>
);

const LanguagesDropdown = ({ onSelectChange, selectedLanguage, darkMode }) => {
    // Dynamically adjust styles for dark/light mode
    const themedStyles = {
        ...customStyles,
        control: (styles) => ({
            ...customStyles.control(styles),
            backgroundColor: darkMode ? '#1a202c' : '#FFF',
            color: darkMode ? '#f3f4f6' : '#000',
            borderColor: darkMode ? '#374151' : '#d1d5db',
        }),
        option: (styles, { data, isFocused, isSelected }) => {
            const languageColors = {
                javascript: darkMode ? '#f7e018' : '#fffbe7',
                java21: darkMode ? '#e76f00' : '#fff3e6',
                'python3.11': darkMode ? '#3572A5' : '#e6f0fa',
                c: darkMode ? '#5555ff' : '#e6eaff',
                cpp: darkMode ? '#00599c' : '#e6f3fa',
            };
            const bgColor = isSelected
                ? (darkMode ? '#2563eb' : '#4169e1')
                : isFocused
                ? (darkMode ? '#374151' : '#e7e7e7')
                : (languageColors[data.value] || (darkMode ? '#1a202c' : '#fff'));
            // Ensure text is always readable
            let textColor = '#000'; // Always use black for language names
            if (darkMode) {
                textColor = '#f3f4f6';
            } else if (isSelected || isFocused) {
                textColor = '#fff';
            } else if (["javascript", "java21", "c", "cpp", "python3.11"].includes(data.value)) {
                textColor = '#222';
            }
            return {
                ...customStyles.option(styles),
                backgroundColor: bgColor,
                color: textColor,
                fontWeight: isSelected ? 700 : 500,
                textShadow: darkMode ? '0 1px 2px #0008' : 'none',
            };
        },
        menu: (styles) => ({
            ...customStyles.menu(styles),
            backgroundColor: darkMode ? '#1a202c' : '#fff',
            color: darkMode ? '#f3f4f6' : '#000',
        }),
        placeholder: (styles) => ({
            ...customStyles.placeholder(styles),
            color: darkMode ? '#9ca3af' : '#000',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: darkMode ? '#f3f4f6' : '#000',
        }),
    };
    return (
        <Select
            placeholder={`Filter By Category`}
            options={languageOptions}
            styles={themedStyles}
            value={selectedLanguage}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
            formatOptionLabel={formatOptionLabel}
        />
    );
};

export default LanguagesDropdown;