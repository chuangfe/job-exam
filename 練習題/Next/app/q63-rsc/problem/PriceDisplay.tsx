'use client'

// 這是一個 Client Component（有 'use client'）。
export function PriceDisplay(props: { formatPrice: (cents: number) => string; cents: number }) {
  return <p>價格：{props.formatPrice(props.cents)}</p>
}
