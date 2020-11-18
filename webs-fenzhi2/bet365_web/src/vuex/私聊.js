import { api_获取所有消息, api_发送消息, api_获取最新消息, api_撤销消息, api_获取菜单 } from '@/api/私聊接口.js'

import { Toast, Dialog } from 'vant'
const 初始state = {
  自己: {}, // 本人
  消息列表: [],
  正在聊天: {
    list: [], // 消息
    SenderProfile: {} // 聊天人
  },
  到达底部: true,
  未读条数: 0,
  显示会员详情: false,
  正在聊天code: '',

  操作: {
    obj: '',
    show: false,
    left: 0,
    top: 0
  },
  定时器: '', // 用于详情
  列表定时器: '' // 用于列表
}
export default {
  namespaced: true,
  state: JSON.parse(JSON.stringify(初始state)),
  getters: {
    未读总条数 (state) {
      var n = 0
      state.消息列表.forEach(item => {
        n += item.MessageCount
      })
      return n
    }
  },
  mutations: {

  },
  actions: {
    // 主要用于退出
    清空私聊 ({ state, dispatch }) {
      dispatch('销毁定时器')
      dispatch('取消获取列表')
      for (const key in state) {
        state[key] = 初始state[key]
      }
      // state=Object.assign({},初始state);
    },
    async 私聊初始化 ({ state, commit, dispatch, getters }, code) {
      // console.log(code);
      state.到达底部 = true
      state.正在聊天code = code || ''
      commit('加载中', true, { root: true })
      // state.消息列表.forEach(item=>{
      //     if(item.SenderProfile.Code == state.正在聊天code){
      //         item.MessageCount=0
      //     }
      // })
      await dispatch('获取所有消息')
      dispatch('获取最新消息')
      commit('加载中', false, { root: true })
    },
    取消获取列表 ({ state }) {
      try {
        clearInterval(state.列表定时器)
        state.列表定时器 = ''
      } catch (error) { }
    },
    获取消息列表 ({ state, dispatch, rootState }) {
      api_获取菜单().then(x => {
        var list = x.data.ChatMenu
        console.log(list)
        console.log("看看上面的")
        if (!list) {
          state.消息列表 = []
          state.自己 = {}
        } else {
          state.消息列表 = list
          state.自己 = x.data.ReceiverProfile
        }
        var userinfo = rootState.user.userinfo
        if (!userinfo.UserId) {
          return
        }
        
        if (!state.列表定时器) {
          state.列表定时器 = setInterval(() => {
            dispatch('获取消息列表')
          }, 1000 * 30)
        }
      }).catch(err => { })
    },
    获取所有消息 ({ state }) {
      return new Promise((resolve, reject) => {
        api_获取所有消息(state.正在聊天code).then(x => {
          state.正在聊天.list = x.data.PrivateMessages ? x.data.PrivateMessages : []
          state.正在聊天.SenderProfile = x.data.SenderProfile ? x.data.SenderProfile : {}
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },
    销毁定时器 ({ state }) {
      try {
        clearInterval(state.定时器)
        state.定时器 = ''
      } catch (error) { }
    },
    async 获取最新消息 ({ state, dispatch }) {
      var x = await api_获取最新消息(state.正在聊天code)
      var list = x.data.PrivateMessage ? x.data.PrivateMessage : []
      console.log(list, x)
      state.正在聊天.list = [...state.正在聊天.list, ...list]
      let DeleteMessage = x.data.DeleteMessage ? x.data.DeleteMessage : []
      state.正在聊天.list.forEach(item => {
        if (DeleteMessage.includes(item.Id)) {
          var index = state.正在聊天.list.findIndex(x => x.Id == item.Id)
          console.log(index)
          state.正在聊天.list.splice(index, 1)
        }
      })
      if (state.定时器) {
        return
      }
      state.定时器 = setInterval(() => {
        dispatch('获取最新消息')
      }, 5000)
    },
    async 发送消息 ({ state, getters, dispatch, commit }, obj) {
      // ReceiverCode(int), Message(string), MessageType(int)
      commit('加载中', true, { root: true })
      try {
        var r1 = await api_发送消息(obj)
      } catch (error) {
        commit('加载中', false, { root: true })
        Toast('系统错误，稍后再试')
        return
      }
      if (r1.data.Msg == '发送成功' || r1.data.msg == '发送成功') {
        // Toast('发送成功')
        var date = new Date()
        var 小时 = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var 分钟 = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var 秒 = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        var obj = {
          CreateTime: 小时 + ':' + 分钟 + ':' + 秒,
          Id: r1.data.MsgId,
          IsValid: true,
          Message: obj.Message,
          MessageType: obj.MessageType,
          ReceiverCode: obj.ReceiverCode,
          SenderCode: state.自己.Code
        }
        state.正在聊天.list.push(obj)
      } else {
        Toast(r1.data.Msg ? r1.data.Msg : r1.data.msg)
      }
      commit('加载中', false, { root: true })
    },
    async 撤销消息 ({ state, dispatch, commit }) {
      commit('加载中', true, { root: true })
      var obj = {
        ReceiverCode: state.操作.obj.ReceiverCode,
        MessageId: state.操作.obj.Id
      }
      try {
        var r = await api_撤销消息(obj)
      } catch (error) {
        Toast('系统错误，稍后再试')
        commit('加载中', false, { root: true })
        return
      }
      commit('加载中', false, { root: true })
      if (r.data.code != 0) {
        Toast(r.data.msg)
        return
      }
      Toast('撤回/删除成功')
      var index = state.正在聊天.list.findIndex(x => x.Id == state.操作.obj.Id)
      console.log(index)
      state.正在聊天.list.splice(index, 1)
    }
  }
}