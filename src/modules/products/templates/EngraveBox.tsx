"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";

type EngraveBoxProps = {
  images: HttpTypes.StoreProductImage[];
};

const EngraveBox: React.FC<EngraveBoxProps> = ({ images }) => {
  const [engraveText, setEngraveText] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedGeneratedCard');
      if (saved) setEngraveText(saved);
    }
  }, []);

  const mainImage = images && images.length > 0 ? images[0].url : undefined;

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[540px] w-full mx-auto">
        {mainImage && (
          <div className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle rounded-2xl mb-6">
            <Image
              src={mainImage}
              alt="Choker preview"
              fill
              className="absolute inset-0 rounded-2xl object-cover"
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            />
          </div>
        )}
      </div>
      <div className="mt-6 w-full max-w-[540px] bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-200">
        <label htmlFor="choker-engrave-text" className="block text-base font-semibold text-gray-800 mb-3 w-full text-left tracking-wide">
          Preview or play with your text below,<br />
          then hit the button to see your choker’s new vibe!
        </label>
        <input
          id="choker-engrave-text"
          type="text"
          maxLength={20}
          placeholder="Type your text here..."
          className="w-full mb-6 px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg text-gray-700 transition-all shadow-sm placeholder-gray-400"
          value={engraveText}
          onChange={e => setEngraveText(e.target.value)}
        />
        <button
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold text-lg shadow-md hover:bg-gray-800 transition-all tracking-wide"
          style={{marginTop: 0}}
        >
          Finalize Your Design
        </button>
      </div>
    </div>
  );
};

export default EngraveBox; 