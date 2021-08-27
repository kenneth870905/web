<template>
    <div class="footer">
        版权所有 © 淘喵喵 <a href="http://www.miitbeian.gov.cn" target="_blank">沪ICP备19015020号-1</a>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            position:{}
        }
    },
    computed: {
        
    },
    methods: {
        // 设置位置() {
        //     let bodyHeight = document.body.scrollHeight
        //     let wHeight = window.innerHeight
        //     if (bodyHeight < wHeight) {
        //         this.position =  { position: 'fixed' }
        //     } else {
        //         this.position = {}
        //     }
        // }
    },
    mounted() {
        // setTimeout(()=>{
        //     this.设置位置()
        // },1000)
    },
}
</script>

<style lang="scss" scoped>
.footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: #000;
    z-index: 9;
    padding: 15px 10px;
    color: #9e9e9e;
    font-size: 12px;
    text-align: center;
}
</style>
