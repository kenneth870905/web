<template>
    <div>
        <div v-wechat-title="$route.meta.title=indexTitle"></div>

        
        <li>这是第{{id}}条新闻详情</li>
     
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            indexTitle:"",//浏览器title
            id:"", 
            list:[]
        }
    },
    mounted(){
        //把接受到的ID对应的数据保存到此页面的id上
        this.id=this.$route.query.id
        // 把接受到的id对应的标题赋值给浏览器title;
        this.indexTitle=this.$route.query.id+'条'
        // console.log(this.$route)
    }
}
</script>
