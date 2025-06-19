import React, { useState } from 'react'
import Landing from './components/Landing';
// import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Choose editor theme based on dark mode
  const editorTheme = darkMode ? 'vs-dark' : 'light';

  return (
    <div className={darkMode ? 'dark min-h-screen bg-gray-900' : 'min-h-screen bg-white'}>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Dark Mode
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            Light Mode
          </>
        )}
      </button>
      <Landing 
        editorTheme={editorTheme}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
