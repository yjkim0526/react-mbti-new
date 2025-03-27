import React from 'react';
import { type_result } from '../data/results';
import { useNavigate } from 'react-router-dom';

const domainUrl = "http://react.koiforever.p-e.kr/"
function Result({ mbtiResult }) {
  const navigate = useNavigate();
  const resultData = type_result.find(item => item.type === mbtiResult);
  console.log(">>resultData:", resultData);
  const handleRetryClick = () => {
    window.location.reload();
  };

  const shareToKakao = () => {
    if (window.Kakao) {
      const shareUrl = `${window.location.origin}/result/${mbtiResult}`;
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `나의 MBTI 결과는 ${mbtiResult} 입니다!`,
          description: `${resultData?.title}\n${resultData?.content}`.slice(0, 200) + '...',
          imageUrl: '',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '결과 확인하기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    }
  };


  return (
    
    <div className="m-2 bg-white rounded-lg shadow-lg py-10 px-1 md:px-20 max-w-[800px] w-full gap-2 mx-auto min-h-[600px] flex flex-col ju
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
        className="p-2 text-xl prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: resultData?.content }} 
      />
      <div className="flex flex-col md:flex-row justify-center gap-2">
        <button
          onClick={shareToKakao}
          className="px-6 py-3 bg-yellow-300 text-black rounded-full hover:bg-yellow-400 transition-colors w-64 mx-auto"
        >
          카카오톡 공유하기
        </button>
        <button
          onClick={handleRetryClick}
          className="px-6 py-3 bg-slate-400 text-white rounded-full hover:bg-slate-500 transition-colors w-64 mx-auto"
        >
          다시 테스트하기
        </button>
      </div>

    </div>
  );
}

export default Result; 