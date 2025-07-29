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
      <div className="mt-6 w-full max-w-[540px] bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <label htmlFor="choker-engrave-text" className="block text-base font-medium text-gray-700 mb-2 w-full text-left">
          Preview or edit your text below, then click the button to see it on your choker.
        </label>
        <input
          id="choker-engrave-text"
          type="text"
          maxLength={20}
          placeholder="Type your text here..."
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-lg"
          value={engraveText}
          onChange={e => setEngraveText(e.target.value)}
        />
        <button
          className="w-full py-3 bg-black text-white rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors"
          style={{marginTop: 0}}
        >
          Finalize Your Design
        </button>
      </div>
    </div>
  );
};

export default EngraveBox; 