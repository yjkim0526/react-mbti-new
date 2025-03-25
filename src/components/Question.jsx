import React from 'react';
import './Question.css';
import myImage2 from '../assets/icons8-tree-48.png'

function Question({ question, onAnswer, progress, currentQuestion, totalQuestions, onPrevious, onReset }) {
  return (
    <div className="question-container bg-white rounded-lg shadow-lg py-10 px-14 max-w-[800px] w-full mx-auto min-h-[500px] flex flex-col">
      
      <div className='flex gap-2 items-center mb-8'>
        <h1 className="text-2xl font-bold ">MBTI 테스트</h1>
        <div className='items-center'><img src={myImage2} alt="icon image" width={24} height={24} /></div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span className="font-bold">{Math.round(progress)}%</span>
          <span className="font-bold"> {currentQuestion + 1} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="progress-bar-fill bg-green-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center text-center mt-4">
        <h2 className="text-2xl min-h-[96px] font-bold">
          {question}
        </h2>
       
        <button
          onClick={() => onAnswer("그렇다")}
          className="answer-button w-60 bg-green-500 text-white rounded-full text-lg py-3 font-bold"
        >
          그렇다
        </button>
        <button
          onClick={() => onAnswer("아니다")}
          className="answer-button w-60 bg-green-500 text-white rounded-full text-lg py-3 font-bold"
        >
          아니다
        </button>

        <div className="flex justify-between w-full mt-8">
          {currentQuestion > 0 ? (
            <button
              onClick={onPrevious}
              className="answer-button px-6 bg-gray-500 text-white rounded-full text-lg py-2"
            >
              이전으로
            </button>
          ) : (
            <div></div>
          )}
          {currentQuestion > 0 ? (
            <button
              onClick={onReset}
              className="answer-button px-6 bg-gray-500 text-white rounded-full text-lg py-2"
            >
              다시하기
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Question; 