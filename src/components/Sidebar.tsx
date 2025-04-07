import { ADMIN_SIDEBAR_ITEMS } from "@/utils/constant";
import Link from "next/link";
import React, { ReactNode} from "react";
import Image from "next/image";

interface SidebarPageProps {
  children : ReactNode, 
  isOpen?: boolean; 
  onClose?: () => void,
  activeLink? : string
}

const Sidebar: React.FC<SidebarPageProps> = ({ children, isOpen, onClose, activeLink }) => {

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div className="flex min-h-[calc(100vh-82px)]">
        {/* Sidebar */}
        <div className={"md:flex flex-col md:w-64 sm:w-0"}>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div
              className={`fixed z-40 md:static md:translate-x-0 top-0 left-0 h-full w-64 bg-gray-100 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              <nav className="flex-1 p-4 bg-gray-100">
                {ADMIN_SIDEBAR_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.route}
                    className={`flex items-center rounded-xl px-4 py-3 my-2 font-bold text-gray-700  hover:bg-blue-200 ${item.route === activeLink && "bg-blue-200"}`}
                  >
                    <div className="flex gap-1">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        height={24}
                        width={24}
                        className="mr-2"
                      />

                      <p>{item.title}</p>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-y-auto"> {children}</div>
      </div>
    </>
  );
};
 
export default Sidebar;
