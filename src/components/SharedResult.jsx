import { useParams } from 'react-router-dom';
import { type_result } from '../data/results';

function SharedResult() {
  const { mbtiResult } = useParams();
  console.log(">>mbtiResult:", mbtiResult);
  const resultData = type_result.find(item => item.type === mbtiResult);

  if (!resultData) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">잘못된 MBTI 결과입니다</h1>
        <a href="/" className="text-blue-500 hover:underline mt-4 block">
          테스트 다시하기
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-[800px] w-full mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        MBTI 결과: {mbtiResult}
      </h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 text-center">{resultData.title}</h3>
        <div 
          className="text-gray-800 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: resultData.content }}
        />
      </div>

      <div className="text-center">
        <a
          href="/"
          className="inline-block bg-slate-500 text-white px-6 py-2 rounded-full hover:bg-slate-600 transition-colors"
        >
          테스트 하러가기
        </a>
      </div>
    </div>
  );
}

export default SharedResult; 