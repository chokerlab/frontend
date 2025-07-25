"use client";
import React, { useState } from "react";

export default function GeneratedCardPage() {
  // 示例数据，实际可用props或全局状态管理
  const [generatedCards] = useState(["Love You, Quris"]);
  const [selectedGeneratedCard, setSelectedGeneratedCard] = useState("Love You, Quris");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {generatedCards.map((text, index) => (
          <div
            key={index}
            onClick={() => setSelectedGeneratedCard(text)}
            className={`px-4 py-2 rounded-lg cursor-pointer text-center transition-all 
              ${selectedGeneratedCard === text ? "bg-pink-600 text-white" : "bg-indigo-700 text-white"}
              hover:bg-pink-500 shadow-md`}
            style={{ minWidth: 120 }}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg font-semibold shadow-md"
          onClick={() => alert('Select Your Choker')}
        >
          Select Your Choker
        </button>
      </div>
    </div>
  );
} 