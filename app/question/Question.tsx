import axios from "axios";
import React, { useEffect, useState } from "react";
const Question = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  useEffect(() => {
    fetchData();
  }, []);

  const getRandomItems = (array: any[], count: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://learnq-server-1.onrender.com/questions"
      );
      const data = response.data;
      let filteredQuestions = [];
      const urlParams = new URLSearchParams(window.location.search);
      const difficulty = urlParams.get("difficulty");

      if (difficulty && difficulty !== "Any") {
        filteredQuestions = data.filter(
          (question: any) => question["Difficulty Level"] === difficulty
        );
      } else {
        filteredQuestions = data;
      }
      const randomQuestions = getRandomItems(filteredQuestions, 4);

      setQuestions(randomQuestions);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setWarningMessage("");
  };
  console.log(questions);
  const handleNextQuestion = () => {
    if (selectedOption === null) {
      setWarningMessage(
        "Please select an option before moving to the next question."
      );
      return;
    } else {
      setWarningMessage(""); // Clear the warning message
    }

    if (selectedOption === questions[currentQuestionIndex]["Correct Option"]) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const MathExpression = ({ expression }: any) => {
    const parseExpression = (exp: any) => {
      // Create a dictionary for superscript characters
      const superscripts = {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
        "-": "⁻",
        "+": "⁺",
        "(": "⁽",
        ")": "⁾",
        n: "ⁿ",
      };
      return exp
        .replace(
          /\^(-?\d+|\(-?\d+\+[^\)]+\)|[a-z]\+?\d*)/g,
          (match: any, group: any) =>
            group
              .split("")
              .map((character: any) => superscripts[character] || character)
              .join("")
        )
        .replace(/\^/g, "")
        .replace(/\(n\+1\)/g, "⁽ⁿ⁺¹⁾")
        .replace(/\(n\+2\)/g, "⁽ⁿ⁺²⁾")
        .replace(/\./g, "*") // Replace . with multiplication sign
        .replace(/x/g, "x") // Replace x with x
        .replace(/y/g, "y"); // Replace y with y
    };

    return <span>{parseExpression(expression)}</span>;
  };
  const renderOptions = () => {
    const question = questions[currentQuestionIndex];
    return (
      <div>
        {Object.keys(question)
          .filter(
            (key) =>
              ![
                "Question",
                "Correct Option",
                "_id",
                "Difficulty Level",
                "Marks allocated",
              ].includes(key)
          )
          .map((key) => (
            <div key={key} className="mb-2">
              <input
                type="radio"
                id={key}
                name="options"
                value={key}
                checked={selectedOption === parseInt(key)}
                onChange={() => handleOptionSelect(parseInt(key))}
                className="mr-2"
              />
              <label
                htmlFor={key}
                className=" font-medium inline-block bg-white rounded-lg border border-gray-500 px-9 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <MathExpression key={key} expression={question[key]} />
              </label>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl mt-8 mb-8 border border-blue-500 border-9">
        {currentQuestionIndex < questions.length ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Question {currentQuestionIndex + 1}
            </h2>

            <h3 className="text-lg font-medium mb-6 text-center">
              <MathExpression
                expression={questions[currentQuestionIndex]["Question"]}
              />
            </h3>
            <div className="text-red-500 text-sm mt-2 mb-4">
              {warningMessage}
            </div>
            {renderOptions()}

            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block mx-auto"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Hi {name}</h1>
            <h2 className="text-xl font-bold mb-4 text-center">
              Quiz Completed!
            </h2>
            <p className="text-lg font-medium text-center">
              Your score: {score}
            </p>
            <p className="text-lg font-medium text-center">
              Your percentage: {(score / 4) * 100}%
            </p>
            <ul>
              {questions?.map((question: any, index: any) => (
                <li key={index} className="mb-4">
                  <p>
                    <strong>Question:</strong>
                    <MathExpression expression={question.Question} />
                  </p>
                  <p>
                    <strong>Options:</strong>
                    <ul>
                      {Object.keys(question)
                        .filter(
                          (key) =>
                            ![
                              "Question",
                              "Correct Option",
                              "_id",
                              "Marks allocated",
                              "Difficulty Level",
                            ].includes(key)
                        )
                        .map((key) => (
                          <li key={key}>
                            {key}:
                            <MathExpression expression={question[key]} />
                          </li>
                        ))}
                    </ul>
                  </p>
                  <p>
                    <strong>Correct Option:</strong>{" "}
                    {question["Correct Option"]}
                  </p>
                  <p>
                    <strong>Difficulty Level:</strong>{" "}
                    {question["Difficulty Level"]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
