<img src="https://github.com/user-attachments/assets/dd7db452-4a2b-43ec-b2f3-082f2097e3a2" width="2557px"/>


## 💡 프로젝트 소개
우리 곁에서 항상 머무르는 한글, 

많이 사용하는 만큼, 소중함을 잊기도 쉬운데요.

한글날을 맞이하여 나의 책장을 만들어 방명록과 책거리를 받아보세요 !

다른사람의 책장에 책거리를 장식하여 나의 마음을 전하세요 !
<br/><br/>

▶ 서비스 바로가기: https://andchill.netlify.app 
</br>

- 누적 사용자 : 약 100명

${\bf{\color{gray}PC와\ 모바일에서\ 모두\ 사용할\ 수\ 있도록\ 반응형을\ 고려하여\ 제작되었습니다.}}$

<br/>

## 📝 주요 기능
### ✅ 랜딩 페이지
- `와글와글2 시작하겠소` 버튼 클릭시, 로그인 되어 있다면 본인의 책장 페이지 (`bookshelf/:id`)로 이동하고, 로그인하지 않았다면 로그인 페이지(`/login`) 페이지로 이동합니다.

- `세종대왕님께 감사인사 전하오` 버튼 클릭 시, 세종 대왕님의 책장(`bookshelf/sejong`)으로 이동합니다.
- `다른 책장 추천 받겠소` 버튼 클릭시, 현재 생성된 책장 목록 중 공개 여부가 공개인 책장들 중 3개가 랜덤으로 조회됩니다.
    - 사용자의 연타로 인한 과한 데이터 패칭을 방지하기 위해 `lodash` 라이브러리를 이용하여 쓰로틀링을 적용했습니다.
  
### [ PC ]

PC로 접속했을 경우, 세 개의 섹션으로 나누어 스크롤 슬라이딩 애니메이션 구현하였습니다.

마우스로 스크롤 했을 때 자동으로 해당 섹션의 위치로 슬라이딩 되고, 상단의 헤더를 통해 로그인 여부를 확인할 수 있습니다.

<img src="https://github.com/user-attachments/assets/567f237b-4126-4988-93d9-c6a86452bd02" width="90%"/>

### [ Tablet ]

타블렛과 모바일에서는 하단 섹션이 있다는 것을 인지하지 못할 것을 고려해, 스크롤 유도 아이콘 및 애니메이션을 넣어주었습니다.

<img src="https://github.com/user-attachments/assets/6d90841a-18cd-42e0-93f5-b2b376acce93" width="40%"/>

### [ Mobile ]

<img src="https://github.com/user-attachments/assets/ae053892-a83c-4d4e-986a-58dff3a48341" width="30%"/>

---

### ✅ 로그인
구글, 카카오 OAuth를 이용하여 로그인 기능을 구현했습니다.

로그인한 이후, 신규 회원이면 `/setup` 페이지로 이동하여 기본적인 책장 설정을 할 수 있도록 유도하고, 기존에 이미 책장을 가지고 있던 유저라면 `bookshelf/:id`로 이동할 수 있도록 설정했습니다.

### [ 기존 유저 ]
<img src="https://github.com/user-attachments/assets/b105ab05-c347-490e-b317-b1e4ad5050bc" width="90%"/>

### [ 신규 유저 ]
<img src="https://github.com/user-attachments/assets/1602848f-a24d-4499-863c-8fb3f452e1a9" width="90%"/>

---

### ✅ 유저 정보 작성
신규 회원은 닉네임과 공개여부를 설정할 수 있습니다.

회원 정보 설정 이후에는, 기본값으로 생성되는 본인의 책장 페이지(`/bookshelf/:id`)로 리다이렉트 되고, 그 곳에서 추가 설정 여부를 묻는 팝업을 통해 책장 설정을 변경할 수 있습니다.

### [ PC ]
<img src="https://github.com/user-attachments/assets/29bd6f85-f71e-4546-87da-eb76e9968a64" width="90%"/>

### [ Mobile ]
<p align="start">  
  <img src="https://github.com/user-attachments/assets/8bb9813a-75b6-434a-bfc8-4ccf4fc895fd" align="center" width="24%">  
  <img src="https://github.com/user-attachments/assets/43db3e2e-9a0f-4ddb-912f-efb94dc1e736" align="center" width="24%">  
  <img src="https://github.com/user-attachments/assets/a220a6ff-b711-427c-ba4b-19305e6fc8ac" align="center" width="24%">  
  <img src="https://github.com/user-attachments/assets/d69d8196-c11a-47a6-a4d1-89aa37976e37" align="center" width="24%">  
</p>

---

### ✅ 책장 조회
내가 받은 책장과 방명록을 확인할 수 있는 페이지입니다.

기본적으로 가로 스크롤을 지원하고 있으며, 목록을 확인한 후 요소를 클릭하면 방문자가 남긴 방명록을 확인할 수 있습니다.

책장의 소유자가 책장을 `밤` 으로 설정했을 경우 책장과 관련된 인터페이스의 색상이 다크 모드로 변경됩니다.

책장 주인은 다른 사람이 남긴 방명록이 맘에 들지 않을 때 방명록을 삭제할 수 있습니다.
### [ PC ]

<img src="https://github.com/user-attachments/assets/105f4f73-c6f8-43b0-9b2f-8e4b65af1ec3" width="90%"/>

### [ Mobile ]

<img src="https://github.com/user-attachments/assets/29d24a9c-4577-4f33-9caa-d1d0911ac9b2" width="30%"/>

---

### ✅ 책장 정보 수정
한 번 설정한 책장 정보를 변경할 수 있습니다.  책장의 배경 사진부터 공개 여부, 소개글 등 책장과 관련된 모든 설정을 확인하고 변경하는 페이지 입니다.

- 책장 소개글
    
    : 100자 이하의 한글만 입력 가능하도록 상단의 세종 대왕 아이콘 옆에 유효성 검증 결과가 표시됩니다. 현재 책장 소개글과 같아도 버튼이 비활성화되어 불필요한 데이터 패칭을 방지합니다.
    
- 공개 여부와 낮과 밤
    
    : 공개 여부와 낮과 밤 (책장 테마)를 변경할 수 있습니다. 이때 사용자가 고의적으로 데이터 패칭을 반복적으로 요청해도 일정 시간에 한 번씩만 요청 되도록 각 각 쓰로틀링과 디바운스를 적용해주어 서버의 부담을 줄였습니다.

### [ PC ]

<img src="https://github.com/user-attachments/assets/86d7ec71-1355-408a-998b-6cac933af7bf" width="90%"/>

### [ Mobile ]

<img src="https://github.com/user-attachments/assets/64213ccc-bb40-4c9d-afb3-8c7b11ce134d" width="30%"/>

---

### ✅ 내가 보낸, 받은 방명록 조회
내가 보낸, 받은 방명록들을 조회할 수 있습니다.

무한 스크롤로 데이터 패칭을 나눠서 요청하고 있으며, 방명록을 클릭했을 때 세부 내용 확인이 가능한 `/bookshelf/book/:id` 페이지로 이동하게 됩니다.

### [ PC ]

<img src="https://github.com/user-attachments/assets/744b7ace-3e32-4bf8-80ad-804dcbf295ff" width="90%"/>

### [ Mobile ]

<img src="https://github.com/user-attachments/assets/1f3601d3-f162-4e35-99e9-1421248ef19f" width="30%"/>

---

### ✅ 방명록 생성
방명록은 크게 `소`, `대` 로 나누어져 있습니다. 소를 선택하면 정사각형의 책장, 대는 직사각형의 책장으로 시작하게 된다. 빈 책장으로 시작한 사용자는 이후 과정을 따라가며 본인만의 책장으로 꾸밀 수 있습니다.

1. 책장 꾸미기 & 방명록 글 작성하기
    
    : 다양한 스티커를 자유롭게 활용하여 책장을 꾸밀 수 있습니다. 이후 방명록 글 작성을 통해 (한글만 사용 가능) 내용을 채울 수 있습니다.
    
2. 작성자 닉네임 정하기
    
    : 방명록을 남길 때는 본인의 닉네임이 아닌 이름으로 남길 수 있습니다. 닉네임을 정하기 어렵다면 랜덤 닉네임을 통해 닉네임을 추천 받을 수 있습니다.
    
3. 공개 여부 설정하기
    
    : 작성한 방명록을 작성자와 책장 주인만 확인할 수 있게 하고 싶다면 공개 여부를 따로 설정해줄 수 있습니다. 이때 비회원의 경우 공개 여부만 선택할 수 있습니다.
    
${\bf{\color{gray}방명록\ 생성\ 중\ 닫기\ 아이콘을\ 누를\ 경우,\ 정말\ 나갈\ 것인지에\ 대한\ 모달\ 창이\ 뜹니다.}}$

### [ PC ]

<img src="https://github.com/user-attachments/assets/3b78828c-a911-4d1f-a4d4-686cb4914dbf" width="90%"/>

### [ Mobile ]

<img src="https://github.com/user-attachments/assets/fd80c4e1-b8b2-45fb-9857-3873897c048b" width="30%"/>

---

### ✅ 방명록 공유
서비스의 특성 상, 많은 방명록을 받고 싶다면 링크를 통해서 책장 링크를 주고 받아야하기 때문에 두 가지 방식으로 공유할 수 있도록 했습니다. 

나의 책장 페이지에서 `내 책장 널리 알리기` 버튼을 통해 링크를 복사할 것인지, 카카오톡을 통해 공유할 것인지 선택할 수 있습니다.

### [ PC ]

<img src="https://github.com/user-attachments/assets/b1ccc5dd-835a-4fdf-82d8-6237af57173c" width="90%"/>

### [ Mobile ]

<img src="https://github.com/user-attachments/assets/056f273c-de1e-4b6b-b921-ec18c3271a26" width="30%"/>

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
