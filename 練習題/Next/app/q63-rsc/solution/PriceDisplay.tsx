'use client'

import { useState } from 'react'

// 修正版：只接收可序列化的資料（number/string），格式化邏輯搬進 Client Component 自己做。
// 多加一個 currency 切換，順便證明這確實是會在瀏覽器執行、能用 useState 的 Client Component。
export function PriceDisplay(props: { cents: number }) {
  const [currency, setCurrency] = useState<'TWD' | 'USD'>('TWD')
  const formatted =
    currency === 'TWD' ? `NT$${(props.cents / 100).toFixed(0)}` : `US$${(props.cents / 100 / 31).toFixed(2)}`

  return (
    <p>
      價格：{formatted}{' '}
      <button onClick={() => setCurrency((c) => (c === 'TWD' ? 'USD' : 'TWD'))}>切換幣別</button>
    </p>
  )
}
