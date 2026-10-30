import { useRef, useState } from 'react'
import { Button } from '../../../components/Button'
import { Stat } from '../../../components/Stat'

const BOX_COUNT = 30

// 批次讀、批次寫：先把所有需要的幾何資訊一次讀完，才開始寫入，
// 寫入階段不再需要讀取，瀏覽器可以把這些寫入合併成一次 reflow。
function batchLayout(boxes: HTMLDivElement[]) {
  const start = performance.now()
  const widths = boxes.map((box) => box.offsetWidth) // 先全部讀完
  boxes.forEach((box, i) => {
    box.style.width = `${widths[i] + 1}px` // 再全部寫完
  })
  return performance.now() - start
}

export function Solution() {
  const refs = useRef<HTMLDivElement[]>([])
  const [ms, setMs] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      <p className="text-sm">同樣的 {BOX_COUNT} 個 box，改成先讀完全部寬度、再一次寫完，錄製 Performance 面板比較兩者。</p>
      <Button
        onClick={() => {
          setMs(batchLayout(refs.current))
        }}
      >
        批次讀寫
      </Button>
      {ms !== null && <Stat label="耗時" value={`${ms.toFixed(2)} ms`} />}
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: BOX_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) refs.current[i] = el
            }}
            className="h-4 w-4 bg-emerald-300"
          />
        ))}
      </div>
    </div>
  )
}
