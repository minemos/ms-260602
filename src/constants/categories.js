// 거래 분류(카테고리) 상수 정의
// 수입(income) / 지출(expense) 별로 카테고리와 색상을 관리한다.

export const TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
}

export const TYPE_LABELS = {
  income: '수입',
  expense: '지출',
}

// 지출 카테고리: 도넛 차트에서 사용할 고유 색상을 함께 정의
export const EXPENSE_CATEGORIES = [
  { id: 'food', label: '식비', color: '#ff6b6b' },
  { id: 'transport', label: '교통', color: '#4dabf7' },
  { id: 'shopping', label: '쇼핑', color: '#f783ac' },
  { id: 'culture', label: '문화/여가', color: '#9775fa' },
  { id: 'health', label: '의료/건강', color: '#69db7c' },
  { id: 'house', label: '주거/통신', color: '#ffa94d' },
  { id: 'etcExpense', label: '기타지출', color: '#adb5bd' },
]

// 수입 카테고리
export const INCOME_CATEGORIES = [
  { id: 'salary', label: '급여', color: '#37b24d' },
  { id: 'allowance', label: '용돈', color: '#74c0fc' },
  { id: 'bonus', label: '보너스', color: '#fab005' },
  { id: 'etcIncome', label: '기타수입', color: '#868e96' },
]

// 전체 카테고리를 합쳐서 id로 쉽게 조회할 수 있는 맵
const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export function getCategory(id) {
  return ALL_CATEGORIES.find((c) => c.id === id) ?? { id, label: '미분류', color: '#ced4da' }
}

export function getCategoriesByType(type) {
  return type === TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}
