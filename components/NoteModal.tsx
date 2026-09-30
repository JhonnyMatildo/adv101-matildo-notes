'use client';

import React, { useState, useEffect } from 'react';
import { Note } from '@/types/note';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    existingNotes: Note[];
    onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

const PASTEL_COLORS = [
    '#e2d5f8', 
    '#d1f5ea', 
    '#dbeefe', 
    '#fef3c7', 
    '#ffe4e6', 
];

export const NoteModal: React.FC<NoteModalProps> = ({
    isOpen,
    onClose,
    existingNotes,
    onAddNote,
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(PASTEL_COLORS[0]);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
    if (!title.trim()) {
        setIsDuplicate(false);
        return;
    }
    const found = existingNotes.some(
        (n) => n.title.trim().toLowerCase() === title.trim().toLowerCase()
    );
    setIsDuplicate(found);
    }, [title, existingNotes]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        setError('Title is required');
        return;
    }
    if (isDuplicate) {
        setError('A note with this title already exists!');
        return;
    }

    onAddNote({ title, description, color: selectedColor });
    setTitle('');
    setDescription('');
    setError('');
    onClose();
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-[#24233e] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 text-slate-100">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="text-xl font-bold tracking-wide text-white">Create New Note</h2>
            <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
            >
            ✕
            </button>
        </div>

        {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Title
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => {
                setTitle(e.target.value);
                setError('');
                }}
                placeholder="e.g. Next.js Study Plan"
                className={`w-full bg-[#1a192e] border ${
                isDuplicate ? 'border-amber-400' : 'border-white/10 focus:border-indigo-400'
                } rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all`}
            />
            {isDuplicate && (
                <p className="text-amber-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                ⚠ A note with this title already exists
                </p>
            )}
            </div>

            <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Description
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write down your note details..."
                rows={4}
                className="w-full bg-[#1a192e] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-all resize-none"
            />
            </div>

            <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Card Color Accent
            </label>
            <div className="flex gap-3">
                {PASTEL_COLORS.map((c) => (
                <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-8 h-8 rounded-full transition-all transform ${
                    selectedColor === c ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-70 hover:opacity-100'
                    }`}
                />
                ))}
            </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/10"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isDuplicate}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isDuplicate
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                }`}
            >
                Add Note
            </button>
            </div>
        </form>
        </div>
    </div>
    );
};