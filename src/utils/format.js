// 화면 표시용 포맷 헬퍼 함수 모음

// 숫자를 원화 형식 문자열로 변환 (예: 12000 -> "12,000원")
export function formatCurrency(amount) {
  const num = Number(amount) || 0
  return num.toLocaleString('ko-KR') + '원'
}

// +/- 부호를 붙여서 표시 (수입은 +, 지출은 -)
export function formatSigned(amount, type) {
  const sign = type === 'income' ? '+' : '-'
  return sign + formatCurrency(Math.abs(Number(amount) || 0))
}

// ISO 날짜 문자열(yyyy-mm-dd)을 "2026년 6월 2일 (월)" 형태로 변환
export function formatDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  const week = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${week[date.getDay()]})`
}

// 오늘 날짜를 yyyy-mm-dd 문자열로 반환 (input[type=date] 기본값용)
export function today() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}
