'use client';

import React from 'react';

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
}) => {
    return (
    <div className="space-y-6 mb-8">
        <div className="relative max-w-xs">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
            +
        </span>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search note"
            className="w-full bg-[#333256] text-slate-100 placeholder-slate-400 text-xs rounded-2xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 border border-white/5"
        />
        </div>

        <div className="flex gap-8 border-b border-white/10 text-xs font-bold">
        {['Notes', 'Lists', 'Recordings'].map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors relative ${
                activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            >
            {tab}
            {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-full" />
            )}
            </button>
        ))}
        </div>
    </div>
    );
};