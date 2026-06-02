// 거래내역 페이지.
// 왼쪽에는 거래 추가 폼, 오른쪽에는 필터링 가능한 전체 거래 목록을 보여준다.
import { useMemo, useState } from 'react'
import { useLedger } from '../../context/LedgerContext'
import TransactionForm from '../../components/common/TransactionForm'
import TransactionItem from '../../components/common/TransactionItem'
import { TYPES, TYPE_LABELS } from '../../constants/categories'

// 필터 옵션 정의 (전체 / 수입 / 지출)
const FILTERS = [
  { id: 'all', label: '전체' },
  { id: TYPES.INCOME, label: TYPE_LABELS.income },
  { id: TYPES.EXPENSE, label: TYPE_LABELS.expense },
]

function List() {
  const { transactions, addTransaction, removeTransaction } = useLedger()
  const [filter, setFilter] = useState('all')
  const [keyword, setKeyword] = useState('')

  // 필터(종류) + 검색어(메모)를 함께 적용한 결과 목록
  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (filter === 'all' ? true : t.type === filter))
      .filter((t) => t.memo.toLowerCase().includes(keyword.trim().toLowerCase()))
  }, [transactions, filter, keyword])

  return (
    <div className="page">
      <h1 className="page__title">거래내역</h1>
      <p className="page__subtitle">거래를 추가하고, 종류와 키워드로 검색해 보세요.</p>

      <div className="list-grid">
        {/* 왼쪽: 입력 폼 */}
        <aside className="list-grid__form">
          <TransactionForm onSubmit={addTransaction} />
        </aside>

        {/* 오른쪽: 목록 + 필터 */}
        <section className="list-grid__list card">
          <div className="list-toolbar">
            <div className="filter-tabs">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={'filter-tab' + (filter === f.id ? ' is-active' : '')}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <input
              className="search-input"
              type="search"
              placeholder="메모 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <p className="list-count">총 {filtered.length}건</p>

          {filtered.length === 0 ? (
            <p className="empty">조건에 맞는 거래가 없습니다.</p>
          ) : (
            <ul className="tx-list">
              {filtered.map((t) => (
                <TransactionItem key={t.id} transaction={t} onDelete={removeTransaction} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default List
