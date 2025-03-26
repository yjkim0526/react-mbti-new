import { useState } from 'react';
import Question from './Question';
import Result from './Result';
import { questions_mbti } from '../data/questions';

function Test() {
  // MBTI 테스트 관련 상태 관리
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mbtiResult, setMbtiResult] = useState({
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  
  // MBTI 결과 계산 함수
  const calculateMBTI = () => {
    const result = [];
    result.push(mbtiResult.E > mbtiResult.I ? 'E' : 'I');
    result.push(mbtiResult.S > mbtiResult.N ? 'S' : 'N');
    result.push(mbtiResult.T > mbtiResult.F ? 'T' : 'F');
    result.push(mbtiResult.J > mbtiResult.P ? 'J' : 'P');
    return result.join('');
  };

  // 답변 처리 함수
  const handleAnswer = (answer) => {
    // MBTI 점수 계산 및 다음 질문으로 이동
    const questionType = questions_mbti[currentQuestion];
    const score = answer === "그렇다" ? questionType.YES : questionType.NO;
    
    setMbtiResult(prev => ({
      ...prev,
      [score]: prev[score] + 1
    }));

    setAnswers(prev => [...prev, answer]);

    // 마지막 질문인 경우 결과 화면으로 전환
    if (currentQuestion === questions_mbti.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // 이전 질문으로 돌아가기
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // 마지막 답변 제거
      const lastAnswer = answers[answers.length - 1];
      const lastQuestion = questions_mbti[currentQuestion - 1];
      const lastScore = lastAnswer === "그렇다" ? lastQuestion.YES : lastQuestion.NO;
      
      setAnswers(prev => prev.slice(0, -1));
      setMbtiResult(prev => ({
        ...prev,
        [lastScore]: prev[lastScore] - 1
      }));
    }
  };

  // 테스트 다시 시작
  const handleReset = () => {
    setCurrentQuestion(0);
    setMbtiResult({
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    setShowResult(false);
    setAnswers([]);
  };

  return (
    <>
      {!showResult ? (
        <Question
          question={questions_mbti[currentQuestion].question}
          onAnswer={handleAnswer}
          progress={(currentQuestion + 1) / questions_mbti.length * 100}
          currentQuestion={currentQuestion}
          totalQuestions={questions_mbti.length}
          onPrevious={handlePrevious}
          onReset={handleReset}
        />
      ) : (
        <Result mbtiResult={calculateMBTI()} />
      )}
    </>
  );
}

export default Test; 