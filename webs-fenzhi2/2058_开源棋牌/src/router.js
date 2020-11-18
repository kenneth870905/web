import Vue from 'vue'
import Router from 'vue-router'
import index from './components/index.vue'
import tabbar from './components/tabbar/tabbar.vue'
import { Toast } from 'vant';
// 注册路由(使用路由)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/tabbar',
      name: 'tabbar',
      component: tabbar
    },
    {
      path: '/jryxtk',
      name: 'jryxtk',
      component: () => import('./components/jryxtk.vue')// 登录
    },
    {
      path: '/iframe',
      name: 'iframe',
      component: () => import('./components/iframe.vue')// 彩票游戏
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login/login.vue')// 登录
    },
    {
      path: '/registered',
      name: 'registered',
      component: () => import('./pages/registered/registered.vue')// 注册
    },
    {
      path: '/youhui',
      name: 'youhui',
      component: () => import('./pages/youhui/youhui.vue')// 优惠活动
    },
    {
      path: '/cpdt',
      name: 'cpdt',
      component: () => import('./pages/cpdt/cpdt.vue')// 彩票大厅
    },
    {
      path: '/chongzhi',
      name: 'chongzhi',
      component: () => import('./pages/chongzhi/chongzhi.vue'),// 充值
      meta: {
        需要登录: true, //路由守卫
      }
    },
    {
      path: '/dzxk',
      name: 'dzxk',
      component: () => import('./pages/chongzhi/dzxk.vue')//电子选卡
    },
    {
      path: '/wyxk',
      name: 'wyxk',
      component: () => import('./pages/chongzhi/wyxk.vue')//网银选卡
    },
    {
      path: '/zxxk',
      name: 'zxxk',
      component: () => import('./pages/chongzhi/zxxk.vue')//在线充值
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: () => import('./pages/tixian/tixian.vue'),// 提现
      meta: {
        需要登录: true,
      }
    },
    {
      path: '/yhk',
      name: 'yhk',
      component: () => import('./pages/tixian/yhk.vue')//银行卡
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./pages/my/my/my.vue'),// 个人中心
      meta: {
        需要登录: true,
      }
    },
    {
      path: '/anquanzx',
      name: 'anquanzx',
      component: () => import('./pages/my/anquanzx/anquanzx.vue')// 个人资料
    },
    {
      path: '/grxinxi',
      name: 'grxinxi',
      component: () => import('./pages/my/anquanzx/grxinxi.vue')// 个人信息
    },
    {
      path: '/xgnicheng',
      name: 'xgnicheng',
      component: () => import('./pages/my/anquanzx/xgnicheng.vue')// 修改昵称
    },
    {
      path: '/aqwenti',
      name: 'aqwenti',
      component: () => import('./pages/my/anquanzx/aqwenti.vue')// 安全问题
    },
    {
      path: '/yhkxinxi',
      name: 'yhkxinxi',
      component: () => import('./pages/my/anquanzx/yhkxinxi.vue')// 银行卡信息
    },
    {
      path: '/dlmima',
      name: 'dlmima',
      component: () => import('./pages/my/anquanzx/dlmima.vue')// 修改登录密码
    },
    {
      path: '/aqmima',
      name: 'aqmima',
      component: () => import('./pages/my/anquanzx/aqmima.vue')// 修改安全密码
    },
    {
      path: '/tzjilu',
      name: 'tzjilu',
      component: () => import('./pages/my/tzjilu/tzjilu.vue')// 投注记录
    },
    {
      path: '/zjmingxi',
      name: 'zjmingxi',
      component: () => import('./pages/my/zjmingxi/zjmingxi.vue')// 资金明细
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/my/zjmingxi/order.vue')// 订单详情
    },
    {
      path: '/czjilu',
      name: 'czjilu',
      component: () => import('./pages/my/czjilu/czjilu.vue')// 充值记录
    },
    {
      path: '/txjilu',
      name: 'txjilu',
      component: () => import('./pages/my/txjilu/txjilu.vue')// 提现记录
    },
    {
      path: '/baobiao',
      name: 'baobiao',
      component: () => import('./pages/my/baobiao/baobiao.vue')// 个人报表
    },
    {
      path: '/daili',
      name: 'daili',
      component: () => import('./pages/my/daili/daili.vue')// 代理中心
    },
    {
      path: '/dailishuoming',
      name: 'dailishuoming',
      component: () => import('./pages/my/daili/dailishuoming.vue')// 代理说明
    },
    {
      path: '/tuiguangguanli',
      name: 'tuiguangguanli',
      component: () => import('./pages/my/daili/tuiguangguanli.vue')// 推广管理
    },
    {
      path: '/dailiyongjin',
      name: 'dailiyongjin',
      component: () => import('./pages/my/daili/dailiyongjin.vue')// 代理佣金
    },
    {
      path: '/touzhumingxi',
      name: 'touzhumingxi',
      component: () => import('./pages/my/daili/touzhumingxi.vue')// 投注明细
    },
    {
      path: '/jiaoyimingxi',
      name: 'jiaoyimingxi',
      component: () => import('./pages/my/daili/jiaoyimingxi.vue')// 交易明细
    },
    {
      path: '/gonggao',
      name: 'gonggao',
      component: () => import('./pages/my/gonggao/gonggao.vue')// 信息公告
    },
    {
      path: '/xtgonggao',
      name: 'xtgonggao',
      component: () => import('./pages/my/gonggao/xtgonggao.vue')//系统公告
    },
    {
      path: '/xxtongzhi',
      name: 'xxtongzhi',
      component: () => import('./pages/my/gonggao/xxtongzhi.vue')//消息通知
    },
    {
      path: '/kefu',
      name: 'kefu',
      component: () => import('./pages/my/kefu/kefu.vue')// 客服中心
    },
    {
      path: "*",
      name: "",
      component: () => import('@/components/404.vue')
    },
    {
      path: "/cpiframe",
      name: "cpiframe",
      component: () => import('@/components/cpiframe.vue')
    },
    {
      path: "/游戏规则",
      name: "游戏规则",
      component: () => import('./pages/游戏规则/游戏规则.vue')
    },
    {
      path: "/grziliao",
      name: "grziliao",
      component: () => import('./pages/grziliao/grziliao.vue')
    },
    {
      path: "/basic",
      name: "basic",
      component: () => import('./pages/my/basic/basic.vue'), //修改个人资料   
    },
    {
      path: "/xiugaitx",
      name: "xiugaitx",
      component: () => import('./pages/my/basic/xiugaitx.vue'), //修改头像   
    },
    {
      path: "/xiugainame",
      name: "xiugainame",
      component: () => import('./pages/my/basic/xiugainame.vue'), //修改名字
    },
    {
      path: "/xiugaiqq",
      name: "xiugaiqq",
      component: () => import('./pages/my/basic/xiugaiqq.vue'), //修改qq
    },
    {
      path: "/viplist",
      name: "viplist",
      component: () => import('./pages/my/viplist/viplist.vue'), //vip等级
    },
    {
      path: "/qdiframe",
      name: "qdiframe",
      component: () => import('@/components/qdiframe.vue'), //每日签到
      meta: {
        需要登录: true,
      }
    },
    {
      path: "/sciframe",
      name: "sciframe",
      component: () => import('@/components/sciframe.vue'), //首充
      meta: {
        需要登录: true,
      }
    },
    {
      path: "/teyaovip",
      name: "teyaovip",
      component: () => import('./pages/teyao/teyaovip.vue'), //特邀嘉宾
      meta: {
        需要登录: true,
      }
    },
    {
      path: "/yeb",
      name: "yeb",
      component: () => import('./pages/yeb/yeb.vue'), //余额宝
      meta: {
        需要登录: true,
      }
    },
    {
      path: "/yebzhuanchu",
      name: "yebzhuanchu",
      component: () => import('./pages/yeb/yebzhuanchu.vue'), //余额宝转出转入
    },
    {
      path: "/kaijiang",
      components: {
        default: () => import('@/pages/开奖/开奖.vue'),
        // nav:nav
      }
    },
    {
      path: '/kjzs',
      component: () => import('./pages/开奖走势/开奖走势.vue'),
      meta: {
        不能返回: true
      }
    },
    {
      path:"/addBankCard",
      component:()=>import('@/pages/tixian/addBankCard.vue'),
    },
    {
      path:"/yhksz",
      component:()=>import('@/pages/tixian/yhksz.vue'),
    },
    {
      path: '/chatBoxes',
      component: () => import('./pages/聊天室/聊天室.vue'),
      meta: {
        需要登录: true,
      }
    },
    {
      path: "/privateChat",
      component: () => import('@/pages/聊天室/私聊.vue')
    },
    {
      path: "/chatlist",
      component: () => import('@/pages/聊天室/消息列表.vue')
    },
    {
      path: "/demo",
      component: () => import('@/pages/demo.vue')
    },
  ]
})
