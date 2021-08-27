<template>
    <div class="chongzhi">
        <van-nav-bar title="APP下载" left-arrow :fixed="true" @click-left="onClickLeft"/>
       
     </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
    
    },
    data() {
        return {
            
        }
    },
    methods: {
        onClickLeft(){
            history.back()
        },
       
    },
}
</script>

<style lang="scss" scoped>


</style>

