<template>
    <div>
        <div class="t1">保障</div>
        <div class="cont">
            <img v-if="img" :src="$img_url+img" alt="" srcset="">
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            img:''
        }
    },
    methods: {
        getsafeguard() {
            this.$axios.get('/tmm/public/index.php/safeguard/getImg', '').then(res => {
                this.img = res.data.data.img
            }).catch(err => {
            })
        }
    },
    mounted(){
        this.getsafeguard()
    }
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
    text-align: center;
    margin: 0px auto 30px;
    img{
        min-width: 50%;
        max-width: 100%;
    }
}
</style>
