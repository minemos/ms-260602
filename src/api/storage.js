// localStorage를 데이터 저장소처럼 사용하는 간단한 API 계층.
// 실제 서버 API 대신 브라우저 저장소에 거래 내역을 보관한다.

const STORAGE_KEY = 'smart-ledger:transactions'

// 처음 실행했을 때 보여줄 예시 데이터
const SAMPLE_DATA = [
  { id: 's1', type: 'income', category: 'salary', amount: 2000000, memo: '6월 아르바이트 급여', date: '2026-06-01' },
  { id: 's2', type: 'expense', category: 'food', amount: 8500, memo: '학식 점심', date: '2026-06-01' },
  { id: 's3', type: 'expense', category: 'transport', amount: 1450, memo: '버스 요금', date: '2026-06-02' },
  { id: 's4', type: 'expense', category: 'culture', amount: 14000, memo: '영화 관람', date: '2026-06-02' },
  { id: 's5', type: 'income', category: 'allowance', amount: 50000, memo: '용돈', date: '2026-06-02' },
]

// 저장된 거래 내역을 불러온다. 없으면 예시 데이터를 반환한다.
export function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SAMPLE_DATA
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : SAMPLE_DATA
  } catch (e) {
    console.error('거래 내역을 불러오지 못했습니다.', e)
    return SAMPLE_DATA
  }
}

// 거래 내역 전체를 저장한다.
export function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch (e) {
    console.error('거래 내역을 저장하지 못했습니다.', e)
  }
}
