# CREATE_SNS_Project :: SNS FULL STACK 구현

## 프로젝트 소개

<p align="justify">
SNS 웹페이지 풀스택 구현 프로젝트
</p>

### Web URL

[SNS 사이트 바로가기](http://chanhopj.com/)

## 기술 스택

<div align=center>

<h1>📚 STACKS</h1>

<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-Saga-764ABC?style=for-the-badge&logo=Redux-Saga&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Immer-00E7C3?style=for-the-badge&logo=Immer&logoColor=white">
  <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=Passport&logoColor=black">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon AWS-FF9900?style=for-the-badge&logo=Amazon AWS&logoColor=black">
  <br>
</div>
</div>

## Preview

<div align=center>

<h3>Preview1</h3>

![preview1](https://user-images.githubusercontent.com/105937460/190849325-b3e2715a-cf25-4611-bf9f-411a4ac8cd35.gif)![preview2](https://user-images.githubusercontent.com/105937460/190849415-68d6deb9-f81d-4e08-8444-b9d11a53892d.gif)

<h3>Preview2</h3>

![preview2](https://user-images.githubusercontent.com/105937460/190849415-68d6deb9-f81d-4e08-8444-b9d11a53892d.gif){: width="100%" height="100%"}

<h3>Preview3</h3>

![preview3](https://user-images.githubusercontent.com/105937460/190849432-cc58aab7-6e9b-426e-bcd4-7b8dec3256b1.gif){: width="100%" height="100%"}

<h3>Preview4</h3>

![preview4](https://user-images.githubusercontent.com/105937460/190849451-c66c7a4a-4e31-4125-a35d-b1b764faed03.gif){: width="100%" height="100%"}

</div>

## 업데이트 예정

1. 팔로잉 게시글만 불러오기 구현

2. 게시글 신고 기능 구현

3. 댓글 수정 & 삭제 구현

4. 좋아요 게시글 목록 구현

5. 닉네임 검색 기능 구현

6. 프로필 이미지 구현

7. 상태메세지 구현

8. 메세지 기능 구현

## 수정 예정

<p>[ 버그 내용 ] -> [ 수정_날짜 ]</p>

## History

## Web Service Func \_ ~2022/09/15

1. 게시글 수정 구현

## Web Service [ AWS ] \_ ~2022/09/15

1. Let'sEncrypt 인증서 발급 및 cron 이용 자동 갱신 적용

2. 프론트서버 nginx + https 적용

3. 백엔드서버 https 적용

## Distribute Web Service [ AWS ] \_ ~2022/09/14

1. EC2 생성 및 노드, MySQL, pm2 환경 구성

2. 프론트 서버, 백엔드 서버 배포

3. 도메인 연결 \_ 가비아 구매

4. 이미지 저장 \_ S3 연결

5. 이미지 리사이징 \_ Lambda

## ServerSideRendering Complete \_ 2022/09/08

1. 디자인 최종 수정

2. 시퀄라이즈 최신 문법 적용

3. immer 확장 (익스플로러11)

## ServerSideRendering Setting \_ ~2022/09/07

1. 사용자 게시글, 해시태그 게시글 불러오기 구현

2. getStaticPaths 적용

3. Profile Page swr 적용

4. 해시태그 검색기능 추가

5. Moment 라이브러리 이용 -> 게시글 작성일 표시

6. 커스텀 웹팩 작성 및 빌드 하기

7. 디자인 수정

## ServerSideRendering Setting \_ 2022/08/30

1. getStaticProps 이용 about 페이지 생성
2. 다이나믹 라우팅 적용
3. css ssr 적용

## ServerSideRendering Setting \_ 2022/08/28 ~ 2022/08/29

- 버그로 인해 28일 작업 초기화후 다시 진행

1. SSR 사전 setting
2. SSR시 쿠키 공유하기

## 서버 5차 구현 \_ 2022/08/27

1. 리트윗 기능 구현
2. Fix: 게시글 삭제시 화면 적용 안됨 문제 수정(직접 리렌더링을 해야 적용)

- commit: "Feat: Implement Retweet"

3. Fix: 게시글 스크롤 이벤트 'lastId' 적용
4. Implement CSR Server
5. Create: "Implement CSR SERVER"

## 서버 5차 구현 \_ 2022/08/26

1. MySQL schema 수정
2. 프로필 페이지 팔로우, 언팔로우 목록 제공

- commit: "Fix: Bug fixes and profile page updates"

3. 게시글 이미지 업로드 구현 - 이미지 선택, 미리보기 및 제거 기능 제공

- commit: "Feat: Implement image upload"

4. 해시태그 등록 구현 - db 연동

- commit: "Implement hashtag registration"

## 서버 4차 구현 \_ 2022/08/23

1. 팔로우, 언팔로우 기능 구현
2. 로그아웃 버그 수정 (Axios error)

## 서버 3차 구현 \_ 2022/08/20

1. 리렌더링시 로그인 정보 불러오기 구현
2. 게시글 좋아요 기능 구현
3. 게시글 제거 기능 구현
4. 닉네임 변경 기능 추가

## 서버 2차 구현 \_ 2022/08/19

1. 실제 게시글 작성 구현 게시글 작성 -> DB
2. 실제 댓글 작성 구현.
3. credentials로 쿠기 공유하기.
4. fatch: 미들웨어로 라우터 검사 추가.

## 서버 1차 구현 및 DB 구현 \_ 2022/08/18

1. MySQL 이용 데이터 베이스 구현 \_ Sequelize 사용하여 관계형 모델 생성
2. CORS 해결
3. 회원가입 구현
4. 로그인 & 로그아웃 구현
5. 로직 최적화

## Front-End 1차 구현 \_ 2022/08/17 (완)

### 랜딩 페이지 & 프로필 페이지

<img src="./readmeImg/220817/page.png">

<br>

### 회원가입 페이지

<img src="./readmeImg/220817/signup.png">
<br>

1. 회원가입페이지 구현
2. 인풋 커스텀훅 작성

<br>

### 게시글 작성 & 댓글 작성

<img src="./readmeImg/220817/post.png">
<br>

1. 게시글 구현
2. 댓글 구현
3. 이미지 구현
4. 이미지 캐루셀 구현
5. 게시글 해시태그 링크 구현
6. 인피니트 스크롤링 구현
7. 팔로우, 언팔로우 구현

## 추가 필요 개선 사항
