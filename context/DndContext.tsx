'use client';

import { DndContext, DndContextProps } from '@dnd-kit/core'
import { ReactNode } from 'react';

const DndProvider: React.FC<DndContextProps> = ({ children, ...props }) => {
  return (
    <DndContext {...props}>
      {children}
    </DndContext>
  );
};

export default DndProvider;