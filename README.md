# MBTI 테스트 웹 애플리케이션

## 프로젝트 소개
이 프로젝트는 React를 사용하여 만든 MBTI 성격유형 테스트웹 입니다. 
자신의 MBTI 유형을 확인할 수 있으며, 결과를 카카오톡으로 공유할 수 있습니다.

## 주요 기능
- MBTI 성격유형 테스트 진행
- 테스트 결과 확인
- 카카오톡 공유 기능

## 기술 스택
- React
- React Router
- Tailwind CSS
- Kakao Share API

## 설치 및 실행 방법

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm start
```

## 환경 설정
카카오톡 공유 기능을 사용하기 위해서는 Kakao Developers에서 
애플리케이션을 등록하고 JavaScript 키를 발급받아야 합니다.
.env 파일을 생성후 등록 해야 합니다. (VITE_KAKAO_API_KEY=카카오발급키)