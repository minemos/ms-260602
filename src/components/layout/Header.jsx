// 상단 네비게이션 바. NavLink로 현재 페이지를 강조 표시한다.
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="header__logo">
          <span className="header__logo-icon">💰</span>
          <span>스마트 가계부</span>
        </NavLink>

        <nav className="header__nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => 'header__link' + (isActive ? ' is-active' : '')}
          >
            대시보드
          </NavLink>
          <NavLink
            to="/list"
            className={({ isActive }) => 'header__link' + (isActive ? ' is-active' : '')}
          >
            거래내역
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
