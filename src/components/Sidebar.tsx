import { ADMIN_SIDEBAR_ITEMS } from "@/utils/constant";
import Link from "next/link";
import React, { ReactNode} from "react";
import Image from "next/image";

const Sidebar: React.FC<{children : ReactNode}> = ({ children }) => {
  return (
    <div className="flex min-h-[calc(100vh-82px)]">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-4 bg-gray-100">
            {ADMIN_SIDEBAR_ITEMS.map(item => 
              <Link
                 key={item.id}
                 href={item.route}
                 className="flex items-center rounded-xl p-4 font-bold text-gray-700  hover:bg-blue-200"
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
            )}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto"> {children}</div>
    </div>
  );
};

export default Sidebar;
