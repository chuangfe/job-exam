import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Stat } from '../../../components/Stat'

// RHF 走「非受控 + ref」路線：register() 把 input 交給 RHF 內部用 ref 直接讀值，
// 打字不會觸發這個元件重 render（只有 formState.errors / watch 這類「訂閱」會）。
// zod schema 是單一驗證來源，z.infer 直接推導出表單型別，不用在多個 register 裡散落 rules。
const schema = z.object({
  name: z.string().min(1, '請輸入姓名'),
  email: z.string().email('email 格式不正確'),
  password: z.string().min(8, '密碼至少 8 碼'),
})
type FormValues = z.infer<typeof schema>

export function Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <form className="space-y-2" onSubmit={handleSubmit(() => {})}>
      <input className="w-full rounded border px-2 py-1 text-sm" placeholder="姓名" {...register('name')} />
      {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      <input className="w-full rounded border px-2 py-1 text-sm" placeholder="email" {...register('email')} />
      {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      <input
        className="w-full rounded border px-2 py-1 text-sm"
        placeholder="密碼"
        type="password"
        {...register('password')}
      />
      {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
      <button type="submit" className="rounded bg-slate-900 px-2 py-1 text-xs text-white">
        送出
      </button>
      <Stat label="元件 render 次數" value={renderCount.current} />
      <p className="text-xs text-slate-500">打字時 render 次數幾乎不會動，只有送出驗證時才變。</p>
    </form>
  )
}
