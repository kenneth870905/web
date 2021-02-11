<template>
    <div id="app">
        <top v-show="showTop"/>
        <top2 v-show="showTop" ref="top2"/>

        <router-view />
        <el-backtop ></el-backtop>
        <fot />
    </div>
</template>

<script>
import top from '@/components/top.vue'
import top2 from '@/components/top2.vue'
import fot from '@/components/fot.vue'
export default {
    name:"",
    provide(){
        return {
            setLeftMenu:(type)=>{
                // console.log(this.$refs.top2)
                if(type){
                    this.$refs.top2.showLfetMenu=true
                }
            }
        }
    },
    components:{
        top,
        top2,
        fot
    },
    data() {
        return {
            
        }
    },
    computed:{
        showTop(){
            return this.$route.path != '/register'
        }
    },
    watch:{
        $route(){
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>

<style lang="scss">
body{
    margin: 0px;
    // background: #f5f5f5;
}


.w1200,
.w1280{
    width: 1280px;
    margin: auto;
}
ul{
    margin: 0px;
    padding: 0px;
}
li{
    list-style: none;
}
*{
    box-sizing: border-box;
}

.breadcrumb{
    padding: 20px 0px;
}
</style>
