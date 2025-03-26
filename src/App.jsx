import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Test from './components/Test'
import Result from './components/Result'
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
    <div className="flex flex-col min-h-screen">
      <header className="bg bg-green-600 text-white py-4 shadow-md rounded">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <img src={myImage} alt="로고" className="w-12 h-12" />
            <h1 className="text-3xl font-bold text-center ml-2">MBTI 테스트</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <Routes>
            {/* 메인 테스트 페이지 */}
            <Route path="/" element={<Test />} />
            
            {/* 테스트 결과 페이지 */}
            <Route path="/result/:mbtiResult" element={<SharedResult />} />
            
            {/* 404 페이지 */}
            <Route path="*" element={
              <div className="text-center py-10">
                <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
                <a href="/" className="text-blue-500 hover:underline mt-4 block">
                  테스트 다시하기
                </a>
              </div>
            } />
          </Routes>
        </div>
      </main>

      <footer className="bg-gray-500 text-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 MBTI 테스트. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
