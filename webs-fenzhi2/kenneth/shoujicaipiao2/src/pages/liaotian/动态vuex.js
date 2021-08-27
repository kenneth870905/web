
import store from '@/store'

// 动态vuex
import 聊天2 from '@/store/聊天2.js'
store.registerModule('聊天2', 聊天2)
console.log('加载动态vuex')