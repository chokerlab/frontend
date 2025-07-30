"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";

type EngraveBoxProps = {
  images: HttpTypes.StoreProductImage[];
  imageUrl?: string;
};

const EngraveBox: React.FC<EngraveBoxProps> = ({ images, imageUrl }) => {
  const [engraveText, setEngraveText] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedGeneratedCard');
      if (saved) setEngraveText(saved);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

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
          onClick={async () => {
            setShowModal(true);
            setLoading(true);
            setResultImage(null);
            try {
              const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
              const response = await fetch(`${BACKEND_URL}/generate_images`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: engraveText, imageUrl }),
              });
              const data = await response.json();
              setResultImage(data.imageUrl);
            } catch (error) {
              setResultImage(null);
            } finally {
              setLoading(false);
            }
          }}
        >
          Finalize Your Design
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(10, 10, 20, 0.72)',
            backdropFilter: 'blur(14px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #fff 80%, #f3f3fa 100%)',
              borderRadius: 48,
              boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.22)',
              padding: window.innerWidth <= 768 ? 40 : 64,
              minWidth: window.innerWidth <= 768 ? 320 : 520,
              minHeight: window.innerWidth <= 768 ? 420 : 520,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              // no border
            }}
          >
            {/* Premium close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: window.innerWidth <= 768 ? 20 : 28,
                right: window.innerWidth <= 768 ? 20 : 28,
                background: 'rgba(255,255,255,0.7)',
                border: 'none',
                borderRadius: '50%',
                width: window.innerWidth <= 768 ? 44 : 54,
                height: window.innerWidth <= 768 ? 44 : 54,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                transition: 'background 0.2s',
                backdropFilter: 'blur(2px)',
              }}
              aria-label="Close"
            >
              <svg width={window.innerWidth <= 768 ? 22 : 28} height={window.innerWidth <= 768 ? 22 : 28} viewBox="0 0 18 18">
                <line x1="4" y1="4" x2="14" y2="14" stroke="#444" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="14" y1="4" x2="4" y2="14" stroke="#444" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
            {loading ? (
              <>
                <div style={{margin: window.innerWidth <= 768 ? '60px 0 32px 0' : '100px 0 48px 0'}}>
                  <span className="loader" style={{
                    display: 'inline-block',
                    width: window.innerWidth <= 768 ? 70 : 90,
                    height: window.innerWidth <= 768 ? 70 : 90,
                    border: window.innerWidth <= 768 ? '8px solid #e6e6ef' : '10px solid #e6e6ef',
                    borderTop: window.innerWidth <= 768 ? '8px solid #b7b7e6' : '10px solid #b7b7e6',
                    borderRadius: '50%',
                    animation: 'spin 1.3s cubic-bezier(.68,-0.55,.27,1.55) infinite'
                  }} />
                </div>
                <div style={{
                  color: '#23223a',
                  fontSize: window.innerWidth <= 768 ? 22 : 28,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textAlign: 'center',
                  fontFamily: 'inherit',
                  opacity: 0.92,
                  marginBottom: 12
                }}>
                  Creating your luxury choker...
                </div>
              </>
            ) : resultImage ? (
              <>
                <div style={{
                  background: 'rgba(255,255,255,0.98)',
                  borderRadius: 32,
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.13)',
                  padding: window.innerWidth <= 768 ? 16 : 24,
                  marginBottom: window.innerWidth <= 768 ? 24 : 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={resultImage}
                    alt="Generated"
                    style={{
                      maxWidth: window.innerWidth <= 768 ? 280 : 400,
                      maxHeight: window.innerWidth <= 768 ? 280 : 400,
                      borderRadius: 24,
                      boxShadow: '0 6px 32px rgba(0,0,0,0.13)',
                      border: '8px solid #fff',
                    }}
                  />
                </div>
                <div style={{
                  color: '#3a2e4f',
                  fontSize: window.innerWidth <= 768 ? 22 : 28,
                  fontWeight: 800,
                  marginBottom: 8,
                  textAlign: 'center',
                  fontFamily: `'Playfair Display', 'Georgia', 'Times New Roman', serif`,
                  letterSpacing: 0.5,
                  lineHeight: 1.35,
                  textShadow: '0 2px 8px rgba(58,46,79,0.07)'
                }}>
                  Try wearing this choker.<br/>Make it yours today!
                </div>
              </>
            ) : (
              <>
                <div style={{
                  color: '#b00',
                  fontSize: window.innerWidth <= 768 ? 20 : 24,
                  fontWeight: 600,
                  margin: window.innerWidth <= 768 ? '60px 0 32px 0' : '100px 0 48px 0',
                  textAlign: 'center',
                  fontFamily: 'inherit',
                }}>
                  Failed to generate image.
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// loader 动画 keyframes
if (typeof window !== 'undefined') {
  if (!document.getElementById('modal-spin-keyframes')) {
    const style = document.createElement('style');
    style.id = 'modal-spin-keyframes';
    style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`;
    document.head.appendChild(style);
  }
}

export default EngraveBox; 