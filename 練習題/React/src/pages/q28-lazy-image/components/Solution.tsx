import { useEffect, useRef, useState } from 'react'
import { Stat } from '../../../components/Stat'

const ITEM_COUNT = 12

function LazyItem(props: { index: number; root: Element | null; onLoad: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          props.onLoad()
          io.disconnect() // 載入後不必再觀察
        }
      },
      { root: props.root, rootMargin: '50px' },
    )
    io.observe(ref.current)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.root])

  return (
    <div
      ref={ref}
      className={`flex h-16 items-center justify-center text-xs ${loaded ? 'bg-emerald-300 text-emerald-900' : 'bg-slate-200 text-slate-400'}`}
    >
      圖片 {props.index + 1}（{loaded ? '已載入' : '尚未進入視窗'}）
    </div>
  )
}

// 用 IntersectionObserver：只有捲動到「即將進入視窗」才算載入，root 設成容器本身才能正確偵測容器內捲動。
export function Solution() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [root, setRoot] = useState<Element | null>(null)
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    setRoot(containerRef.current)
  }, [])

  return (
    <div className="space-y-2">
      <Stat label="已載入張數（捲動到附近才載入）" value={`${loadedCount} / ${ITEM_COUNT}`} />
      <div ref={containerRef} className="h-40 space-y-2 overflow-y-auto rounded border p-2">
        {Array.from({ length: ITEM_COUNT }).map((_, i) => (
          <LazyItem key={i} index={i} root={root} onLoad={() => setLoadedCount((c) => c + 1)} />
        ))}
      </div>
    </div>
  )
}
