// 요약 정보를 보여주는 카드 UI 컴포넌트.
// props로 제목/금액/아이콘/색상 종류를 받아 재사용한다.
import { formatCurrency } from '../../utils/format'

function SummaryCard({ title, amount, icon, variant = 'default' }) {
  return (
    <div className={`summary-card summary-card--${variant}`}>
      <div className="summary-card__icon">{icon}</div>
      <div className="summary-card__body">
        <p className="summary-card__title">{title}</p>
        <p className="summary-card__amount">{formatCurrency(amount)}</p>
      </div>
    </div>
  )
}

export default SummaryCard
