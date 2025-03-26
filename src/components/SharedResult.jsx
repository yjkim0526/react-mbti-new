import { useParams } from 'react-router-dom';
import { mbtiData } from '../data/mbtiData';

function SharedResult() {
  const { mbtiResult } = useParams();
  const resultData = mbtiData[mbtiResult];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-[800px] w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        MBTI 결과: {mbtiResult}
      </h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">{resultData?.title}</h3>
        <p className="text-gray-700 leading-relaxed">
          {resultData?.content}
        </p>
      </div>

      <div className="text-center">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          테스트 하러가기
        </a>
      </div>
    </div>
  );
}

export default SharedResult; 