import Vue from 'vue'
import Router from 'vue-router'
import idnex from '@/components/index'
import Header from '@/components/Header/Header.vue'
import Fotter from '@/components/Fotter/Fotter.vue'
import entergame from'@/components/entergame.vue'
import member from '@/components/member/member.vue'
import tiyusaishi from '@/pages/tiyusaishi/tiyusaishi.vue'
// 视讯直播
import shixunzhibo from '@/pages/shixunzhibo/shixunzhibo.vue'
import ag from '@/pages/shixunzhibo/AG/ag.vue'
import bg from '@/pages/shixunzhibo/BG/bg.vue'
import ds from '@/pages/shixunzhibo/DS/ds.vue'
import eb from '@/pages/shixunzhibo/EB/eb.vue'
import og from '@/pages/shixunzhibo/OG/og.vue'
import ab from '@/pages/shixunzhibo/ab/ab.vue'
import im from '@/pages/shixunzhibo/im/im.vue'
import wm from '@/pages/shixunzhibo/wm/wm.vue'
import bbin from '@/pages/shixunzhibo/BBIN/bbin.vue'
//彩票游戏
import caipiaoyouxi from '@/pages/caipiaoyouxi/caipiaoyouxi.vue'
//优惠活动
import  youhuihuodong from '@/pages/youhuihuodong/youhuihuodong.vue'
//电子游艺
import dianziyouyi from '@/pages/dianziyouyi/dianziyouyi.vue'
//备用网址
import beiyongwangzhi from '@/pages/beiyongwangzhi/beiyongwangzhi.vue'
//立即开户
import lijikaihu from '@/pages/lijikaihu/lijikaihu.vue'
//代理注册
import dailizhuce from '@/pages/dailizhuce/dailizhuce.vue'
//footer
import guanyuwomen from '@/pages/guanyuwomen/guanyuwomen.vue'
import lianxiwomen from '@/pages/lianxiwomen/lianxiwomen.vue'
import bocaizenren from '@/pages/bocaizenren/bocaizenren.vue'
import tiaokuan from '@/pages/tiaokuan/tiaokuan.vue'
import jianjie from '@/pages/jianjie/jianjie.vue'
import zhengce from '@/pages/zhengce/zhengce.vue'
import bangzhu from '@/pages/bangzhu/bangzhu.vue'
import changjianwenti from '@/pages/changjianwenti/changjianwenti.vue'
import daili from '@/pages/daili/daili.vue'
//手机下注
import shoujixiazhu from '@/pages/shoujixiazhu/shoujixiazhu.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: idnex
    },
    {
      path: '/Header',
      name: 'Header',
      component: Header
    },
    {
      path: '/Fotter',
      name: 'Fotter',
      component: Fotter
    },
    {
      path: '/entergame',
      name: 'entergame',
      component :entergame
    },
    {
      path: '/shoujixiazhu',
      name: 'shoujixiazhu',
      component :shoujixiazhu
    },
    {
      path: '/member',
      name: 'member',
      component :member
    },
    {
      path: '/tiyusaishi',
      name: 'tiyusaishi',
      component :tiyusaishi
    },
    {
      path: '/shixunzhibo',
      name: 'shixunzhibo',
      component :shixunzhibo,
    },
    {
      path: '/ag',
      name: 'ag',
      component: ag
    },
    {
      path: '/bg',
      name: 'bg',
      component: bg
    },
    {
      path: '/ds',
      name: 'ds',
      component: ds
    },
    {
      path: '/eb',
      name: 'eb',
      component: eb
    },
    {
      path: '/og',
      name: 'og',
      component: og
    },
    {
      path: '/ab',
      name: 'ab',
      component: ab
    },
    {
      path: '/im',
      name: 'im',
      component: im
    },
    {
      path: '/wm',
      name: 'wm',
      component: wm
    },
    {
      path: '/bbin',
      name: 'bbin',
      component: bbin
    },
    {
      path: '/caipiaoyouxi',
      name: 'caipiaoyouxi',
      component: caipiaoyouxi
    },
    {
      path: '/youhuihuodong',
      name: 'youhuihuodong',
      component: youhuihuodong
    },
    {
      path: '/dianziyouyi',
      name: 'dianziyouyi',
      component: dianziyouyi
    },
    {
      path: '/beiyongwangzhi',
      name: 'beiyongwangzhi',
      component: beiyongwangzhi
    },
    {
      path: '/lijikaihu',
      name: 'lijikaihu',
      component: lijikaihu
    },
    {
      path: '/dailizhuce',
      name: 'dailizhuce',
      component: dailizhuce
    },
    {
      path: '/guanyuwomen',
      name: 'guanyuwomen',
      component: guanyuwomen
    },
    {
      path: '/lianxiwomen',
      name: 'lianxiwomen',
      component: lianxiwomen
    },
    {
      path: '/bocaizenren',
      name: 'bocaizenren',
      component: bocaizenren
    },
    {
      path: '/tiaokuan',
      name: 'tiaokuan',
      component: tiaokuan
    },
    {
      path: '/jianjie',
      name: 'jianjie',
      component: jianjie
    },
    {
      path: '/zhengce',
      name: 'zhengce',
      component: zhengce
    },
    {
      path: '/bangzhu',
      name: 'bangzhu',
      component: bangzhu
    },
    {
      path: '/changjianwenti',
      name: 'changjianwenti',
      component: changjianwenti
    },
    {
      path: '/daili',
      name: 'daili',
      component: daili
    },
  ]
})
