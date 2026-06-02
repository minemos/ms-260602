// 새 거래(수입/지출)를 입력받는 폼 컴포넌트.
// 제어 컴포넌트(controlled component) 방식으로 각 입력값을 state로 관리한다.
import { useState } from 'react'
import {
  TYPES,
  TYPE_LABELS,
  getCategoriesByType,
} from '../../constants/categories'
import { today } from '../../utils/format'

const EMPTY_FORM = {
  type: TYPES.EXPENSE,
  category: 'food',
  amount: '',
  memo: '',
  date: today(),
}

function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  const categories = getCategoriesByType(form.type)

  // 입력값 변경 핸들러
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // 수입/지출 종류를 바꾸면 해당 종류의 첫 번째 카테고리로 초기화한다.
  function handleTypeChange(type) {
    const firstCategory = getCategoriesByType(type)[0].id
    setForm((prev) => ({ ...prev, type, category: firstCategory }))
  }

  // 제출 시 유효성 검사 후 부모로 데이터를 올려보낸다.
  function handleSubmit(e) {
    e.preventDefault()
    const amount = Number(form.amount)
    if (!amount || amount <= 0) {
      setError('금액을 올바르게 입력해 주세요.')
      return
    }
    if (!form.date) {
      setError('날짜를 선택해 주세요.')
      return
    }
    onSubmit(form)
    setForm({ ...EMPTY_FORM, type: form.type, category: form.category, date: form.date })
    setError('')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">새 거래 추가</h3>

      {/* 수입/지출 토글 */}
      <div className="form__toggle">
        {Object.values(TYPES).map((type) => (
          <button
            type="button"
            key={type}
            className={
              'form__toggle-btn' +
              (form.type === type ? ` is-active is-active--${type}` : '')
            }
            onClick={() => handleTypeChange(type)}
          >
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="form__row">
        <label className="form__field">
          <span>금액</span>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </label>

        <label className="form__field">
          <span>분류</span>
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form__field">
        <span>날짜</span>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
      </label>

      <label className="form__field">
        <span>메모</span>
        <input
          type="text"
          name="memo"
          value={form.memo}
          onChange={handleChange}
          placeholder="예: 친구와 점심"
          maxLength={40}
        />
      </label>

      {error && <p className="form__error">{error}</p>}

      <button type="submit" className="form__submit">
        + 추가하기
      </button>
    </form>
  )
}

export default TransactionForm
