'use client';

import React, { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { NoteItem } from '@/components/NoteItem';
import { NoteModal } from '@/components/NoteModal';
import { Header } from '@/components/Header';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Notes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('app_notes_v3');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        setNotes([]);
      }
    } else {
      setNotes([]);
    }
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage on updates
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('app_notes_v3', JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const handleAddNote = (newNoteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...newNoteData,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    };
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a192e] p-4 sm:p-8 flex justify-center items-center font-sans antialiased">
      <div className="bg-[#24233e] border border-white/10 rounded-[32px] w-full max-w-3xl p-6 sm:p-10 shadow-2xl relative min-h-[600px] flex flex-col justify-between">
        <div>
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Render all user created notes */}
            {filteredNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}

            {/* Red Floating Plus Card — ALWAYS VISIBLE regardless of note count */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#e11d48] hover:bg-[#f43f5e] rounded-3xl min-h-[180px] flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-xl group cursor-pointer border border-white/10"
              aria-label="Add new note"
            >
              <span className="text-white text-5xl font-light group-hover:scale-125 transition-transform">
                +
              </span>
              {notes.length === 0 && (
                <span className="text-xs font-semibold text-rose-100 mt-2 opacity-90">
                  Create your first note
                </span>
              )}
            </button>
          </div>
        </div>

        <footer className="pt-8 text-center text-[11px] text-slate-500 font-medium">
          DevNotes • Dark Workspace Board
        </footer>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingNotes={notes}
        onAddNote={handleAddNote}
      />
    </div>
  );
}