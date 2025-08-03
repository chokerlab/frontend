"use client";
import React, { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCards } from '@modules/home/store/generatedCardsSlice';

const commonWords = [
  "Dominance",
  "Submission",
  "Masochism",
  "Pleasure",
  "Control",
  "Freedom",
  "Intensity",
  "Desire",
];

export default function PageWords() {
  const [selectedWord, setSelectedWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const router = useRouter();
  const params = useParams();
  const countryCode = params.countryCode;
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

  const handleGenerate = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/gpt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selected_word: selectedWord,
          user_input: userInput,
        }),
      });
      const data = await response.json();
      const textString = data.message;
      
      // Parse the string into an array by splitting on numbered lines and removing numbers
      const textArray = textString
        .split('\n')
        .filter((line: string) => line.trim() !== '')
        .map((line: string) => {
          // Remove the number and dot at the beginning (e.g., "1. " or "10. ")
          let cleanedLine = line.replace(/^\d+\.\s*/, '').trim();
          // Remove outer double quotes if they exist
          if (cleanedLine.startsWith('"') && cleanedLine.endsWith('"')) {
            cleanedLine = cleanedLine.slice(1, -1);
          }
          return cleanedLine;
        });
      
      console.log("tongzhan - textArray:", textArray);
      dispatch(setCards(textArray));
      router.push(`/${countryCode}/customize/generated-card`);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-white bg-opacity-90 rounded-3xl shadow-xl px-8 py-10 mt-16">
      <div className="flex items-center gap-3 mb-8 w-full">
        <i className="fa-solid fa-quote-left text-3xl text-[#7c3aed]"></i>
        <span className="text-2xl md:text-3xl font-extrabold text-[#7c3aed]">1. Choose Your Vibe & Input Your Words</span>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
        {commonWords.map((word) => (
          <span
            key={word}
            onClick={() => setSelectedWord(word)}
            className={`px-7 py-3 rounded-xl cursor-pointer font-semibold text-lg transition-all shadow-sm border-2
              ${selectedWord === word
                ? "bg-[#ede9fe] border-[#a78bfa] text-[#7c3aed] font-bold"
                : "bg-[#f3f0ff] border-[#e9d5ff] text-[#a78bfa] hover:bg-[#ede9fe] hover:border-[#a78bfa] hover:text-[#7c3aed]"}
            `}
            style={{ minWidth: 120, textAlign: 'center' }}
          >
            {word}
          </span>
        ))}
      </div>
      <div className="w-full mb-7 relative">
        <i className="fa-solid fa-pen absolute left-4 top-1/2 -translate-y-1/2 text-[#a78bfa] text-lg"></i>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your custom text..."
          className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#f9fafb] text-gray-800 text-base border-2 border-[#e5e7eb] focus:border-[#a78bfa] focus:shadow-lg outline-none transition-all"
          style={{ boxShadow: '0 2px 8px rgba(124,58,237,0.03)' }}
        />
      </div>
      <button
        className="w-full py-3 rounded-lg font-bold text-lg text-white shadow-lg bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:from-purple-500 hover:to-pink-500 focus:outline-none"
        style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)' }}
        disabled={!selectedWord || !userInput}
        onClick={handleGenerate}
      >
        <i className="fa-solid fa-wand-magic-sparkles"></i> Generate My Choker Text
      </button>
    </div>
  );
} 