import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 設定 base 為 './' 確保資源路徑在 GitHub Pages 子路徑下也能正常運作
  base: './',
})