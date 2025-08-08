"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button, Heading } from "@medusajs/ui";
import choker1 from "../../../../image/choker1.jpg";
import choker2 from "../../../../image/choker2.jpg";
import choker3 from "../../../../image/choker3.jpg";
import { useParams, useRouter } from "next/navigation";

const commonWords = ["Dominance", "Submission", "Masochism", "Pleasure", "Control", "Freedom", "Intensity", "Desire"];
const chokerImages = [choker1, choker2, choker3];
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

/*
Choker Design Workflow
Initial Screen (Design Now) -> Select Your Attribute -> Select Generated Words Cards
-> Select Choker Style -> Show Generated Choker
 */

const Hero = () => {
  const router = useRouter();
  // All States Management
  const [userInput, setUserInput] = useState('');
  const [selectedWord, setSelectedWord] = useState("");
  const [generatedCards, setGeneratedCards] = useState([]);
  const [selectedGeneratedCard, setSelectedGeneratedCard] = useState('');
  const [selectedChokerImage, setSelectedChokerImage] = useState<any>(null);
  const [generatedChokerImage, setGeneratedChokerImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [showGeneratedCards, setShowGeneratedCards] = useState(false);
  const [showChokerSelection, setShowChokerSelection] = useState(false);
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);

  // Ensure client-side rendering for random elements
  useEffect(() => {
    setIsClient(true);

  }, []);

  /*
  Button Handlers
   */
  // Initial Screen
  const params = useParams();
  const countryCode = params.countryCode;
  const handleDesignNowClick = () => {
    router.push(`/${countryCode}/customize/words`);
  };

  // Select Your Attribute
  const handleGenerateTextRequest = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/gpt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selected_word: selectedWord,
          user_input: userInput,
        }),
      });
      const data = await response.json();
      const textArray = data.message.split("\n").filter(Boolean);
      setShowGeneratedCards(true);
    } catch (error) {
    }
  };

  // Select Generated Words Cards
  const handleBackToSelectAttribute = () => {
    setShowGeneratedCards(false);
    setShowChokerSelection(true);
    setSelectedGeneratedCard('');
  };

  const handleNextStep4ChokerSelection = () => {
    if (!selectedGeneratedCard) {
      alert("Please select a generated text before proceeding.");
      return;
    }
    setShowGeneratedCards(false);
    setShowChokerSelection(true);
  };

  // Select Choker Style
  const handleBackToSelectCard = () => {
    setShowChokerSelection(false);
    setShowGeneratedCards(true);
    setSelectedChokerImage(null);
  };
  const handleChokerSelect = (image: any) => {
    setSelectedChokerImage(image);
  };
  const handleShowGeneratedImage = async () => {
    setIsLoadingImage(true);
    setShowChokerSelection(false);
    setShowGeneratedImage(true);
    try {


      let imageBase64 = null;
      if (selectedChokerImage) {
        try {
          // 获取图片的 src URL
          const imageSrc = selectedChokerImage.src || selectedChokerImage;

          // 如果是本地图片，需要转换为 base64
          if (typeof imageSrc === 'string' && imageSrc.startsWith('/')) {
            // 对于本地图片，我们需要通过 fetch 获取图片数据并转换为 base64

            const response = await fetch(imageSrc);
            const blob = await response.blob();
            // 使用 Promise 来转换 blob 为 base64
            imageBase64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result as string);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });

          } else {
            imageBase64 = imageSrc;
          }
        } catch (error) {

          // 如果转换失败，使用一个真实的测试图片
          imageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
        }
      }
      const response = await fetch(`${BACKEND_URL}/generate_images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: selectedGeneratedCard,
          image: imageBase64,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // 存储生成的图片 URL（如果 API 返回的话）
      if (data.imageUrl) {
        setGeneratedChokerImage(data.imageUrl);

      } else {

      }
    } catch (error) {

      // 即使出错也显示界面，但可以添加错误提示
    } finally {
      setIsLoadingImage(false);
    }
  };

  // Show Generated Choker
  const handleBackToSelectChoker = () => {
    setShowChokerSelection(true);
    setShowGeneratedImage(false);
    setSelectedChokerImage(null);
  };

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #f7f7fa 100%)' }}>

        {/* Initial Page */}
        {showInitialScreen && (
          <div
            className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6"
            style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #f7f7fa 100%)' }}
          >
            {/* Decorative Text Background */}
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ zIndex: -1 }}
            >
              {isClient && (
                <>
                  {/* First row */}
                  <span style={{ position: 'absolute', left: '5%', top: '15%', fontSize: '24px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(-8deg)', pointerEvents: 'none' }}>Bound but Free</span>
                  <span style={{ position: 'absolute', left: '25%', top: '12%', fontSize: '22px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(5deg)', pointerEvents: 'none' }}>Obey & Desire</span>
                  <span style={{ position: 'absolute', left: '45%', top: '18%', fontSize: '26px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(-3deg)', pointerEvents: 'none' }}>Yes, Mistress</span>
                  <span style={{ position: 'absolute', left: '65%', top: '10%', fontSize: '20px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(12deg)', pointerEvents: 'none' }}>Pain is Pleasure</span>
                  <span style={{ position: 'absolute', left: '85%', top: '16%', fontSize: '23px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(-6deg)', pointerEvents: 'none' }}>Submit with Style</span>
                  
                  {/* Second row */}
                  <span style={{ position: 'absolute', left: '15%', top: '35%', fontSize: '21px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(7deg)', pointerEvents: 'none' }}>Tied Up in You</span>
                  <span style={{ position: 'absolute', left: '35%', top: '32%', fontSize: '25px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(-4deg)', pointerEvents: 'none' }}>Sir, May I?</span>
                  <span style={{ position: 'absolute', left: '55%', top: '38%', fontSize: '22px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(9deg)', pointerEvents: 'none' }}>Bound but Free</span>
                  <span style={{ position: 'absolute', left: '75%', top: '35%', fontSize: '24px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(-2deg)', pointerEvents: 'none' }}>Obey & Desire</span>
                  <span style={{ position: 'absolute', left: '95%', top: '32%', fontSize: '20px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(15deg)', pointerEvents: 'none' }}>Yes, Mistress</span>
                  
                  {/* Third row */}
                  <span style={{ position: 'absolute', left: '8%', top: '55%', fontSize: '23px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(-10deg)', pointerEvents: 'none' }}>Pain is Pleasure</span>
                  <span style={{ position: 'absolute', left: '28%', top: '52%', fontSize: '27px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(3deg)', pointerEvents: 'none' }}>Submit with Style</span>
                  <span style={{ position: 'absolute', left: '48%', top: '58%', fontSize: '21px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(-7deg)', pointerEvents: 'none' }}>Tied Up in You</span>
                  <span style={{ position: 'absolute', left: '68%', top: '55%', fontSize: '24px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(6deg)', pointerEvents: 'none' }}>Sir, May I?</span>
                  <span style={{ position: 'absolute', left: '88%', top: '52%', fontSize: '22px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(-5deg)', pointerEvents: 'none' }}>Bound but Free</span>
                  
                  {/* Fourth row */}
                  <span style={{ position: 'absolute', left: '12%', top: '75%', fontSize: '25px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(8deg)', pointerEvents: 'none' }}>Obey & Desire</span>
                  <span style={{ position: 'absolute', left: '32%', top: '72%', fontSize: '20px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(-12deg)', pointerEvents: 'none' }}>Yes, Mistress</span>
                  <span style={{ position: 'absolute', left: '52%', top: '78%', fontSize: '23px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(4deg)', pointerEvents: 'none' }}>Pain is Pleasure</span>
                  <span style={{ position: 'absolute', left: '72%', top: '75%', fontSize: '26px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.8)', transform: 'rotate(-9deg)', pointerEvents: 'none' }}>Submit with Style</span>
                  <span style={{ position: 'absolute', left: '92%', top: '72%', fontSize: '22px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.75)', transform: 'rotate(11deg)', pointerEvents: 'none' }}>Tied Up in You</span>
                  
                  {/* Additional scattered elements */}
                  <span style={{ position: 'absolute', left: '40%', top: '8%', fontSize: '19px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.65)', transform: 'rotate(14deg)', pointerEvents: 'none' }}>Sir, May I?</span>
                  <span style={{ position: 'absolute', left: '60%', top: '25%', fontSize: '18px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.6)', transform: 'rotate(-15deg)', pointerEvents: 'none' }}>Bound but Free</span>
                  <span style={{ position: 'absolute', left: '20%', top: '45%', fontSize: '17px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.55)', transform: 'rotate(18deg)', pointerEvents: 'none' }}>Obey & Desire</span>
                  <span style={{ position: 'absolute', left: '80%', top: '48%', fontSize: '20px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(-8deg)', pointerEvents: 'none' }}>Yes, Mistress</span>
                  <span style={{ position: 'absolute', left: '5%', top: '65%', fontSize: '16px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(147, 51, 234, 0.5)', transform: 'rotate(20deg)', pointerEvents: 'none' }}>Pain is Pleasure</span>
                  <span style={{ position: 'absolute', left: '95%', top: '62%', fontSize: '19px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.65)', transform: 'rotate(-13deg)', pointerEvents: 'none' }}>Submit with Style</span>
                  <span style={{ position: 'absolute', left: '30%', top: '85%', fontSize: '18px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(139, 92, 246, 0.6)', transform: 'rotate(16deg)', pointerEvents: 'none' }}>Tied Up in You</span>
                  <span style={{ position: 'absolute', left: '70%', top: '88%', fontSize: '21px', fontFamily: "'Dancing Script', cursive, serif", color: 'rgba(168, 85, 247, 0.7)', transform: 'rotate(-11deg)', pointerEvents: 'none' }}>Sir, May I?</span>
                </>
              )}
            </div>
            
            <div className="w-full flex flex-col items-center justify-center py-24 min-h-[80vh]">
              <div className="flex flex-col items-center justify-center px-8 py-12 rounded-3xl shadow-xl bg-white bg-opacity-80" style={{ maxWidth: 480, width: '100%' }}>
                <img src="https://raw.githubusercontent.com/chokerlab/frontend/refs/heads/main/src/image/logo/no_background.jpg" alt="ChokerLab Logo" className="w-32 h-32 object-contain rounded-full mb-8" />
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 bg-clip-text text-transparent leading-tight">
                  Make Your Statement.<br className="block md:hidden" />
                  <span className="hidden md:inline"> </span>Wear Your Story.
                </h1>
                <p className="text-lg md:text-xl mb-10 text-center max-w-xl text-gray-400 leading-relaxed">
                  Craft your unique choker<br />
                  with AI-powered personalization.
                </p>
                <button
                  onClick={handleDesignNowClick}
                  className="py-3 px-10 rounded-lg font-bold text-lg text-white shadow-lg bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-200 transform hover:scale-105 hover:from-purple-500 hover:to-pink-500 focus:outline-none"
                  style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)' }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles mr-2 align-middle" style={{ fontSize: '1.5em', verticalAlign: 'middle' }}></i> Design Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Show Generated Image */}
        {showGeneratedImage && (
          <div className="mt-8">
            <Heading
              level="h2"
              className="text-2xl leading-8 text-ui-fg-subtle font-normal mb-4"
            >
              Your AI-Generated Choker Design
            </Heading>
            {isLoadingImage ? (
              <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Loading generated image...</p>
              </div>
            ) : generatedChokerImage ? (
              <Image
                src={generatedChokerImage}
                alt="AI Generated Choker"
                width={256}
                height={256}
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No image generated.</p>
              </div>
            )}
            <Button
              variant="secondary"
              onClick={handleBackToSelectChoker}
              className="bg-gray-500 text-white py-2 px-4 mt-4 rounded-lg"
            >
              Back to Choker Selection
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Hero;