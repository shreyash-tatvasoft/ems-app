import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-82px)]">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-4 bg-gray-100">
            <a
              href="#"
              className="flex items-center rounded-xl p-4 font-bold text-blue-600  hover:bg-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9.75L12 3l9 6.75V21H3V9.75z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21V12h6v9"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center p-4 rounded-xl font-bold text-blue-600 hover:bg-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Events
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">chidren here</div>
    </div>
  );
};

export default Sidebar;
