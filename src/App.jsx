// 애플리케이션 루트 컴포넌트.
// 라우팅 구조를 정의하고, 공통 레이아웃(Header / Footer)으로 페이지를 감싼다.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LedgerProvider } from './context/LedgerContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home/Home'
import List from './pages/List/List'
import Detail from './pages/Detail/Detail'
import './App.css'

function App() {
  return (
    // LedgerProvider로 전체 앱을 감싸 어디서든 가계부 데이터를 사용할 수 있게 한다.
    <LedgerProvider>
      <BrowserRouter>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
            {/* 정의되지 않은 경로는 홈으로 보낸다. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </LedgerProvider>
  )
}

export default App
