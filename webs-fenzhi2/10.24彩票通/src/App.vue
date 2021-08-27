<template>
    <div id="app" class="app">
        <loginbtn v-if="登录框显示隐藏"></loginbtn>
        <register v-if="注册框显示隐藏"></register>
        <router-view class="router"/>
        <router-view name="底部" class="底部"></router-view>
    </div>
</template>
<script>
import loginbtn from '@/components/登陆/登陆.vue'
import register from '@/components/注册/注册.vue'
 import { mapState , mapMutations} from 'vuex'
export default {
    data() {
        return {
        }
    },
    components: {loginbtn,register},// 注册组件
    computed: {
        ...mapState({
            登录框显示隐藏:'登录框显示隐藏',
            注册框显示隐藏:'注册框显示隐藏'
        })
    },
    methods: { 
   
    },
    created() {
    },
    watch: {
        
    },
}
</script>
<style lang="scss">
.bjw{
  background: #1d1e23  !important;
}
.bjb{
  background: #ffffff ortant;
}
html,
body {
    padding: 0px;
    margin: 0px;
    transform: none;
    height: 100%;
    overflow: auto;
}
#app{
    height: 100%;
}
.fred {
    color: red;
}
.fgreen {
    color: green;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}



</style>
