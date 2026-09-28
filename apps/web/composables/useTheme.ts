export function useTheme() {
  const isDark = useState('abang-dark', () => false)

  const apply = (dark: boolean) => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('abang-theme', dark ? 'dark' : 'light')
  }

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  const toggle = () => {
    isDark.value = !isDark.value
    apply(isDark.value)
  }

  return { isDark, toggle }
}

export function formatRM(amount: number) {
  return `RM ${amount.toLocaleString('en-MY')}`
}
