import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import LanguagesDropdown from "./LanguagesDropDown";
import LanguageSidebar from "./LanguageSidebar";

const javaDefault = `// Use 'public class Main' as the entry point for your Java code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

const pythonDefault = `print('Hello, World!')`;
const cppDefault = `#include <iostream>
int main() {
    std::cout << "Hello World!";
    return 0;
}`;
const cDefault = `#include <stdio.h>
int main() {
    printf("Hello World!\n");
    return 0;
}`;
const jsDefault = console.log('Hello, World!');;

function getDefaultCode(lang) {
    switch (lang?.value) {
        case 'java':
        case 'java21':
            return javaDefault;
        case 'python':
        case 'python3.11':
        case 'python3.18':
            return pythonDefault;
        case 'cpp':
            return cppDefault;
        case 'c':
            return cDefault;
        case 'javascript':
            return jsDefault;
        default:
            return '';
    }
}

const Landing = () => {
    const [language, setLanguage] = useState(languageOptions[0]);
    const [code, setCode] = useState(getDefaultCode(language));
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar closed by default

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        setLanguage(sl);
        setCode(getDefaultCode(sl));
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress]);
    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };
    const handleCompile = () => {
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
          method: "POST",
          url: "https://judge0-ce.p.rapidapi.com/submissions",
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key":
              "26f397d828msh57887dad54691fap13b5e9jsnd60485118279",
          },
          data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("res.data", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                let status = err.response.status;
                console.log("status", status);
                if (status === 429) {
                    console.log("too many requests", status);
                    showErrorToast(
                        "Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!",
                        10000
                    );
                }
                setProcessing(false);
                console.log("catch block...", error);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "eb0d3364bemsh928cad1305d8905p13986bjsn7357710f69cd",
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                showSuccessToast("Compiled Successfully!");
                console.log("response.data", response.data);
                return;
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            showErrorToast();
        }
    };

    const showSuccessToast = (msg) => {
        toast.success(msg || "Compiled Successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showErrorToast = (msg, timer) => {
        toast.error(msg || "Something went wrong! Please try again.", {
            position: "top-right",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          className={`flex h-screen overflow-hidden transition-all duration-500 ease-in-out ${sidebarOpen ? 'pl-56' : 'pl-0'} flex-col md:flex-row bg-white`}
        >
          {/* Sidebar toggle button */}
          {!sidebarOpen && (
            <button
              className="absolute top-4 left-4 z-20 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          )}
          <LanguageSidebar 
            selectedLanguage={language} 
            onSelectLanguage={onSelectChange} 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          <div className="flex-1 flex flex-col overflow-auto">
            <div className="flex flex-col md:flex-row justify-center items-center mt-4 mb-2 gap-4">
              <LanguagesDropdown onSelectChange={onSelectChange} selectedLanguage={language} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start px-2 sm:px-4 py-2 sm:py-4 h-full">
              <div className="flex flex-col w-full md:max-w-3xl h-full justify-start items-end">
                <CodeEditorWindow
                  code={code}
                  onChange={onChange}
                  language={language?.value}
                />
              </div>
              <div className="right-container flex flex-shrink-0 w-full md:w-[30%] flex-col mt-4 md:mt-0">
                <OutputWindow outputDetails={outputDetails} />
                <div className="flex flex-col items-end">
                  <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
                  <style>
                    {`
                      @keyframes blink {
                        0% { opacity: 0.2; }
                        20% { opacity: 1; }
                        100% { opacity: 0.2; }
                      }
                      .dot {
                        animation: blink 1.4s infinite both;
                      }
                      .dot:nth-child(2) {
                        animation-delay: 0.2s;
                      }
                      .dot:nth-child(3) {
                        animation-delay: 0.4s;
                      }
                    `}
                  </style>
                  <button
                    onClick={handleCompile}
                    disabled={!code}
                    className="bg-blue-500 text-white font-semibold hover:bg-blue-600 mt-5 py-2 px-4 border border-blue-700 hover:border-blue-800 rounded transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center min-w-[180px] sm:min-w-[220px] text-sm sm:text-base"
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Processing
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </>
                    ) : (
                      "Compile and Execute Here"
                    )}
                  </button>
                </div>
                {outputDetails && <OutputDetails outputDetails={outputDetails} />}
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
export default Landing;