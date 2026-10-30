import Button from '@mui/material/Button'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'

// theme 是整套設計系統的單一事實來源：顏色、字體、圓角都在這裡定義一次，
// 之後所有元件透過 `sx` 或 `styled()` 自動取用，換主色只要改這裡。
const theme = createTheme({
  palette: {
    primary: { main: '#6d28d9' },
    error: { main: '#dc2626' },
  },
  shape: { borderRadius: 8 },
})

// styled() 建立「theme-aware」元件：props.theme 自動注入，寫 CSS-in-JS 時能直接引用 theme 的值。
const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  '&:hover': { backgroundColor: theme.palette.error.dark },
}))

export function Solution() {
  return (
    <ThemeProvider theme={theme}>
      <div className="space-y-2">
        <Button variant="contained">送出</Button>
        <DangerButton variant="contained">刪除</DangerButton>
        <p className="text-xs text-slate-500">
          顏色只在 theme 裡定義一次；想擴充自訂色（如 `brand`）或自訂 variant，要用 TypeScript module
          augmentation 擴充 `Palette`/`PaletteOptions`，否則 `theme.palette.brand` 會型別報錯（見 Q7）。
        </p>
      </div>
    </ThemeProvider>
  )
}
