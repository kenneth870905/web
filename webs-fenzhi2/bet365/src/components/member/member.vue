<template>
    <div>
        <Header/>
         <!-- <iframe @load="load_1()" style="width:100%;height:800px;" :src="config.iframe_url+'/Members/Info/Person?bet=1'" frameborder=""></iframe> -->
        <div v-if="type" style="width:100%;height:800px;">
            <iframe ref="iframe" @load="load_1()" v-if="iframe[type]" :src="config.iframe_url + iframe[type]" frameborder="0"></iframe>
        </div>
        <Fotter/>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue"; //头部组件引入
import Fotter from "@/components/Fotter/Fotter.vue";
export default {
    data(){
        return{
            height:600,
            config:config,
             iframe:{
                //会员中心
                'person':'/Members/Info/Person?bet=1',
                'deposit':'/Members/Money/Recharge?bet=1',
                'withdrawal':'/Members/Money/Withdraw?bet=1',
                'orders':'/Members/Info/MyOrder?bet=1'
            },
            type:"",
            loading_1:""
        }
    },
     components: {
    // 注册组件
    Header,
    Fotter,
  },
  methods:{
       init(){
            this.loading_1 = this.$loading({ 
                fullscreen: true, 
                text: 'Loading',
                // spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.type=this.$route.params.type;
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.loading_1.close();
                },500)
            })
        },
      load_1(){
            // var iframe = document.getElementById(id);
            var iframe=this.$refs.iframe
            try {
                var height =  iframe.contentWindow.document.documentElement.scrollHeight;
                this.height=height;
            } catch (error) {}
        }
  },
  mounted(){
       this.init();
       this.type=this.$route.query.t
  },
  watch:{
      $route(){
          this.type='';
          this.$nextTick(()=>{
               this.type=this.$route.query.t
          })
      }
  }
  
}
</script>
<style lang="">
.iframe_box{
 height: 800px;
}
iframe{
  height: 100%;
  width: 100%;
}
</style>