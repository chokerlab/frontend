"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Heading } from "@medusajs/ui";
import choker1 from "../../../../image/choker1.jpg";
import choker2 from "../../../../image/choker2.jpg";
import choker3 from "../../../../image/choker3.jpg";

const commonWords = ["Dominance", "Submission", "Masochism", "Pleasure", "Control", "Freedom", "Intensity", "Desire"];
const chokerImages = [choker1, choker2, choker3];
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

/*
Choker Design Workflow
Initial Screen (Design Now) -> Select Your Attribute -> Select Generated Words Cards
-> Select Choker Style -> Show Generated Choker
 */

const Hero = () => {
  // All States Management
  const [userInput, setUserInput] = useState('');
  const [selectedWord, setSelectedWord] = useState("");
  const [generatedCards, setGeneratedCards] = useState([]);
  const [selectedGeneratedCard, setSelectedGeneratedCard] = useState('');
  const [selectedChokerImage, setSelectedChokerImage] = useState<any>(null);
  const [generatedChokerImage, setGeneratedChokerImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [showAttributes, setShowAttributes] = useState(false);
  const [showGeneratedCards, setShowGeneratedCards] = useState(false);
  const [showChokerSelection, setShowChokerSelection] = useState(false);
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);

  /*
  Button Handlers
   */
  // Initial Screen
  const handleDesignNowClick = () => {
    setShowInitialScreen(false);
    setShowAttributes(true);
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
      setShowAttributes(false);
      setGeneratedCards(textArray);
      setShowGeneratedCards(true);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  // Select Generated Words Cards
  const handleBackToSelectAttribute = () => {
    setShowGeneratedCards(false);
    setShowAttributes(true);
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
      console.log("Sending to generate_images API:", {
        text: selectedGeneratedCard,
        image: selectedChokerImage
      });

      let imageBase64 = null;
      if (selectedChokerImage) {
        try {
          // 获取图片的 src URL
          const imageSrc = selectedChokerImage.src || selectedChokerImage;
          console.log("Image src:", imageSrc);
          // 如果是本地图片，需要转换为 base64
          if (typeof imageSrc === 'string' && imageSrc.startsWith('/')) {
            // 对于本地图片，我们需要通过 fetch 获取图片数据并转换为 base64
            console.log("Local image detected, fetching and converting to base64");
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
            console.log("Converted image to base64, length:", imageBase64.length);
          } else {
            imageBase64 = imageSrc;
          }
        } catch (error) {
          console.error("Error processing image:", error);
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
      console.log("Response from generate_images API:", data);
      // 存储生成的图片 URL（如果 API 返回的话）
      if (data.imageUrl) {
        setGeneratedChokerImage(data.imageUrl);
        console.log("Generated image URL set:", data.imageUrl.substring(0, 50) + "...");
      } else {
        console.warn("No imageUrl in response:", data);
      }
    } catch (error) {
      console.error("Error generating choker image:", error);
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
          <div className="w-full flex flex-col items-center justify-center py-24 min-h-[80vh]">
            <div className="flex flex-col items-center justify-center px-8 py-12 rounded-3xl shadow-xl bg-white bg-opacity-80" style={{ maxWidth: 480, width: '100%' }}>
              <div className="mb-8">
                <img src="https://raw.githubusercontent.com/chokerlab/frontend/refs/heads/main/src/image/logo_with_bg.jpg" alt="ChokerLab Logo" className="w-32 h-32 object-contain rounded-full mb-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-purple-500 via-pink-400 to-pink-500 bg-clip-text text-transparent">
                Make Your Statement. Wear Your Story.
              </h1>
              <p className="text-lg md:text-xl mb-10 text-center max-w-xl text-gray-400">
                Design a choker that's as bold as you are — powered by AI, engraved with your vibe, and made for your style.
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
        )}

        {/* Select BDSM Attributes & User Input */}
        {showAttributes && (
          <div className="flex flex-col items-center w-full max-w-lg mx-auto bg-white bg-opacity-90 rounded-3xl shadow-xl px-8 py-10">
            <div className="flex items-center gap-3 mb-8 w-full">
              <i className="fa-solid fa-quote-left text-3xl text-[#7c3aed]"></i>
              <span className="text-2xl md:text-3xl font-extrabold text-[#7c3aed]">2. Choose Your Vibe & Input Your Words</span>
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
              onClick={handleGenerateTextRequest}
              className="w-full py-3 rounded-lg font-bold text-lg text-white shadow-lg bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:from-purple-500 hover:to-pink-500 focus:outline-none"
              style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)' }}
              disabled={!selectedWord || !userInput}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i> Generate My Choker Text
            </button>
          </div>
        )}

        {/* Show Generated Cards */}
        {showGeneratedCards && (
          <>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {generatedCards.map((text, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedGeneratedCard(text)}
                  className={`px-4 py-2 rounded-lg cursor-pointer text-center transition-all 
                    ${selectedGeneratedCard === text ? "bg-pink-600 text-white" : "bg-indigo-700 text-white"}
                    hover:bg-pink-500 shadow-md`}
                >
                  {text}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                variant="secondary"
                onClick={handleBackToSelectAttribute}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Go Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNextStep4ChokerSelection}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg"
              >
                Select Your Choker
              </Button>
            </div>
          </>
        )}

        {/* Select Choker Style */}
        {showChokerSelection && (
          <>
            <Heading
              level="h2"
              className="text-2xl leading-8 text-ui-fg-subtle font-normal mt-6"
            >
              Your Unique Choice:{" "}
              <span className="text-pink-500 font-bold">{selectedGeneratedCard}</span>
            </Heading>
            <Heading
              level="h2"
              className="text-2xl leading-8 text-ui-fg-subtle font-normal mt-4"
            >
              Select Your Choker Style
            </Heading>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {chokerImages.map((image, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-md cursor-pointer ${
                    selectedChokerImage === image ? "border-4 border-pink-500" : ""
                  }`}
                  onClick={() => handleChokerSelect(image)}
                >
                  <Image
                    src={image}
                    alt={`Choker ${index + 1}`}
                    width={256}
                    height={256}
                    className="object-cover rounded-lg hover:opacity-80"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              {/*Go Back*/}
              <Button
                variant="secondary"
                onClick={handleBackToSelectCard}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Go Back
              </Button>
              
              {/*Finalize Design*/}
              <Button
                variant="primary"
                onClick={handleShowGeneratedImage}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg"
                disabled={!selectedChokerImage}
              >
                Finalize Your Design
              </Button>
            </div>
          </>
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