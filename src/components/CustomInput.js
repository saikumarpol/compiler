import React from 'react';
import { classnames } from '../utils/general';

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <div className="w-full px-1 sm:px-3 md:px-6 mt-2 sm:mt-3">
      <textarea
        rows="4"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder="Enter your input here..."
        className={classnames(
          "w-full rounded-md border-2 border-black bg-white px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:shadow-md transition duration-200 resize-none"
        )}
      />
    </div>
  );
};

export default CustomInput;