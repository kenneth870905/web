<template>
    <div>
        <navigation />
        <topSwiper />

        <div class="title-1">关于我们</div>

        <div class="content2" v-html="about.content">
        </div>

        <footer1 />
    </div>
</template>

<script>
import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import footer1 from '@/components/footer.vue'
export default {
    name: "",
    components: {
        navigation,
        topSwiper,
        footer1
    },
    data() {
        return {
            about:{}
        }
    },
    methods: {
        getAbout(){
            this.$axios.post('about/getAbout','')
            .then(res => {
                if(res.data.code==1)
                this.about = res.data.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.getAbout()
    },
}
</script>

<style lang="scss" scoped>
.title-1 {
    position: relative;
    font-size: 28px;
    color: #e1a85b;
    line-height: 56px;
    letter-spacing: 1px;
    text-align: center;
    margin: 50px 0px 0px;
    &::after {
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

.content2{
    margin: 20px 10px;
}
</style>
