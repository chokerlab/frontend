"use client"

import { useState } from "react"

const SoftOpeningBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            {/* Elegant icon */}
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Main text */}
            <div className="text-center">
              <span className="text-amber-800 font-medium text-sm tracking-wide">
                Soft Opening
              </span>
              <span className="text-amber-600 text-xs ml-2">
                Limited availability
              </span>
            </div>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors duration-200"
          aria-label="Close banner"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SoftOpeningBanner 