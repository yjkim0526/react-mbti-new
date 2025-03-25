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

  const handleShareClick = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `당신의 MBTI는 ${mbtiResult}입니다!`,
          description: `${resultData?.title || ''} - MBTI 테스트 결과`,
          imageUrl: 'YOUR_IMAGE_URL', // 공유할 이미지 URL
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
          onClick={handleShareClick}
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