"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { HttpTypes } from "@medusajs/types";
import { addToCart } from "@lib/data/cart";
import { useParams } from "next/navigation";
import { useCartStatus } from "@lib/hooks/use-cart-status";
import Toast from "@modules/common/components/toast";

type EngraveBoxProps = {
  images: HttpTypes.StoreProductImage[];
  imageUrl?: string;
  product?: HttpTypes.StoreProduct;
};

const EngraveBox: React.FC<EngraveBoxProps> = ({ images, imageUrl, product }) => {


  const [engraveText, setEngraveText] = useState("");
  const params = useParams();
  const countryCode = params.countryCode as string;
  const { cartEnabled } = useCartStatus();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedGeneratedCard');
      if (saved) setEngraveText(saved);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info"; isVisible: boolean }>({
    message: "",
    type: "info",
    isVisible: false,
  });




  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images && images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe && images && images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // 键盘导航
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (images && images.length > 1) {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }
  }, [images]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAddToCart = async () => {
    if (!product?.variants?.[0]?.id) return;

    setIsAddingToCart(true);
    try {
      await addToCart({
        variantId: product.variants[0].id,
        quantity: 1,
        countryCode,
      });
      setToast({
        message: "Successfully added to cart! 🛒",
        type: "success",
        isVisible: true,
      });
    } catch (error) {
      setToast({
        message: "Failed to add to cart. Please try again.",
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    if (images && images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (images && images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };



  return (
    <div className="flex flex-col items-center">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
      {/* 图片轮播组件 */}
      {images && images.length > 0 && images[currentImageIndex]?.url && (
        <div className="max-w-[540px] w-full mx-auto mb-6">
          <div
            ref={containerRef}
            className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 主图片 */}
            <div className="relative w-full h-full">
              <Image
                src={images[currentImageIndex].url}
                alt={`Choker preview ${currentImageIndex + 1}`}
                fill
                className="absolute inset-0 rounded-2xl object-cover transition-transform duration-300 ease-in-out"
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                priority={currentImageIndex <= 2}
              />
            </div>

            {/* 导航按钮 */}
            {images.length > 1 && (
              <>
                {/* 上一张按钮 */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* 下一张按钮 */}
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* 图片计数器 */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>


              </>
            )}

            {/* 指示器 */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          {/* 缩略图导航 */}
          {images.length > 1 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {images.filter(image => image.url).map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'border-blue-500 scale-105'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  aria-label={`Thumbnail ${index + 1}`}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 w-full max-w-[540px] bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-200">
        <label htmlFor="choker-engrave-text" className="block text-base font-semibold text-gray-800 mb-3 w-full text-left tracking-wide">
          Play with your text below,<br />
          And see your choker's new vibe!
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
                  Creating your new choker...
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
                  marginBottom: 16,
                  textAlign: 'center',
                  fontFamily: `'Playfair Display', 'Georgia', 'Times New Roman', serif`,
                  letterSpacing: 0.5,
                  lineHeight: 1.35,
                  textShadow: '0 2px 8px rgba(58,46,79,0.07)'
                }}>
                  Make it yours today!
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !cartEnabled}
                  style={{
                    background: !cartEnabled ? '#ccc' : 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 16,
                    padding: window.innerWidth <= 768 ? '12px 24px' : '16px 32px',
                    fontSize: window.innerWidth <= 768 ? 16 : 18,
                    fontWeight: 600,
                    cursor: (isAddingToCart || !cartEnabled) ? 'not-allowed' : 'pointer',
                    opacity: (isAddingToCart || !cartEnabled) ? 0.7 : 1,
                    transition: 'all 0.2s ease',
                    boxShadow: !cartEnabled ? 'none' : '0 4px 16px rgba(167, 139, 250, 0.3)',
                    minWidth: window.innerWidth <= 768 ? 140 : 160,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isAddingToCart && cartEnabled) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(167, 139, 250, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAddingToCart && cartEnabled) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(167, 139, 250, 0.3)';
                    }
                  }}
                >
                  <i className="fa-solid fa-cart-plus"></i>
                  {isAddingToCart ? 'Adding...' : !cartEnabled ? 'Out of Stock' : 'Add to Cart'}
                </button>
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
                  <br />
                  Please try again~
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
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }

      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
  }
}

export default EngraveBox;
