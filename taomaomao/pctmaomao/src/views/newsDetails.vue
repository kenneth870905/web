<template>
    <div class="w1200">
        <ul class="typeList">
            <li  @click="go(item)" :class="{active:id==item.id}" v-for="item in newsType">{{item.name}}</li>
        </ul>
        <div class="title">
            {{news.title}}
        </div>
        <div class="cont" v-html="news.content"></div>

    </div>
</template>

<script>
import moment from "moment"
import { mapActions, mapState } from 'vuex'
export default {
    name: "",
    data() {
        return {
            id:"",
            news:{}
        }
    },
    filters: {
        ft(time){
            return moment(time).format('YYYY-MM-DD');
        }  
    },
    computed: {
        ...mapState({
            newsType:"newsType"
        })
    },
    methods: {
        ...mapActions({
            getNewsType:"getNewsType"
        }),
        go(item){
            if(this.id==item.id){
                this.$router.push('/news')
            }else{
                this.$router.push('/news?t='+item.id)
            }
        },
        getNewsById(){
            this.$axios.post('/tmm/public/index.php/news/getNewsById',{id:this.id})
            .then(res => {
                if(res.data.code==1)
                this.news=res.data.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.id=this.$route.query.id
        if(this.newsType.length==0){
            this.getNewsType()
        }
        this.getNewsById()
    }
}
</script>

<style lang="scss" scoped>
.typeList {
    margin: 40px auto 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    li {
        width: 135px;
        height: 40px;
        margin: 0px 10px;
        line-height: 40px;
        border: 1px solid #eeeeee;
        text-align: center;
        cursor: pointer;
        &:hover{
            color: #e1a85b;
            border-bottom-color: #e1a85b;
        }
        &.active{
            color: #e1a85b;
            border-bottom-color: #e1a85b;
        }
    }
}

.title{
    text-align: center;
    color: #333333;
    font-size: 26px;
    line-height: 36px;
    padding: 0px 0px 30px;
    border-bottom: 1px solid #eeeeee;
    margin: 44px auto 50px;
}

.cont{
    margin: 0px auto 30px;
    min-height: 300px;
    img{
        max-width: 100%;
    }
}
</style>