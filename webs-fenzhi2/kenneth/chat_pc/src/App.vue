<template>
    <div id="app" :style="{'--color':用户颜色}">
        <router-view></router-view>
        
        <dltk />
    </div>
</template>

<script>
import axios from "axios";
const dltk = () =>import('@/components/登录弹出框.vue')
import { mapState , mapGetters , mapMutations , mapActions} from "vuex";
export default {
    name: "",
    data() {
        return {

        }
    },
    components:{
        dltk
    },
    computed: {
        ...mapState({
            config:"config" 
        }),
        ...mapGetters({
            用户颜色:'user/用户颜色' 
        })
    },
    methods: {
        ...mapActions({
            getUserInfo:'getUserInfo',
            获取个人资料:'获取个人资料'
        }),
        获取配置文件() {
            var title_1 = this.config.title;
            var url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
            var url1 = config.api_url + '/App_Upload/Agents/Json/' + url + '.json';
            this.config.title=''
            // axios.get('http://1996996.com/App_Upload/Agents/Json/www.1996996.com.json').then(x=>{
            axios.get(url1).then(x => {
                console.log(x)
                var data = x.data;
                if (data.Logo) {
                    // 设置LOGO
                    this.config.showlog=true;
                    this.config.logo='/App_Upload/Agents/Logo/' + data.Id + '.png'
                }
                document.title = data.Title;
                this.config.title=data.Title;
            }).catch(err => {
                console.log(err);
                document.title = title_1;
                this.title=title_1
                this.config.showlog=true
            })
        }
    },
    beforeCreate: function () {
        
        // if (document.body.clientWidth <= 750) {
        //     location.href = config.mobile_url
        // }
    },
    mounted() {
        this.getUserInfo();
        this.获取个人资料();
        this.获取配置文件();

        setInterval(() => {
            this.getUserInfo();
        }, 1000*60);
    },
}
</script>


<style lang="scss">
html,body,#app{
    height: 100%;
    padding: 0px;
    margin: 0px;
}

ul{
    padding: 0px;
    margin: 0px;
}
li{
    padding: 0px;
    margin: 0px;
    list-style: none;
}

.el-message{
    top: 50% !important;
}
</style>
