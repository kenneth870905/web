<template>
    <div>
        <navigation />
        <topSwiper />

        <div class="pz_SideLayer" >
            <li @click="$router.replace('/news?id='+item.id)" :class="{active:item.id == news.typeId}" v-for="(item, index) in type" :key="index"><a>{{item.name}}</a></li>
        </div>

        <div class="title-1">{{news.title}}</div>

        <div class="content" v-html="news.content">
        </div>

        <div class="上下">
            <div>上一篇：<span>布偶猫</span></div>
            <div>下一篇：<span>曼基康猫</span></div>
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
            id:"",
            news:{},
            type:[]
        }
    },
    methods: {
        getType(){
            this.$axios.post('news/getType','')
            .then(res => {
                if(res.data.code==1)
                this.type = res.data.data
            })
            .catch(err => {
            })
        },
        getNews(){
            this.$axios.post('News/getNewsById',{id:this.id})
            .then(res => {
                if(res.data.data)
                this.news = res.data.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getNews()
        this.getType()
    },

}
</script>

<style lang="scss" scoped>
.pz_SideLayer {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px 0px;
    .active a {
        color: #e1a85b;
        border-bottom-color: #e1a85b;
    }
    li {
        width: 50%;
        padding: 5px;
        a {
            padding: 10px 2px;
            color: #666;
            font-size: 14px;
            line-height: 18px;
            text-align: center;
            display: block;
            border: 1px solid #eeeeee;
        }
    }
}

.title-1 {
    text-align: center;
    font-size: 20px;
    margin: 30px 0px 10px;
    line-height: 28px;
}
.content {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding: 10px 10px 10px;
}
.上下{
    margin: 10px 5px;
    font-size: 14px;
    line-height: 24px;
    color: #333;
}
</style>
