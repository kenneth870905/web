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
  data(){
    return{
      
    }
  },
  components: {
    Tabbar,
    jryxtk,
    xtxx
  },
  computed:{
    ...mapState({
      显示进入游戏弹框:'显示进入游戏弹框',
       config:'config'
    })
  },
   // 监听,当路由发生变化的时候执行
  watch:{
    $route(to){
      //判断是否显示tabbar 
      if(to.path == '/' || to.path == '/index' || to.path == '/my' || to.path == '/tzjilu' || to.path == '/registered' ){
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
  methods:{
    ...mapActions({
            getUserInfo: 'user/getUserInfo',
            获取json配置:'获取json配置',
            读取配置:'读取配置',
        }),
        设置获取私聊列表(){
            var url1 = ['/','/home/home','/yxdt','/orders','/discovery','/my','/chatBoxes','/chatlist'];
            var path=this.$route.path;

            if(url1.includes(path)){
                this.获取消息列表()
            }else{
                this.取消获取列表();
            }
        }
    // 获取配置文件() {
    //     this.读取配置();
    // }
  },
  mounted(){
    this.读取配置()
  }
}
</script>

<style>

</style>
