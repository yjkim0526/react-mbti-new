import React from 'react';
import './Result.css';
import { type_result } from '../data/results';
import myImage2 from '../assets/icons8-tree-48.png'

function Result({ mbtiResult }) {
  // MBTI 결과에 해당하는 설명 찾기
  const resultData = type_result.find(item => item.type === mbtiResult);

  const handleRetryClick = () => {
    window.location.reload();
  };

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `나의 MBTI 결과는 ${mbtiResult} 입니다!`,
          description: `${resultData?.title}\n\n${resultData?.content}`,
          imageUrl: 'https://images.unsplash.com/photo-1740520949162-b0a74db3c973?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDkxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '테스트 하러가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    
    <div className="m-2 bg-white rounded-lg shadow-lg py-10 px-20 max-w-[800px] w-full gap-2 mx-auto min-h-[600px] flex flex-col ju
    ">
      <div className='flex justify-center items-center gap-2'>
        <h2 className="text-4xl font-bold ">당신의 MBTI는</h2>
      </div>
      
      <div className="text-3xl font-bold text-center text-green-500 mb-8">
        {mbtiResult}
      </div>
      <h3 className="text-3xl font-semibold text-center mb-4">
        {resultData?.title}
      </h3>
      <div 
        className="text-xl prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: resultData?.content }} 
      />
      <div className="flex justify-center gap-4">
        <button
          onClick={shareToKakao}
          className="px-6 py-3 bg-yellow-300 text-black rounded-full hover:bg-yellow-400 transition-colors"
        >
          카카오톡 공유하기
        </button>
        <button
          onClick={handleRetryClick}
          className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
        >
          다시 테스트하기
        </button>
      </div>
    </div>
  );
}

export default Result; 