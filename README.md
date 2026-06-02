# 💰 스마트 가계부 (Smart Ledger)

순수 **React**로 만든 개인 수입/지출 관리(가계부) 웹 애플리케이션입니다.
리액트 미니 프로젝트 과제(13주차)로 제작되었습니다.

> 별도의 백엔드 서버 없이, 입력한 거래 내역을 브라우저의 `localStorage`에 저장합니다.
> 새로고침하거나 브라우저를 닫았다 열어도 데이터가 유지됩니다.

---

## 1. 프로젝트 개요

### 1.1 목적
- React를 활용해 **SPA(Single Page Application)** 형태의 웹 애플리케이션을 제작한다.
- 컴포넌트 설계, **React Router**를 이용한 페이지 라우팅, **Context API**를 이용한
  전역 상태 관리, `localStorage`를 이용한 데이터 영속성을 직접 구현하며 학습한다.

### 1.2 소개(요약)
- 사용자가 **수입/지출 거래를 추가·삭제**하고, 종류·키워드로 **검색/필터링**할 수 있는 가계부 앱.
- 대시보드에서 **잔액·수입·지출 요약**과 **카테고리별 지출 도넛 차트**를 한눈에 확인할 수 있다.

### 1.3 주요 기능

| 기능명 | 기능 설명 | 관련 컴포넌트 |
| --- | --- | --- |
| 거래 등록 | 수입/지출, 금액, 분류, 날짜, 메모를 입력해 거래를 추가 | `TransactionForm` |
| 거래 삭제 | 목록/상세에서 선택한 거래를 삭제 | `TransactionItem`, `Detail` |
| 거래 검색·필터 | 수입/지출 종류 및 메모 키워드로 목록 필터링 | `List` |
| 요약 대시보드 | 현재 잔액·총 수입·총 지출을 카드로 표시 | `SummaryCard`, `Home` |
| 지출 차트 | 카테고리별 지출 비율을 SVG 도넛 차트로 시각화 | `CategoryChart` |
| 상세 조회 | URL 파라미터(`/detail/:id`)로 단일 거래 상세 표시 | `Detail` |
| 데이터 저장 | 모든 거래를 localStorage에 자동 저장/복원 | `LedgerContext`, `api/storage` |

---

## 2. 프로그램 설계

### 2.1 전체 프로젝트 구조

```
ms-260602/
├─ public/
│  └─ wallet.svg              # 파비콘
├─ src/
│  ├─ api/
│  │  └─ storage.js           # localStorage 데이터 계층
│  ├─ components/
│  │  ├─ common/              # 도메인 공통 컴포넌트
│  │  │  ├─ TransactionForm.jsx
│  │  │  └─ TransactionItem.jsx
│  │  ├─ layout/              # 레이아웃 컴포넌트
│  │  │  ├─ Header.jsx
│  │  │  └─ Footer.jsx
│  │  └─ ui/                  # 재사용 UI 컴포넌트
│  │     ├─ SummaryCard.jsx
│  │     └─ CategoryChart.jsx
│  ├─ constants/
│  │  └─ categories.js        # 카테고리/타입 상수
│  ├─ context/
│  │  └─ LedgerContext.jsx    # 전역 상태(Context)
│  ├─ pages/                  # 라우팅 페이지
│  │  ├─ Home/Home.jsx        # 대시보드
│  │  ├─ List/List.jsx        # 거래내역
│  │  └─ Detail/Detail.jsx    # 거래 상세
│  ├─ utils/
│  │  └─ format.js            # 통화/날짜 포맷 헬퍼
│  ├─ App.jsx                 # 라우팅 + 레이아웃
│  ├─ App.css
│  ├─ main.jsx                # 진입점
│  └─ index.css
├─ index.html
├─ package.json
└─ vite.config.js
```

### 2.2 컴포넌트 설계

| 컴포넌트명 | 역할 |
| --- | --- |
| `App` | 라우팅과 공통 레이아웃 정의, Provider 적용 |
| `Header` / `Footer` | 상단 네비게이션 / 하단 푸터 |
| `SummaryCard` | 제목·금액·아이콘을 받아 요약 카드를 렌더링 |
| `CategoryChart` | 지출을 카테고리별로 집계해 SVG 도넛 차트로 표시 |
| `TransactionForm` | 거래 입력 폼 (제어 컴포넌트 + 유효성 검사) |
| `TransactionItem` | 거래 목록의 단일 항목 (클릭 시 상세 이동) |

### 2.3 페이지 및 라우팅 구조

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />          {/* 대시보드 */}
    <Route path="/list" element={<List />} />        {/* 거래내역 */}
    <Route path="/detail/:id" element={<Detail />} /> {/* 거래 상세 */}
    <Route path="*" element={<Navigate to="/" />} /> {/* 그 외 → 홈 */}
  </Routes>
</BrowserRouter>
```

---

## 3. 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (http://localhost:5173)
npm run dev

# 3. 프로덕션 빌드
npm run build
npm run preview
```

---

## 4. 사용 기술

- **React 18** (함수형 컴포넌트, Hooks)
- **React Router v6** (페이지 라우팅)
- **Context API + useMemo** (전역 상태 관리 및 합계 계산)
- **localStorage** (데이터 영속성)
- **Vite** (빌드 도구)
- **순수 CSS** (외부 UI 라이브러리 미사용)

### 사용한 React 핵심 개념
- `useState` / `useEffect` / `useMemo` / `useContext`
- 커스텀 훅 (`useLedger`)
- 제어 컴포넌트, 조건부 렌더링, 리스트 렌더링(`key`)
- props를 통한 컴포넌트 재사용, 컴포넌트 합성

---

## 5. 향후 개선 방향
- 월별/기간별 통계 및 막대 그래프 추가
- 거래 수정(편집) 기능
- 예산 설정 및 초과 알림
- 데이터 내보내기/가져오기(CSV)
