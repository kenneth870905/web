<template>
    <div v-if="src" class="mui-fullscreen">
        <iframe :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "",
    data() {
        return {
            src: "",
            urlList: {
                qd: '/M/System/SignIn',
                ShouChong: '/Html/ShouChong/',
                vipbet: "/html/vipbet/",
                liuheHongbao: "/Html/MarkSix/",       //六合红包 ， 刮刮乐
                // liuheHongbao: "/Html/1/",       //六合红包 ， 刮刮乐
            },
            isapp:false
        }
    },
    computed: {
        ...mapState({
            config:"config",
        })
    },
    methods: {
        
    },
    mounted() {
        var this_1 = this;
        // /M/System/SignIn
        if(window.plus){
            this.isapp=true
            console.log('是App')
        }else{
            document.addEventListener('plusready', ()=>{
                this.isapp=true
                console.log('是App')
            });
        }

        if(this.$route.query.u){
            var u = this.$route.query.u;
            if(u==1){
                this.src = this.config.api_url +'/Html/1/index.html?back=1&t='+new Date();
            }else{
                u = u.startsWith('http') ? u : this.config.api_url+u;
                if(u.includes('?')){
                    this.src = u+'&back=1&t='+new Date().getTime() +'&app='+(this.isapp ? 1 : 0)
                }else{
                    this.src = u+'?back=1&t='+new Date().getTime() +'&app='+(this.isapp ? 1 : 0)
                }
            }
            // var u = this.$route.query.u;
        }else{
            var type = this.$route.params.type
            this.src = config.iframe_url + this.urlList[type];
        }
        
        if(window.appVue){
            window.appVue.toChongzhi = function () {
                this_1.$router.push('/my/chongzhi')
            };
        }else{
            window.appVue = {
                toChongzhi:function(){
                    this_1.$router.push('/my/chongzhi');
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: 100%;
}
</style>
