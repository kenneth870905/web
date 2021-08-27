<template>
    <div class="w1200">
        <ul class="typeList">
            <li  @click="go(item)" :class="{active:id==item.id}" v-for="item in newsType">{{item.name}}</li>
        </ul>

        <ul class="list2">
            <li v-for="item in news.data" @click="$router.push('/newsDetails?id='+item.id)">
                <div class="l">
                    <img :src="$img_url+item.cover" alt="" srcset="">
                </div>
                <div class="r">
                    <div class="title">{{item.title}}</div>
                    <div class="text">{{item.intro}}</div>
                    <div class="f">
                        <span>{{item.lastTime | ft}}</span>
                        <span>more+</span>
                    </div>
                </div>
            </li>
        </ul>

        <el-pagination v-if="news.last_page>1" @current-change="currentChange" class="pages" background layout="prev, pager, next" :total="news.total"></el-pagination>
    </div>
</template>

<script>
import moment from "moment"
import { mapActions, mapState } from 'vuex'
export default {
    name: "",
    data() {
        return {
            news:{
                current_page: 1,
                data: [],
                last_page: 1,
                per_page: 10,
                total: 0,
            }
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
        }),
        id(){
            return this.$route.query.t
        }
    },
    methods: {
        ...mapActions({
            getNewsType:"getNewsType"
        }),
        go(item){
            if(this.id==item.id){
                this.$router.replace('/news')
            }else{
                this.$router.replace('/news?t='+item.id)
            }
        },
        getNewsList(){
            var p = {
                    list_rows: this.news.per_page,      //每页显示条数
                    page: this.news.current_page,            //当前页
                    typeId: this.id          
                }
            this.$axios.post('/tmm/public/index.php/news/getNewsList',p)
            .then(res => {
                if(res.data.code==1)
                this.news = res.data.data
            })
            .catch(err => {
            })
        },
        currentChange(p){
            this.news.current_page=p;
            this.getNewsList()
        },
        init(){
            this.news={
                current_page: 1,
                data: [],
                last_page: 1,
                per_page: 10,
                total: 0
            }
            this.getNewsList()
        }
    },
    mounted() {
        if(this.newsType.length==0){
            this.getNewsType()
        }
        this.getNewsList()
    },
    watch: {
        id(){
            this.init()
        }
    },
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

.list2 {
    min-height: 500px;
    li {
        display: flex;
        background: #f6f6f6;
        margin: 0px 0px 30px 0px;
        cursor: pointer;
        &:hover {
            .l {
                img {
                    transform: scale(1.3);
                }
            }
            .title {
                color: #e1a85b;
            }
        }
    }
    .l {
        flex-shrink: 0;
        width: 330px;
        height: 330px / 16 * 9;
        // padding: 20px;
        margin: 30px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s;
        }
    }
    .r {
        flex: 1;
        padding: 30px;
        border-left: 2px solid #fff;
        display: flex;
        flex-direction: column;
    }
    .title {
        color: #1c1c1c;
        letter-spacing: 1px;
        transition: all 0.3s;
    }
    .text {
        margin: 40px 0px 0px;
        font-size: 14px;
        color: #898989;
        line-height: 26px;
        height: 78px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .f {
        flex: 1;
        align-items: flex-end;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #a9a9a9;
        line-height: 24px;
    }
}

.pages{
    margin: 0px auto 30px;
    text-align: center;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:#e1a85b;
}
</style>