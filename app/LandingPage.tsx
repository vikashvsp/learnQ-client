import React, { useEffect, useState } from "react";
import Link from "next/link";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState("");
  const [isDisabledName, setIsDisabledName] = useState(true);
  const [isDisabledDiff, setIsDisabledDiff] = useState(true);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
    setError("");
    setIsDisabledName(false);
  };

  const handleDifficultyChange = (e: any) => {
    setDifficulty(e.target.value);
    setError("");
    setIsDisabledDiff(false);
  };

  const handleStartQuiz = () => {
    if (!name || !difficulty) {
      setError("Please enter your name and select difficulty");
      return;
    }
    console.log(`Starting quiz for ${name} with difficulty ${difficulty}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <h1 className="text-4xl font-bold mb-8 text-black-600">Quiz App</h1>
      <div className="w-full max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Quiz Setup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Any">Any</option>
          </select>
        </div>
        {!isDisabledDiff && !isDisabledName ? (
          <Link href={{ pathname: "/question", query: { name, difficulty } }}>
            <div
              onClick={handleStartQuiz}
              className="w-full flex justify-center items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Start Quiz
            </div>
          </Link>
        ) : (
          <div className="w-full flex justify-center items-center px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
            Start Quiz
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
