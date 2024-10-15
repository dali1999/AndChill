<p align="middle" >
  <img src="https://github.com/user-attachments/assets/1686293b-35a6-4e4e-9587-61cdc90575dd" width="50%"/>
</p>
<h1 align="middle">AndChill</h1>
<h3 align="middle">오늘 영화 뭐 볼래?</h3>

<br/>

## 📝 프로젝트 소개
AndChill은 영화와 인물들의 세부 정보를 손쉽게 검색하고 조회할 수 있는 서비스를 제공합니다.<br/> 
또한, 랜덤 영화 카드를 뽑는 기능을 통해 사용자에게 새로운 영화를 발견하는 즐거움을 선사하며, 다양한 장르와 작품을 탐색할 수 있는 기회를 제공합니다.

<br/>

API: [TMDb API](https://developer.themoviedb.org/docs/getting-started)

<br/>

## 📝 주요 기능

### ✅ 홈
홈 페이지에 접속하면 가장 먼저 선택한 국가의 개봉 예정 영화 목록을 한눈에 확인할 수 있으며, 이번 주 글로벌 트렌드를 반영한 인기 영화들과 함께 다양한 장르의 영화 리스트를 탐색할 수 있습니다.
<img src="https://github.com/user-attachments/assets/3dd2b1b0-6e14-40d6-9263-3911b2944402" width="100%"/>

### ✅ 탐색
탐색 페이지에서는 국가와 장르별로 영화를 세부적으로 필터링할 수 있으며, 인기순, 평점순, 최신순 등 다양한 기준으로 영화를 정렬할 수 있습니다. 탐색 결과 리스트는 무한 스크롤 형식으로 조회할 수 있습니다.
<img src="https://github.com/user-attachments/assets/7b634920-7d97-421c-8f37-35547199565c" width="100%"/>

### ✅ 랜덤 영화
셔플 버튼을 눌러 6장의 영화 카드를 무작위로 뽑을 수 있으며, 각 카드를 뒤집어 영화의 세부 정보를 확인할 수 있습니다. 현재 선택된 카드 덱과 공개된 카드는 로컬 스토리지에 저장되어, 다른 페이지로 이동했다 돌아와도 이전 상태를 그대로 유지할 수 있습니다.
<img src="https://github.com/user-attachments/assets/e77c5da7-f049-4aac-b5bf-ab39d81e70b6" width="100%"/>

### ✅ 검색 결과
검색어를 입력하면, 영화, 영화 시리즈, 인물 이렇게 세 가지 카테고리로 분류되어 결과가 표시됩니다. 사용자가 검색한 키워드의 결과가 존재하는 카테고리가 우선적으로 표시되어, 더 빠르고 직관적으로 원하는 정보를 확인할 수 있습니다.
<img src="https://github.com/user-attachments/assets/90666542-43de-4855-a6c6-614ca35dc6ac" width="100%"/>

### ✅ 영화 상세 정보
영화의 장르, 내용, 평점, 출연진, 제작비 등 다양한 세부 정보들을 확인할 수 있습니다. 또한, 예고편과 이미지 같은 미디어 콘텐츠도 함께 제공되며, 유사한 영화 목록을 통해 더 많은 작품을 탐색할 수 있습니다.
<img src="https://github.com/user-attachments/assets/30a71e19-d754-459a-bd9f-eccae90c0b51" width="100%"/>

### ✅ 인물 상세 정보
해당 인물이 연기나 제작에 참여한 영화들의 필모그래피를 확인할 수 있으며, 각각의 영화에서 어떤 역할로 참여했는지도 상세히 볼 수 있습니다.
<img src="https://github.com/user-attachments/assets/d1ffc6e5-feca-4d2f-b9cb-3c97b32c4f0a" width="100%"/>

### ✅ 시리즈 정보
영화 상세 정보 페이지나 검색 결과를 통해 특정 영화 시리즈 페이지로 이동할 수 있습니다. 이 페이지에서는 시리즈에 포함된 모든 영화의 정보를 확인할 수 있으며, 시리즈 중 평점이 가장 높은 영화도 함께 볼 수 있습니다.
<img src="https://github.com/user-attachments/assets/b09cc6a4-29b4-4460-946c-827e33cbddb0" width="100%"/>

### ✅ 14개 다국어 지원
i18Next를 활용하여 14개 언어를 지원하는 다국어 기능을 제공합니다.
<img src="https://github.com/user-attachments/assets/ea6e716a-2e0b-4ea9-8622-d16461f062c3" width="100%"/>

</br>
</br>

## ✨ 기술 스택
<p align='left'>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=ffffff" alt='react'> 
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff" alt='typescript'>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=ffffff" alt='styled-components'>
  <br/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=ffffff" alt='react-query'>
  <img src="https://img.shields.io/badge/Zustand-F0BA47?style=for-the-badge&logoColor=ffffff" alt='zustand'>
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=ffffff" alt='react-router'>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff" alt='vite'>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff" alt='axios'>
</p>
