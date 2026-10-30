// 給 Q41 demo 用的本地時間來源，避免依賴外部 API 的穩定性。
export async function GET() {
  return Response.json({ time: new Date().toISOString() })
}
