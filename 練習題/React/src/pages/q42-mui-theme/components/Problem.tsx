// TODO: 這裡每個按鈕都手動寫死顏色/圓角/字體，沒有單一事實來源。
// 想像一下：設計師把主色從 #1976d2 換成品牌色，要改幾個地方？
export function Problem() {
  const buttonStyle = {
    background: '#1976d2',
    color: '#fff',
    borderRadius: 4,
    padding: '6px 16px',
    border: 'none',
    fontFamily: 'Roboto, sans-serif',
    cursor: 'pointer',
  }
  const dangerButtonStyle = { ...buttonStyle, background: '#1769aa' } // 想做「危險」按鈕，結果顏色寫錯也沒人發現

  return (
    <div className="space-y-2">
      <button style={buttonStyle}>送出</button>
      <button style={dangerButtonStyle}>刪除（顏色打錯但沒人注意到）</button>
      <p className="text-xs text-slate-500">三個地方各自寫死顏色，換色要改全部，還容易不一致。</p>
    </div>
  )
}
