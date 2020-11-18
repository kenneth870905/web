<template>
    <div class="app">
        <router-view class="router"></router-view>
    </div>
</template>

<script>
import { mapActions, mapState , mapMutations } from "vuex";
export default {
    name: "",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            user:'user'
        })
    },
    methods: {
        ...mapActions({
            // 刷新token:'user/刷新token',
            获取user:'user/获取user',
        }),
        ...mapMutations({
            修改state:"user/修改state"
        }),
        获取user(){
            this.$axios.post('/user/getUser').then(x=>{
                if(!x.data.message){
                    // commit('修改state',['userinfo',x.data]);
                    this.修改state(['userinfo',x.data])
                    this.修改state(['token有效',true])
                }else{
                    this.修改state(['token有效',false])
                }
            }).catch(err=>{
                Toast(x.data.message);
            })
        }
    },
    mounted() {
        this.获取user()
        // this.刷新token()

        // this.$toast.loading({mask: true,duration:0})
        // this.$toast.clear();
    },
}
</script>

<style lang="scss">
html,
body {
    height: 100%;
    font-size: _vw(16);
}
.app {
    height: 100%;
}
.router {
    height: 100%;
}
.Footer{
    z-index: 1;
}
.Footer + .Main{
    padding-bottom: 50px;
}
.van-nav-bar--fixed ~ .Main{
    padding-top: 46px;
}
.van-nav-bar.蓝色{
    background-color: #5177f7 !important;
    .van-icon{
        color: #ffffff !important;
    }
    .van-nav-bar__text{
        color: #ffffff;
    }
    .van-nav-bar__title{
        color: #ffffff;
    }
}

</style>


