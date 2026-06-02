// 거래 목록의 단일 항목을 표시하는 컴포넌트.
// 클릭하면 상세 페이지로 이동하고, 삭제 버튼으로 항목을 제거할 수 있다.
import { useNavigate } from 'react-router-dom'
import { getCategory } from '../../constants/categories'
import { formatSigned, formatDate } from '../../utils/format'

function TransactionItem({ transaction, onDelete }) {
  const navigate = useNavigate()
  const category = getCategory(transaction.category)

  // 삭제 버튼 클릭 시 상세 페이지 이동(부모 클릭)이 함께 일어나지 않도록 막는다.
  function handleDelete(e) {
    e.stopPropagation()
    if (window.confirm('이 거래를 삭제할까요?')) {
      onDelete(transaction.id)
    }
  }

  return (
    <li
      className="tx-item"
      onClick={() => navigate(`/detail/${transaction.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/detail/${transaction.id}`)}
    >
      <span className="tx-item__dot" style={{ background: category.color }} />

      <div className="tx-item__info">
        <p className="tx-item__memo">{transaction.memo}</p>
        <p className="tx-item__meta">
          {category.label} · {formatDate(transaction.date)}
        </p>
      </div>

      <span className={`tx-item__amount tx-item__amount--${transaction.type}`}>
        {formatSigned(transaction.amount, transaction.type)}
      </span>

      <button className="tx-item__delete" onClick={handleDelete} aria-label="삭제">
        ✕
      </button>
    </li>
  )
}

export default TransactionItem
