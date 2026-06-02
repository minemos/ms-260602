// 지출을 카테고리별로 합산해 SVG 도넛 차트로 그리는 컴포넌트.
// 외부 차트 라이브러리 없이 순수 SVG와 stroke-dasharray로 구현했다.
import { useMemo } from 'react'
import { EXPENSE_CATEGORIES, getCategory, TYPES } from '../../constants/categories'
import { formatCurrency } from '../../utils/format'

const RADIUS = 70
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CategoryChart({ transactions }) {
  // 카테고리별 지출 합계를 구한 뒤, 금액이 큰 순으로 정렬한다.
  const slices = useMemo(() => {
    const totals = {}
    transactions
      .filter((t) => t.type === TYPES.EXPENSE)
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount
      })

    const total = Object.values(totals).reduce((a, b) => a + b, 0)
    if (total === 0) return { total: 0, data: [] }

    const data = EXPENSE_CATEGORIES.filter((c) => totals[c.id] > 0)
      .map((c) => ({
        ...c,
        amount: totals[c.id],
        ratio: totals[c.id] / total,
      }))
      .sort((a, b) => b.amount - a.amount)

    return { total, data }
  }, [transactions])

  if (slices.total === 0) {
    return (
      <div className="chart chart--empty">
        <p>아직 지출 내역이 없어요.</p>
        <p className="chart__hint">거래를 추가하면 카테고리별 지출 비율이 표시됩니다.</p>
      </div>
    )
  }

  // 각 조각의 시작 위치(offset)를 누적해서 계산한다.
  let accumulated = 0

  return (
    <div className="chart">
      <div className="chart__graphic">
        <svg viewBox="0 0 180 180" width="180" height="180">
          {/* 배경 원 */}
          <circle cx="90" cy="90" r={RADIUS} fill="none" stroke="#f1f3f5" strokeWidth="22" />
          {/* 카테고리별 조각 */}
          {slices.data.map((slice) => {
            const length = slice.ratio * CIRCUMFERENCE
            const offset = accumulated
            accumulated += length
            return (
              <circle
                key={slice.id}
                cx="90"
                cy="90"
                r={RADIUS}
                fill="none"
                stroke={slice.color}
                strokeWidth="22"
                strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 90 90)"
              />
            )
          })}
          {/* 중앙 총 지출 텍스트 */}
          <text x="90" y="84" textAnchor="middle" className="chart__center-label">
            총 지출
          </text>
          <text x="90" y="104" textAnchor="middle" className="chart__center-value">
            {formatCurrency(slices.total)}
          </text>
        </svg>
      </div>

      <ul className="chart__legend">
        {slices.data.map((slice) => (
          <li key={slice.id} className="chart__legend-item">
            <span className="chart__legend-dot" style={{ background: slice.color }} />
            <span className="chart__legend-label">{getCategory(slice.id).label}</span>
            <span className="chart__legend-ratio">{Math.round(slice.ratio * 100)}%</span>
            <span className="chart__legend-amount">{formatCurrency(slice.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryChart
