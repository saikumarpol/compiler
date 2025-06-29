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

const LanguagesDropdown = ({ onSelectChange, selectedLanguage }) => {
    // Use only light (default) theme styles
    const themedStyles = {
        ...customStyles,
        control: (styles) => ({
            ...customStyles.control(styles),
            backgroundColor: '#FFF',
            color: '#000',
            borderColor: '#d1d5db',
        }),
        option: (styles, { data, isFocused, isSelected }) => {
            const languageColors = {
                javascript: '#fffbe7',
                java21: '#fff3e6',
                'python3.11': '#e6f0fa',
                c: '#e6eaff',
                cpp: '#e6f3fa',
            };
            const bgColor = isSelected
                ? '#4169e1'
                : isFocused
                ? '#e7e7e7'
                : (languageColors[data.value] || '#fff');
            let textColor = '#000';
            if (isSelected || isFocused) {
                textColor = '#fff';
            } else if (["javascript", "java21", "c", "cpp", "python3.11"].includes(data.value)) {
                textColor = '#222';
            }
            return {
                ...customStyles.option(styles),
                backgroundColor: bgColor,
                color: textColor,
                fontWeight: isSelected ? 700 : 500,
                textShadow: 'none',
            };
        },
        menu: (styles) => ({
            ...customStyles.menu(styles),
            backgroundColor: '#fff',
            color: '#000',
        }),
        placeholder: (styles) => ({
            ...customStyles.placeholder(styles),
            color: '#000',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: '#000',
        }),
    };
    return (
        <Select
            placeholder="Filter By Category"
            options={languageOptions}
            styles={themedStyles}
            value={selectedLanguage}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
            formatOptionLabel={formatOptionLabel}
            className="p-2 rounded border outline-none transition-colors duration-300 bg-white text-gray-900 border-gray-300"
        />
    );
};

export default LanguagesDropdown;