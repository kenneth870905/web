<template>
    <div class="维护中">
        <img :src="config.img_url+'static/image/weihu.jpg'" alt="" srcset="">
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
}
</script>

<style lang="scss" scoped>
.维护中{
    display: none;
    position: fixed;
    z-index: 20;
    top: 0px;
    left: 0px;
    height: 100%;
    display: flex;
    background: #ffffff;
    align-items: center;
    img{
        width: 100%;
    }
}
</style>