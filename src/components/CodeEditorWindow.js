import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="w-full h-[50vh] sm:h-[70vh] md:h-[80vh] px-1 sm:px-2 md:px-6 py-2 sm:py-4 rounded-md shadow-2xl bg-[#1e293b] flex flex-col">
      <Editor
        height="100%"
        width="100%"
        language={language || "cpp"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditorWindow;