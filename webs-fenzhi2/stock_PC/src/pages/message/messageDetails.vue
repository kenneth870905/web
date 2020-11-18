<template>
    <div>
        <div v-wechat-title="$route.meta.title=indexTitle"></div>
       这是第{{id}}条资讯信息
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            indexTitle:"",
            id:"",
            list:[]
        }
    },
    mounted(){
        //获取id
        this.id=this.$route.query.id
        // 把id的值赋值给title
        this.indexTitle=this.$route.query.id+'条'
        console.log(this.$route)
    }
}
</script>
