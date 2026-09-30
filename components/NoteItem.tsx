'use client';

import React, { useState } from 'react';
import { Note } from '@/types/note';

interface NoteItemProps {
    note: Note;
    onDelete: (id: string) => void;
    onUpdate: (updatedNote: Note) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title);
    const [editDescription, setEditDescription] = useState(note.description);

    const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate({
        ...note,
        title: editTitle,
        description: editDescription,
    });
    setIsEditing(false);
    };

    return (
    <div
        style={{ backgroundColor: note.color }}
        className="rounded-3xl p-6 min-h-[180px] flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 text-slate-900 group relative overflow-hidden"
    >
        {isEditing ? (
        <div className="space-y-3">
            <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-white/80 border border-slate-900/10 rounded-xl px-3 py-1.5 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-slate-800 text-base"
            placeholder="Title"
            />
            <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={3}
            className="w-full bg-white/80 border border-slate-900/10 rounded-xl px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-slate-800 resize-none"
            placeholder="Description..."
            />
            <div className="flex justify-end gap-2 pt-1">
            <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-xs font-semibold bg-slate-900/10 text-slate-800 rounded-lg hover:bg-slate-900/20"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="px-3 py-1 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
                Save
            </button>
            </div>
        </div>
        ) : (
        <>
            <div>
            <h3 className="font-extrabold text-lg text-slate-900 tracking-tight line-clamp-1 mb-2">
                {note.title}
            </h3>
            <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap line-clamp-4 font-medium">
                {note.description || <span className="italic text-slate-500">No description...</span>}
            </p>
            </div>

            <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-900/10 text-[11px] font-semibold text-slate-600">
            <span>{note.createdAt}</span>
            <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                onClick={() => setIsEditing(true)}
                className="hover:text-slate-950 font-bold px-1.5 py-0.5 rounded hover:bg-black/5"
                >
                Edit
                </button>
                <button
                onClick={() => onDelete(note.id)}
                className="hover:text-rose-700 font-bold px-1.5 py-0.5 rounded hover:bg-black/5"
                >
                Delete
                </button>
            </div>
            </div>
        </>
        )}
    </div>
    );
};