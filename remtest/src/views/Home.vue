<template>
    <div class="home">
        <router-link tag="button" to="/about">高度100%</router-link>
        <router-link tag="button" to="/a">内部滚动条页面</router-link>
        <br>
        <button @click="$loading.show()">loading</button>

        <div>
            <van-button type="primary" @click="setlogin">{{islogin ? '退出' : "登录"}}</van-button>
        </div>

        <van-button type="primary" @click="show=true">弹框测试</van-button>

        <van-dialog v-model="show" :showCancelButton="true">
            <slot name="content">
                <p>圆角白边测试圆角白圆角白边测试圆角白边测试边测试圆角白边测试</p>
            </slot>
        </van-dialog>
        <div class="box-1">
            滚动字幕1
            <marquee scrolldelay="60" scrollamount="3">{{str}}</marquee>
        </div>

        <div class="box-1">
            滚动字幕2
            <van-notice-bar class="van-notice" :scrollable="true" :text="str" />
        </div>

        <div v-for="item in 30">{{item}}</div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    components: {

    },
    data() {
        return {
            show: false,
            str: '',
            islogin:false
        }
    },
    methods:{
        setlogin(){
            this.islogin=!this.islogin
            this.$parent.islogin=this.islogin
        }
    },
    mounted() {
        setInterval(() => {
            this.str = "代码是写给别人看的，哈哈、哈哈、哈哈"
        }, 2000);
    },
}
</script>

<style lang="scss" scoped>
marquee {
    font-size: 14px;
}
.van-notice {
    font-size: 14px;
}

.box-1 {
    margin: 10px 0px;
    background: #eee;
}
</style>
