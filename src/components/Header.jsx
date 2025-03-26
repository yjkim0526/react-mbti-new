import myImage from '../assets/icons8-tree-80.png'

function Header() {
  return (
    <header className="bg bg-green-600 text-white py-4 shadow-md rounded">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <img src={myImage} alt="로고" className="w-12 h-12" />
          <h1 className="text-3xl font-bold text-center ml-2">MBTI 테스트</h1>
        </div>
      </div>
    </header>
  );
}

export default Header; 