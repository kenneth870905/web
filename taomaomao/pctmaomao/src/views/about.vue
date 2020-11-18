<template>
    <div class="w1200">
        <div class="t1">关于我们</div>
        <div class="cont" v-html="about.content"></div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            about:{}
        }
    },
    methods: {
        getAbout(){
            this.$axios.post('/tmm/public/index.php/about/getAbout','')
            .then(res => {
                this.about = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted() {
        this.getAbout()
    },
}
</script>

<style lang="scss" scoped>
.t1 {
    font-size: 35px;
    color: #e1a85b;
    line-height: 96px;
    letter-spacing: 1px;
    text-align: center;
    position: relative;
    margin: 55px 0px 50px;
    &::after {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 173px;
        height: 2px;
        margin: auto;
        content: "";
        background: #e1a85b;
    }
}
.cont{
    min-height: 500px;
    margin: 0px auto 30px;
    img{
        max-width: 100%;
    }
}
</style>
