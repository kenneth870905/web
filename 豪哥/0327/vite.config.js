import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 路径别名
import path from 'path'
import moment from 'moment'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
	],
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'src')
		}
	},
	base:"./",
	build:{
		assetsDir:moment().format('MMDD')
	}
})
