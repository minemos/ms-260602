// 거래 상세 페이지.
// URL 파라미터(:id)로 거래를 조회해 상세 정보를 보여준다.
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLedger } from '../../context/LedgerContext'
import { getCategory, TYPE_LABELS } from '../../constants/categories'
import { formatSigned, formatDate, formatCurrency } from '../../utils/format'

function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTransaction, removeTransaction } = useLedger()

  const transaction = getTransaction(id)

  // 존재하지 않는 거래(삭제됐거나 잘못된 주소)일 때 안내 화면
  if (!transaction) {
    return (
      <div className="page">
        <div className="card detail-notfound">
          <p className="detail-notfound__icon">🔍</p>
          <h2>거래를 찾을 수 없습니다.</h2>
          <p className="empty">이미 삭제되었거나 잘못된 주소입니다.</p>
          <Link to="/list" className="btn btn--primary">
            거래내역으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const category = getCategory(transaction.category)

  function handleDelete() {
    if (window.confirm('이 거래를 삭제할까요?')) {
      removeTransaction(transaction.id)
      navigate('/list')
    }
  }

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← 뒤로
      </button>

      <div className="card detail">
        <div className="detail__head">
          <span className="detail__badge" style={{ background: category.color }}>
            {category.label}
          </span>
          <span className={`detail__type detail__type--${transaction.type}`}>
            {TYPE_LABELS[transaction.type]}
          </span>
        </div>

        <p className={`detail__amount detail__amount--${transaction.type}`}>
          {formatSigned(transaction.amount, transaction.type)}
        </p>

        <dl className="detail__list">
          <div className="detail__item">
            <dt>메모</dt>
            <dd>{transaction.memo}</dd>
          </div>
          <div className="detail__item">
            <dt>날짜</dt>
            <dd>{formatDate(transaction.date)}</dd>
          </div>
          <div className="detail__item">
            <dt>분류</dt>
            <dd>{category.label}</dd>
          </div>
          <div className="detail__item">
            <dt>금액</dt>
            <dd>{formatCurrency(transaction.amount)}</dd>
          </div>
        </dl>

        <button className="btn btn--danger" onClick={handleDelete}>
          이 거래 삭제하기
        </button>
      </div>
    </div>
  )
}

export default Detail
