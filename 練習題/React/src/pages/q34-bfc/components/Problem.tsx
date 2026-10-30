// 任務：下面紅色虛線框是父容器，裡面放了兩個 float: left 的橘色方塊，父容器沒有設定任何 clearfix/BFC 機制。
// 紅色虛線框有沒有把兩個橘色方塊「包住」？框的高度是多少？為什麼會這樣？
export function Problem() {
  return (
    <div>
      <div className="border-2 border-dashed border-red-400 bg-red-50">
        <div className="float-left h-16 w-16 bg-amber-300">浮動</div>
        <div className="float-left ml-2 h-16 w-16 bg-amber-300">浮動</div>
      </div>
    </div>
  )
}
