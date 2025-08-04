# 🔖 PROJECT 8OOK-MARK "책갈피"

> 다양한 독서 생각들을 쌓아 마음의 양식으로 만드는 공간

**멋쟁이사자처럼 프론트엔드 부트캠프 14기 | 8조 - TEAM 8OOKMARK**

[![배포 링크](https://img.shields.io/badge/배포%20사이트-8ookmark.netlify.app-00C7B7?style=for-the-badge&logo=netlify)](https://8ookmark.netlify.app/)

![커버 이미지](/public/demo/cover.png)


## 📑 목차

- [프로젝트 개요](#-프로젝트-개요)
- [책갈피 팀 소개](#-책갈피-팀-소개)
- [프로젝트 설명](#-프로젝트-설명)
- [디자인](#-디자인)
- [참고 자료](#-참고-자료)

<br><br>


## 📜 프로젝트 개요

**책갈피 | 8OOKMARK**는 독서 기록과 공유 서비스를 지원하는 **반응형** 웹사이트입니다.

Fast API와 supabase로 단일 서버를 구축해 유저 정보 및 커뮤니티를 관리하며,<br>Aladin Open API에서 도서 목록을 받아와 도서 검색 후 기록을 남길 수 있게 제작하였습니다.

### 📅 프로젝트 기간
**2025년 7월 18일 ~ 2025년 8월 4일 (총 19일)**

### 🛠️ 개발 환경

| 분류                  | 사용 기술                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **프론트엔드**        | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)                                                                                                                           |
| **백엔드**            | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white) ![AladinAPI](https://img.shields.io/badge/AladinAPI-0059b3?style=flat&logo=bookstack&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)              |
| **빌드 도구**         | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)                                                                                                                                                                                                                                                                                                                              |
| **협업/디자인**       | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)                                 |
| **배포**              | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white) ![Render](https://img.shields.io/badge/Render-00979D?style=flat&logo=render&logoColor=white)                                                                                                                                                                                                                        |
| **패키지/라이브러리** | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat&logo=pnpm&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) ![Vanilla Calendar Pro](https://img.shields.io/badge/Vanilla--Calendar--Pro-FFB86C?style=flat&logo=calendar&logoColor=white) |

---

## 👩‍💻 책갈피 팀 소개

우리 팀은 **깔끔한 UI**와 사용자 입장에서 **꼼꼼하게 설계한 UX**를 통해 실제 서비스를 고려한 프로젝트를 지향합니다.

| 👤 문서영 | 👤 이지수 | 👤 김상훈 | 👤 이범원 |
|:---:|:---:|:---:|:---:|
| **FE/스크럼 마스터** | **FE/디자인** | **FE/발표** | **BE** |
| 폴더 관리, 공통 컴포넌트 제작<br/>대시보드/글쓰기 페이지 구현 | 디자인 시안 제작<br/>커뮤니티 페이지 구현 | 공통 컴포넌트 제작<br/>개인서랍 페이지 구현 | 서버 구축, 알라딘 API 연동<br/>로그인/회원가입 페이지 구현 |
| [![GitHub](https://img.shields.io/badge/GitHub-rhocci-181717?logo=github)](https://github.com/rhocci) | [![GitHub](https://img.shields.io/badge/GitHub-chacokyo-181717?logo=github)](https://github.com/chacokyo) | [![GitHub](https://img.shields.io/badge/GitHub-ksh2998-181717?logo=github)](https://github.com/ksh2998) | [![GitHub](https://img.shields.io/badge/GitHub-bemowon-181717?logo=github)](https://github.com/bemowon) |

---

## 🚀 프로젝트 설명

### 📁 폴더 구조

재사용과 유지보수성을 최우선으로 고려 후<br>각 컴포넌트들을 모듈화하여 관리했습니다.

<details>
<summary><strong>📂 폴더 구조 자세히 보기</strong></summary>

```
src/
├── 📁 api/
│   ├── communityData.js
│   ├── dashboardData.js
│   ├── loginAndSignupAuth.js
│   ├── myShelfData.js
│   └── writeData.js
├── 📁 assets/
│   ├── 📁 icon/
│   ├── 📁 image/
│   └── 📁 login/
├── 📁 common/
│   ├── base.css
│   ├── reset.css
│   ├── theme.css
│   └── utilities.css
├── 📁 components/
│   ├── 🧩 BookBlock/
│   ├── 🧩 BookCard/
│   ├── 🧩 BookCover/
│   ├── 🧩 BookHover/
│   ├── 🧩 BookItem/
│   ├── 🧩 BookStack/
│   ├── 🧩 Button/
│   ├── 🧩 Carousel/
│   ├── 🧩 Header/
│   ├── 🧩 Input/
│   ├── 🧩 Modal/
│   ├── 🧩 Profile/
│   ├── 🧩 ScrollTopButton/
│   ├── 🧩 Sidebar/
│   └── 🧩 Title/
├── 📁 data/
│   └── carouselData.js
├── 📁 pages/
│   ├── 🖥️ Community/
│   ├── 🖥️ Dashboard/
│   ├── 🖥️ LoginAndSignUp/
│   ├── 🖥️ MyShelf/
│   └── 🖥️ Write/
├── 📁 utils/
│   ├── auth.js
│   ├── date.js
│   ├── modal.js
│   ├── main.js
│   └── style.css
└── index.html
```
</details>

---

### 🖼️ 프로젝트 미리보기

#### 1️⃣ 커뮤니티 (비로그인 메인 페이지)

사이트 접속 시 가장 먼저 만나게 되는 페이지입니다.<br>비로그인 상태에서도 접근할 수 있으며,<br>사용자들이 공개로 저장한 독서 기록들이 자동으로 업로드됩니다.

![커뮤니티 페이지](/public/demo/community.jpg)

<details>
<summary><strong>🔧 핵심 기능 및 사용 컴포넌트</strong></summary>

**핵심 기능**
- 자동 슬라이드 캐러셀 배너
- 정렬 기능(최신순, 이름순)
- public 독서기록을 서버에서 연동 후 렌더링

**사용 컴포넌트**
- Sidebar, Button, BookHover, Carousel, Title, ScrollTopButton
</details>

---

#### 2️⃣ 대시보드 (로그인 메인 페이지)

로그인 시 가장 메인이 되는 페이지입니다.<br>최근 한 달 간 기록한 책의 제목과 한줄평이 블록 형태로 쌓여<br>한 눈에 읽은 책의 권수를 확인할 수 있도록 디자인했습니다.

![대시보드 페이지](/public/demo/dashboard.jpg)
![대시보드 상세](/public/demo/dashboard-1.jpg)

<details>
<summary><strong>🔧 핵심 기능 및 사용 컴포넌트</strong></summary>

**핵심 기능**
- 개인 통계 기능 (이달 기록 수, 올해 기록 수, 처음 기록 책 제목)
- 캘린더 기능 (기록 날짜 하이라이트, 날짜별 기록 조회)
- 독서기록 블록 스택 (스크롤 가능, 클릭시 모달 팝업)
- 독서기록 쓰기 페이지 연동

**사용 컴포넌트**
- Sidebar, Title, BookStack, BookBlock, Modal, BookCover, Button
</details>

---

#### 3️⃣ 글쓰기 페이지

대시보드에서 접근 가능한 페이지입니다.<br>베스트셀러 도서 목록 중 원하는 책을 선택한 후 감상 기록을 남길 수 있습니다.

![글쓰기 페이지](/public/demo/write.jpg)
![글쓰기 모달 1](/public/demo/write-modal.jpg)
![글쓰기 모달 2](/public/demo/write-modal-1.jpg)

<details>
<summary><strong>🔧 핵심 기능 및 사용 컴포넌트</strong></summary>

**핵심 기능**
- 알라딘 API를 통한 도서 목록 받아오기
- ISBN13 고유 번호를 이용한 책 디테일 GET/리뷰 POST
- Input 이벤트를 이용한 검색 기능
- 평점, 읽은 페이지 수, 공개 여부, 리뷰 텍스트 카운트 기능

**사용 컴포넌트**
- Sidebar, Input, BookItem, BookCover, Modal, Button, Title, ScrollTopButton
</details>

---

#### 4️⃣ 개인 서랍

로그인 후 접근 가능한 페이지입니다.<br>현재 로그인 중인 유저가 남긴 독서기록들을 한 번에 볼 수 있습니다.

![개인 서랍 페이지](/public/demo/myshelf.jpg)
![개인 서랍 모달](/public/demo/myshelf-modal.jpg)

<details>
<summary><strong>🔧 핵심 기능 및 사용 컴포넌트</strong></summary>

**핵심 기능**
- 개인이 남긴 전체 기록 조회
- POST요청 때 저장한 ISBN13을 토대로 기록을 남긴 도서 불러오기

**사용 컴포넌트**
- Sidebar, BookItem, BookCover, Modal, Title, Button
</details>

---

#### 5️⃣ 로그인/회원가입

로그인, 회원가입 진행 페이지입니다.<br>로그인 시 서버에서 불러온 인증 토큰을 LocalStorage 또는 SessionStorage에 담아 저장합니다.

![로그인 페이지](/public/demo/login.jpg)
![회원가입 페이지](/public/demo/signup.jpg)

<details>
<summary><strong>🔧 핵심 기능 및 사용 컴포넌트</strong></summary>

**핵심 기능**
- 로그인 유지 기능 (on: 로컬스토리지 / off: 세션스토리지)
- 비밀번호 미리보기 버튼
- 메일 인증 번호를 통한 실제 이메일 회원가입 유도
- 이메일/비밀번호 정규표현식 검증

**사용 컴포넌트**
- Input, Button
</details>

---

#### 📱 반응형 대응

**Breakpoint**
- `~576px`: 모바일 화면 대응
- `~768px`: 태블릿 화면 대응  
- `~1240px`: 일반 PC 화면 대응

![반응형 디자인](/public/demo/responsive.jpg)

---

## 🎨 디자인

### 📐 와이어프레임 설계

![와이어프레임](/public/demo/wireframe.jpg)

### 🎨 디자인 시스템

![디자인 시스템](/public/demo/design.jpg)

---

## 📌 참고 자료

- **캘린더 라이브러리** - [Vanilla Calendar Pro](https://github.com/uvarov-frontend/vanilla-calendar-pro)
- **알라딘 Open API** - [매뉴얼](https://docs.google.com/document/d/1mX-WxuoGs8Hy-QalhHcvuV17n50uGI2Sg_GHofgiePE/edit?tab=t.0)
- **디자인 레퍼런스** - [북적북적](https://www.studiobustles.com/)
- **코딩 스타일 가이드** - [네이버 JavaScript 스타일 가이드](https://github.com/naver/eslint-config-naver/blob/master/STYLE_GUIDE.md)
