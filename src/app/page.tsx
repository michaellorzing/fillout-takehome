'use client';
import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PageItem } from './components/PageItem';
import { AddPageButton } from './components/AddPageButton';

import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/400-italic.css';

export type FormPage = {
  id: string;
  name: string;
  msg: string;
};

export default function Home() {
  const [pages, setPages] = useState<FormPage[]>([
    { id: '1', name: 'Info', msg: 'Thanks for reviewing my work!' },
    {
      id: '2',
      name: 'Details',
      msg: 'The app is built using Next, Tailwind, Typescript, a neat slider library, and a lightweight menu package.',
    },
    {
      id: '3',
      name: 'Other',
      msg: 'Building fun stuff like this is my passion',
    },
    { id: '4', name: 'Ending', msg: 'Hope to hear your feedback!' },
  ]);
  const [activePageId, setActivePageId] = useState<string | null>('1');

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over.id);
      setPages((pages) => arrayMove(pages, oldIndex, newIndex));
    }
  };

  const handleAddPage = (index: number) => {
    const newPage = {
      id: uuidv4(),
      name: `Page ${pages.length + 1}`,
      msg: 'Would be a pleasure to work on your team!',
    };
    const updated = [
      ...pages.slice(0, index + 1),
      newPage,
      ...pages.slice(index + 1),
    ];
    setPages(updated);
  };

  const handlePageItemClick = (id: string) => {
    setActivePageId(id);
  };

  return (
    <>
      <nav className='w-full bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={pages.map((p) => p.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className='flex items-center justify-center'>
                {pages.map((page, index) => (
                  <React.Fragment key={page.id}>
                    <PageItem
                      page={page}
                      active={page.id === activePageId}
                      handleItemClick={handlePageItemClick}
                    />
                    {index !== pages.length - 1 && (
                      <AddPageButton onClick={() => handleAddPage(index)} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </nav>

      <main className='max-w-4xl mx-auto p-8'>
        <div className='p-6 bg-white shadow rounded'>
          <p className='text-gray-600'>
            <strong>{pages.find((p) => p.id === activePageId)?.msg}</strong>
          </p>
        </div>
      </main>
    </>
  );
}
