<template>
    <div class="img_box">
        找不到路径：{{$route.fullPath}}
        <img src="static/image/404.jpg" alt="" srcset="">
    </div>
</template>

<script>
// import axios from 'axios'
import { api_Online } from "@/api/登录接口.js";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
    },
    beforeDestroy () {
    },
}
</script>

<style lang="scss" scoped>
.img_box{
    height: 100%;
    display: flex;
    background: #ffffff;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img{
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
