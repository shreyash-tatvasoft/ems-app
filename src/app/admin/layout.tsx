"use client";
import React, { ReactNode, useState } from 'react'
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

const layout : React.FC<{children : ReactNode}> = ( { children }) => {

    const pathname = usePathname();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }


  return (
    <div>
      <Header toggleSidebar={toggleSidebar} isAdmiRole/>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} activeLink={pathname}>
         <main className='bg-gray-100 min-h-[calc(100vh-82px)]'>
            {children}
         </main>
      </Sidebar>
    </div>
  );
}

export default layout