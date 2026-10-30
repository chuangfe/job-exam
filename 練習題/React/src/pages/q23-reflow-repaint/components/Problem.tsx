import { useRef, useState } from 'react'
import { Button } from '../../../components/Button'
import { Stat } from '../../../components/Stat'

const BOX_COUNT = 30

// TODO: 這是「強制同步佈局（layout thrashing）」的壞案例：
// 迴圈中讀 offsetWidth（強制 reflow）接著馬上寫 style.width（弄髒佈局），每個 box 都重複一次。
// 在「答案」版本裡看看怎麼改成「先全部讀、再全部寫」。
function thrashLayout(boxes: HTMLDivElement[]) {
  const start = performance.now()
  for (const box of boxes) {
    const width = box.offsetWidth // 讀：強制 reflow
    box.style.width = `${width + 1}px` // 寫：弄髒佈局，下一輪讀又要重算
  }
  return performance.now() - start
}

export function Problem() {
  const refs = useRef<HTMLDivElement[]>([])
  const [ms, setMs] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      <p className="text-sm">
        點擊按鈕觸發 {BOX_COUNT} 個 box 的「讀一個、寫一個」迴圈，打開 Performance 面板錄製可以看到大量交錯的 Layout
        事件。
      </p>
      <Button
        onClick={() => {
          setMs(thrashLayout(refs.current))
        }}
      >
        觸發 layout thrashing
      </Button>
      {ms !== null && <Stat label="耗時" value={`${ms.toFixed(2)} ms`} />}
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: BOX_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) refs.current[i] = el
            }}
            className="h-4 w-4 bg-slate-300"
          />
        ))}
      </div>
    </div>
  )
}
