// 대시보드(홈) 페이지.
// 잔액/수입/지출 요약 카드, 카테고리별 지출 도넛 차트, 최근 거래 5건을 보여준다.
import { Link } from 'react-router-dom'
import { useLedger } from '../../context/LedgerContext'
import SummaryCard from '../../components/ui/SummaryCard'
import CategoryChart from '../../components/ui/CategoryChart'
import TransactionItem from '../../components/common/TransactionItem'

function Home() {
  const { transactions, summary, removeTransaction } = useLedger()
  const recent = transactions.slice(0, 5)

  return (
    <div className="page">
      <h1 className="page__title">대시보드</h1>
      <p className="page__subtitle">이번 달 나의 수입과 지출을 한눈에 확인하세요.</p>

      {/* 요약 카드 3종 */}
      <section className="summary-grid">
        <SummaryCard title="현재 잔액" amount={summary.balance} icon="💳" variant="balance" />
        <SummaryCard title="총 수입" amount={summary.income} icon="📈" variant="income" />
        <SummaryCard title="총 지출" amount={summary.expense} icon="📉" variant="expense" />
      </section>

      <div className="dashboard-grid">
        {/* 카테고리별 지출 차트 */}
        <section className="card">
          <h2 className="card__title">카테고리별 지출</h2>
          <CategoryChart transactions={transactions} />
        </section>

        {/* 최근 거래 */}
        <section className="card">
          <div className="card__header">
            <h2 className="card__title">최근 거래</h2>
            <Link to="/list" className="card__more">
              전체 보기 →
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="empty">아직 거래 내역이 없습니다.</p>
          ) : (
            <ul className="tx-list">
              {recent.map((t) => (
                <TransactionItem key={t.id} transaction={t} onDelete={removeTransaction} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
