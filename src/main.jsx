// 앱의 진입점(entry point).
// React 18의 createRoot API로 App 컴포넌트를 #root에 렌더링한다.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
