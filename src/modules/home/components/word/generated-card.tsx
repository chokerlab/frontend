"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@modules/home/store';
import React from 'react';
import 'animate.css';

export default function GeneratedCardPage() {
  const cards = useSelector((state: RootState) => state.generatedCards.cards);
  const [selected, setSelected] = React.useState(cards[0] || '');

  return (
    <>
      <div className="flex items-center mb-4 mt-6">
        <span className="text-[2rem] text-[#a78bfa] mr-2" style={{ fontFamily: 'serif' }}>“</span>
        <span className="font-bold text-[2rem] text-[#a78bfa] leading-tight">
          2. Choose Your Card
        </span>
      </div>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-wrap justify-center gap-4 mt-6 mb-10">
          {cards.map((text, idx) => (
            <div
              key={idx}
              onClick={() => setSelected(text)}
              className={`word-card px-7 py-3 rounded-xl cursor-pointer font-semibold text-lg transition-all shadow-sm border-2 flex items-center gap-3 min-w-[140px] relative
                ${selected === text
                  ? 'selected bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-400 animate-bounceIn scale-105'
                  : 'bg-[#f3f0ff] text-[#7c3aed] border-[#e9d5ff] hover:scale-105 hover:-translate-y-1'}
              `}
              style={{ borderWidth: 2, borderStyle: 'solid', willChange: 'transform, box-shadow' }}
            >
              <i className={`fa-solid fa-heart animate__animated ${selected === text ? 'animate__tada' : 'animate__pulse animate__infinite'} mr-1`} />
              {text}
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-2">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white sm:py-3 py-2 sm:px-7 px-4 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all sm:text-base text-sm"
            onClick={() => window.history.back()}
          >
            <i className="fa-solid fa-arrow-left"></i> Go Back
          </button>
          <button
            className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white sm:py-4 py-2 sm:px-10 px-4 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all sm:text-lg text-base animate__animated animate__tada"
            style={{ boxShadow: '0 4px 18px rgba(124,58,237,0.13)' }}
            onMouseEnter={e => e.currentTarget.classList.add('animate__pulse')}
            onMouseLeave={e => e.currentTarget.classList.remove('animate__pulse')}
            onClick={() => alert('Select Your Choker')}
          >
            <i className="fa-solid fa-gem"></i> Select Your Choker
          </button>
        </div>
        <style jsx>{`
          .word-card.selected {
            box-shadow: 0 4px 18px rgba(124,58,237,0.13), 0 0 16px #f472b6a0;
            font-size: 1.15rem;
            border: 2px solid #a78bfa;
            background: linear-gradient(90deg, #a78bfa 0%, #f472b6 100%);
            color: #fff;
            transform: scale(1.08);
          }
          .word-card.selected .fa-heart {
            color: #fff;
            text-shadow: 0 2px 8px #f472b6;
          }
          .word-card .fa-heart {
            color: #a78bfa;
            font-size: 1.1em;
            margin-right: 2px;
            transition: color 0.2s;
          }
        `}</style>
      </div>
    </>
  );
} 