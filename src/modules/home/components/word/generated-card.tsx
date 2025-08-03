"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@modules/home/store';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import 'animate.css';

export default function GeneratedCardPage() {
  const cards = useSelector((state: RootState) => state.generatedCards.cards);
  const [selected, setSelected] = React.useState(cards[0] || '');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const params = useParams();
  const countryCode = params.countryCode;

  // Ensure client-side rendering for random elements
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate background text elements from cards
  const generateBackgroundTexts = () => {
    if (!isClient || !cards.length) return null;

    const backgroundTexts: React.JSX.Element[] = [];
    const positions = [
      // First row
      { left: '5%', top: '15%', fontSize: '24px', rotation: -8 },
      { left: '25%', top: '12%', fontSize: '22px', rotation: 5 },
      { left: '45%', top: '18%', fontSize: '26px', rotation: -3 },
      { left: '65%', top: '10%', fontSize: '20px', rotation: 12 },
      { left: '85%', top: '16%', fontSize: '23px', rotation: -6 },
      
      // Second row
      { left: '15%', top: '35%', fontSize: '21px', rotation: 7 },
      { left: '35%', top: '32%', fontSize: '25px', rotation: -4 },
      { left: '55%', top: '38%', fontSize: '22px', rotation: 9 },
      { left: '75%', top: '35%', fontSize: '24px', rotation: -2 },
      { left: '95%', top: '32%', fontSize: '20px', rotation: 15 },
      
      // Third row
      { left: '8%', top: '55%', fontSize: '23px', rotation: -10 },
      { left: '28%', top: '52%', fontSize: '27px', rotation: 3 },
      { left: '48%', top: '58%', fontSize: '21px', rotation: -7 },
      { left: '68%', top: '55%', fontSize: '24px', rotation: 6 },
      { left: '88%', top: '52%', fontSize: '22px', rotation: -5 },
      
      // Fourth row
      { left: '12%', top: '75%', fontSize: '25px', rotation: 8 },
      { left: '32%', top: '72%', fontSize: '20px', rotation: -12 },
      { left: '52%', top: '78%', fontSize: '23px', rotation: 4 },
      { left: '72%', top: '75%', fontSize: '26px', rotation: -9 },
      { left: '92%', top: '72%', fontSize: '22px', rotation: 11 },
      
      // Additional scattered elements
      { left: '40%', top: '8%', fontSize: '19px', rotation: 14 },
      { left: '60%', top: '25%', fontSize: '18px', rotation: -15 },
      { left: '20%', top: '45%', fontSize: '17px', rotation: 18 },
      { left: '80%', top: '48%', fontSize: '20px', rotation: -8 },
      { left: '5%', top: '65%', fontSize: '16px', rotation: 20 },
      { left: '95%', top: '62%', fontSize: '19px', rotation: -13 },
      { left: '30%', top: '85%', fontSize: '18px', rotation: 16 },
      { left: '70%', top: '88%', fontSize: '21px', rotation: -11 },
    ];

    const colors = [
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(147, 51, 234, 0.75)',
      'rgba(168, 85, 247, 0.7)',
    ];

    positions.forEach((pos, index) => {
      const cardText = cards[index % cards.length];
      const color = colors[index % colors.length];
      
      backgroundTexts.push(
        <span
          key={`bg-${index}`}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            fontSize: pos.fontSize,
            fontFamily: "'Dancing Script', cursive, serif",
            color: color,
            transform: `rotate(${pos.rotation}deg)`,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          {cardText}
        </span>
      );
    });

    return backgroundTexts;
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Text Layer */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {generateBackgroundTexts()}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center mb-4 mt-6">
          <span className="text-[2rem] text-[#a78bfa] mr-2" style={{ fontFamily: 'serif' }}>"</span>
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
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('selectedGeneratedCard', selected);
                }
                router.push(`/${countryCode}/store`)
              }}
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
      </div>
    </div>
  );
} 