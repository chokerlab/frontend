"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@modules/home/store';
import React from 'react';

export default function GeneratedCardPage() {
  const cards = useSelector((state: RootState) => state.generatedCards.cards);
  const [selected, setSelected] = React.useState(cards[0] || '');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {cards.map((text, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(text)}
            className={`px-4 py-2 rounded-lg cursor-pointer text-center transition-all 
              ${selected === text ? "bg-pink-600 text-white" : "bg-indigo-700 text-white"}
              hover:bg-pink-500 shadow-md`}
            style={{ minWidth: 120 }}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex gap-6 mt-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white py-3 px-7 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all text-base"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i> Go Back
        </button>
        <button
          className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white py-3 px-8 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all text-base"
          onClick={() => alert('Select Your Choker')}
        >
          <i className="fa-solid fa-gem"></i> Select Your Choker
        </button>
      </div>
    </div>
  );
} 