<template>
    <van-overlay :show="loadingShow" @click="loadingShow=false">
        loading
    </van-overlay>
</template>

<script>
export default {
    data() {
        return {
            loadCount:0,
            loadingShow:false
        }
    },
    methods:{
        show(){
            console.log(11111111)
            this.loadingShow=true
            console.log(this.loadingShow)
            this.$set(this,'loadingShow',true)
            this.loadCount++
        },
        close(){
            this.loadCount--
            if(this.loadCount<=0){
                this.loadingShow=false
            }
        }
    }
}
</script>


