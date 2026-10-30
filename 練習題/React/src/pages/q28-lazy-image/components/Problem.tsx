import { useEffect, useState } from 'react'
import { Stat } from '../../../components/Stat'

const ITEM_COUNT = 12

// TODO: 目前所有「圖片」一掛載就立刻全部載入，不管使用者看不看得到。
// 用瀏覽器 Network 面板觀察：載入次數應該要在使用者捲動到該圖片附近時才增加。
export function Problem() {
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    setLoadedCount(ITEM_COUNT) // 一次全部「載入」
  }, [])

  return (
    <div className="space-y-2">
      <Stat label="已載入張數（一掛載就全部載入）" value={`${loadedCount} / ${ITEM_COUNT}`} />
      <div className="h-40 space-y-2 overflow-y-auto rounded border p-2">
        {Array.from({ length: ITEM_COUNT }).map((_, i) => (
          <div key={i} className="flex h-16 items-center justify-center bg-slate-300 text-xs text-slate-600">
            圖片 {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
