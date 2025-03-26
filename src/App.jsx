import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Test from './components/Test'
import SharedResult from './components/SharedResult'
import { questions_mbti } from './data/questions'
import './App.css'
import myImage from './assets/icons8-tree-80.png'

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

function App() {
  // Kakao SDK 초기화
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY);
    }
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [mbtiResult, setMbtiResult] = useState({
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  })
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState([])

  const handleAnswer = (answer) => {
    const question = questions_mbti[currentQuestion]
    const mbtiType = answer === "그렇다" ? question.YES : question.NO
    
    setMbtiResult(prev => ({
      ...prev,
      [mbtiType]: prev[mbtiType] + 1
    }))

    if (currentQuestion < questions_mbti.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // 최종 MBTI 결과 계산
      const finalType = [
        mbtiResult.E > mbtiResult.I ? 'E' : 'I',
        mbtiResult.S > mbtiResult.N ? 'S' : 'N',
        mbtiResult.T > mbtiResult.F ? 'T' : 'F',
        mbtiResult.J > mbtiResult.P ? 'J' : 'P'
      ].join('')
      
      setMbtiResult(finalType)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // 이전 답변도 제거
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setMbtiResult({
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    });
    setShowResult(false);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center gap-2">
        <img className='ml-2' src={myImage} alt="icon image" width={50} height={50} />
        <h1 className="text-2xl font-bold">MBTI Test</h1>
      </header>

      {/* Main content */}
      <main className="m-2 flex-1 flex flex-col items-center pt-8">
        <Routes>
          <Route path="/" element={<Test 
            currentQuestion={currentQuestion}
            handleAnswer={handleAnswer}
            handlePrevious={handlePrevious}
            showResult={showResult}
            mbtiResult={mbtiResult}
          />} />
          <Route path="/result/:mbtiResult" element={<SharedResult />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 p-4 text-center">
        <p>© 2025 MBTI Test. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
