import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Test from './components/Test'
import SharedResult from './components/SharedResult'
import Header from './components/Header'
import Footer from './components/Footer'
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

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

      <Footer />
    </div>
  );
}

export default App;
