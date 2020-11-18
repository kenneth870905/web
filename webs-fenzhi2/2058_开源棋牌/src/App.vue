<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view />
    <!-- 底部导航栏 -->
    <Tabbar v-if="tabbarShow"></Tabbar>
    <!-- 进入游戏弹窗 -->
    <jryxtk  />
    <!-- 系统消息弹框 -->
    <xtxx/>
  </div>
</template>

<script>
const jryxtk = () => import('@/components/jryxtk.vue');
const xtxx = () => import('@/components/系统消息弹框.vue');
import Tabbar from '@/components/tabbar/tabbar.vue'
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
export default {
  name: 'app',
  components: {
    Tabbar,
    jryxtk,
    xtxx
  },
  computed:{
    ...mapState({
       config:'config',
      显示进入游戏弹框:'显示进入游戏弹框',
    })
  },
   // 监听,当路由发生变化的时候执行
  watch:{
    $route(to){
      //判断是否显示tabbar 
      if(to.path == '/' || to.path == '/index' || to.path == '/my' || to.path == '/tzjilu'){
        this.$store.commit('updateTabbarShow',true);
      }else{
        this.$store.commit('updateTabbarShow',false);
      }
    },
 },
  computed: {
    tabbarShow(){
      return this.$store.getters.getTabbarShow
    },
  },
   mounted(){
    this.读取配置()
  },
  methods:{
     ...mapActions({
            getUserInfo: 'user/getUserInfo',
            获取json配置:'获取json配置',
            读取配置:'读取配置'
        }),
  }
}
</script>

<style>

</style>
