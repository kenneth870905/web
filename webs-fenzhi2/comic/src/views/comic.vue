<template>
    <div>
        <topHeader title="返回"/>
        <div v-for="(item,index) in 漫画" :key="index" class="漫画">
          <img :src="item.image" alt="" style="margin-top:-6px;">
        </div>
    </div>
</template>

<script>
import topHeader from "@/components/header.vue"
import {
    api_分类漫画详情
} from "@/api/api.js"
export default {
    data(){
        return{
            id:'',
            name:'',
            漫画:[]
        }
    },
    methods: {
         漫画详情() {
            var obj = {
                id: this.$route.query.id,
                huaId: this.$route.query.id,
            }
            api_分类漫画详情(obj).then(x => {
                console.log(x.data)
                this.漫画 = x.data
            })
        },
    },
    mounted() {
        this.漫画详情();
    },
      components: {
        topHeader,
    },
}
</script>

<style scoped>
    .漫画{
        width: 100%;
    }
    .漫画 img{
        width: 100%
    }
</style>