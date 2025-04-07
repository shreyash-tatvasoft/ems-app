import React, { ReactNode } from 'react'
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const layout : React.FC<{children : ReactNode}> = ( { children }) => {
  return (
    <div>
      <Header />
      <Sidebar>{children}</Sidebar>
    </div>
  );
}

export default layout