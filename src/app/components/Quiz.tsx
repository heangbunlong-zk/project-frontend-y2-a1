"use client";

import React, { useState } from "react";

type QuizProps = {
  title: string;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
};

export default function Quiz({ title, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">{title}</h2>

      {showScore ? (
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-600">
            You scored {score} out of {questions.length}
          </p>
          <button
            onClick={resetQuiz}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1}/{questions.length}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-gray-800">
              {questions[currentQuestion].question}
            </h3>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleAnswerClick(
                    index === questions[currentQuestion].correctAnswer
                  )
                }
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-left hover:bg-indigo-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
