// 가계부 전역 상태를 관리하는 Context.
// 거래 내역(transactions) 상태와 추가/삭제 함수, 그리고 합계 계산값을 제공한다.
// Context API를 사용하면 props를 여러 단계로 내려보내지 않고도
// 어느 페이지/컴포넌트에서든 동일한 데이터에 접근할 수 있다.

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadTransactions, saveTransactions } from '../api/storage'
import { TYPES } from '../constants/categories'

const LedgerContext = createContext(null)

export function LedgerProvider({ children }) {
  // 거래 내역 상태. 최초 렌더링 시 저장소에서 한 번만 불러온다.
  const [transactions, setTransactions] = useState(() => loadTransactions())

  // 거래 내역이 바뀔 때마다 자동으로 저장소에 반영한다.
  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  // 거래 추가: 고유 id와 함께 목록 맨 앞에 넣는다.
  function addTransaction(data) {
    const newItem = {
      id: crypto.randomUUID(),
      type: data.type,
      category: data.category,
      amount: Number(data.amount),
      memo: data.memo?.trim() || '(메모 없음)',
      date: data.date,
    }
    setTransactions((prev) => [newItem, ...prev])
    return newItem
  }

  // 거래 삭제: id가 일치하지 않는 항목만 남긴다.
  function removeTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // id로 단일 거래 조회 (상세 페이지에서 사용)
  function getTransaction(id) {
    return transactions.find((t) => t.id === id)
  }

  // 합계 계산값. transactions가 바뀔 때만 다시 계산되도록 useMemo 사용.
  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === TYPES.INCOME)
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions
      .filter((t) => t.type === TYPES.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [transactions])

  const value = {
    transactions,
    summary,
    addTransaction,
    removeTransaction,
    getTransaction,
  }

  return <LedgerContext.Provider value={value}>{children}</LedgerContext.Provider>
}

// Context를 편하게 사용하기 위한 커스텀 훅.
// Provider 밖에서 호출하면 에러를 던져 실수를 빨리 잡을 수 있다.
export function useLedger() {
  const ctx = useContext(LedgerContext)
  if (!ctx) {
    throw new Error('useLedger는 LedgerProvider 안에서만 사용할 수 있습니다.')
  }
  return ctx
}
