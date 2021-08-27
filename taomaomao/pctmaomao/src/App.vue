<template>
    <div id="app">
        <navigation />
        <topSwiper />
        
        <div class="锚点"><div id="md"></div></div>
        <router-view class="router-view"></router-view>
        <bottomFotter />
    </div>
</template>

<script>
import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import bottomFotter from '@/components/bottomFotter.vue'
import { mapActions, mapState } from 'vuex'
export default {
    name: "",
    components: {
        navigation,
        topSwiper,
        bottomFotter
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            轮播图:"轮播图"
        })
    },
    methods: {
        ...mapActions({
            获取轮播图:"获取轮播图"
        })
    },
    mounted(){
        this.获取轮播图()
        if(window.innerWidth<750){
            location.href = '/m/index.html'
        }
    },
    // watch: {
    //     $route(){
    //         console.log(this.$route) 

    //     }
    // },
}
</script>

<style lang="scss">
html {
    height: 100%;
}
body {
    margin: 0px;
    height: 100%;
}
ul {
    padding: 0px;
    margin: 0px;
}
li {
    list-style: none;
}
* {
    box-sizing: border-box;
}
a{
    text-decoration: none;
    color: inherit;
}

.锚点{
    position: relative;
    #md{
        position: absolute;
        width: 100%;
        top: 200px;
    }
}


#app{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.router-view{
    flex:1
}
.w1200{
    width: 1200px;
    margin: 0px auto;
}
</style>
