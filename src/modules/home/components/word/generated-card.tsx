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
    return null;
    // if (!isClient || !cards.length) return null;

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
        {/* Header */}
        <div className="flex items-center justify-center mb-4 mt-6">
          <span className="text-[2rem] text-[#a78bfa] mr-2" style={{ fontFamily: 'serif' }}>"</span>
          <span className="font-bold text-[2rem] text-[#a78bfa] leading-tight">
            2. Choose Your Card
          </span>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[#9ca3af] text-sm">Swipe to see more</span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d1d5db]"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
            {cards.map((text, idx) => (
              <div
                key={idx}
                onClick={() => setSelected(text)}
                className={`card-item px-4 py-4 rounded-2xl cursor-pointer font-semibold text-sm transition-all shadow-sm border-2 flex items-center justify-center text-center min-h-[80px] relative
                  ${selected === text
                    ? 'selected bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-400 animate-bounceIn scale-105'
                    : 'bg-white text-[#7c3aed] border-[#e9d5ff] hover:scale-105 hover:-translate-y-1 hover:border-[#a78bfa]'}
                `}
                style={{ borderWidth: 2, borderStyle: 'solid', willChange: 'transform, box-shadow' }}
              >
                <div className="card-text font-semibold leading-tight">
                  {text}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full max-w-md">
            <button
              className="flex-1 bg-white hover:bg-gray-50 text-[#6b7280] border-2 border-[#e5e7eb] hover:border-[#a78bfa] hover:text-[#7c3aed] py-4 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 transition-all text-base"
              onClick={() => window.history.back()}
            >
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all text-base animate__animated animate__tada"
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
              <i className="fa-solid fa-gem"></i> Continue
            </button>
          </div>
        </div>

        <style jsx>{`
          .card-item.selected {
            box-shadow: 0 8px 25px rgba(124,58,237,0.3);
            font-size: 1.1rem;
            border: 2px solid #7c3aed;
            background: linear-gradient(135deg, #a78bfa 0%, #f472b6 100%);
            color: #fff;
            transform: scale(1.02);
          }
          
          .card-item.selected .card-text {
            color: #fff;
          }
          
          .card-item .card-text {
            color: #7c3aed;
            transition: color 0.2s;
          }
          
          .card-item:hover {
            box-shadow: 0 8px 25px rgba(124, 58, 237, 0.15);
          }
          
          /* Animation for cards */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .card-item {
            animation: fadeInUp 0.6s ease forwards;
          }
          
          .card-item:nth-child(1) { animation-delay: 0.1s; }
          .card-item:nth-child(2) { animation-delay: 0.2s; }
          .card-item:nth-child(3) { animation-delay: 0.3s; }
          .card-item:nth-child(4) { animation-delay: 0.4s; }
          .card-item:nth-child(5) { animation-delay: 0.5s; }
          .card-item:nth-child(6) { animation-delay: 0.6s; }
          .card-item:nth-child(7) { animation-delay: 0.7s; }
          .card-item:nth-child(8) { animation-delay: 0.8s; }
          .card-item:nth-child(9) { animation-delay: 0.9s; }
          .card-item:nth-child(10) { animation-delay: 1s; }
          
          /* Responsive adjustments */
          @media (max-width: 360px) {
            .card-item {
              min-height: 70px;
              font-size: 0.875rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
} 