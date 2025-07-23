"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Heading } from "@medusajs/ui";
import choker1 from "../../../../image/choker1.jpg";
import choker2 from "../../../../image/choker2.jpg";
import choker3 from "../../../../image/choker3.jpg";
import testImage from "../../../../image/chokerresult.jpg";

const commonWords = ["Dominance", "Submission", "Masochism", "Pleasure", "Control", "Freedom", "Intensity", "Desire"];
const chokerImages = [choker1, choker2, choker3];

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
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
      const response = await fetch(`${backendUrl}/gpt`, {
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
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
      const response = await fetch(`${backendUrl}/generate_images`, {
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
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">

        {/* Initial Page */}
        {showInitialScreen && (
          <>
            <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
              Craft Your Unique Story with AI
            </Heading>
            <Heading level="h2" className="text-2xl leading-8 text-ui-fg-subtle font-normal">
              Let AI transform your words into art, engraved forever.
            </Heading>
            <Button
              variant="primary"
              onClick={handleDesignNowClick}
              className="mt-6 py-2 px-6 bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg text-white"
            >
              Design Now
            </Button>
          </>
        )}

        {/* Select BDSM Attributes & User Input */}
        {showAttributes && (
          <>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {commonWords.map((word) => (
                <span
                  key={word}
                  onClick={() => setSelectedWord(word)}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all 
                    ${selectedWord === word ? "bg-pink-600 text-white" : "bg-white text-gray-800"}
                    hover:bg-pink-500 hover:text-white shadow-md`}
                >
                  {word}
                </span>
              ))}
            </div>

            {selectedWord && (
              <div className="mt-4 text-sm text-pink-500">
                Selected Word: <span className="font-bold">{selectedWord}</span>
              </div>
            )}

            <div className="mt-6 w-full max-w-md">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your custom text..."
                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 text-center focus:outline-none shadow-md"
              />
            </div>

            <Button
              variant="primary"
              onClick={handleGenerateTextRequest}
              className="w-full max-w-md mt-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg text-white"
              disabled={!selectedWord || !userInput}
            >
              Generate My Choker Text
            </Button>
          </>
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