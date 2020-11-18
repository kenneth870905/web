<template>
    <div>
        <navigation />
        <topSwiper/>
        <div class="title-1">淘喵喵·名猫体验馆</div>

        <div class="img">
            <img v-if="CatCafe.img" :src="`${$api_url}/tmm/public/storage/${CatCafe.img}`" alt="" srcset="">
        </div>

        <footer1 />
    </div>
</template>

<script>

import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import footer1 from '@/components/footer.vue'
export default {
    name:'',
    components:{
        navigation,
        topSwiper,
        footer1
    },
    data() {
        return {
            CatCafe:{}
        }
    },
    methods: {
        getCatCafe(){
            this.$axios.post('Catcafe/getImg','')
            .then(res => {
                if(res.data.code==1)
                this.CatCafe=res.data.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.getCatCafe()
    },
}
</script>

<style lang="scss" scoped>
.title-1{
    position: relative;
    font-size: 28px;
    color: #e1a85b;
    line-height: 56px;
    letter-spacing: 1px;
    text-align: center;
    margin: 50px 0px 30px;
    &::after{
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        content: "";
        width: 173px;
        height: 2px;
        background: #e1a85b;
    }
}
.img img{
    width: 100%;
}
</style>
