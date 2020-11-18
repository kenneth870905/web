
<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">文章详情</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="头部">
                <div class="标题">{{当前新闻.title}}</div>
                <div class="来源">
                    <!-- <span>{{当前新闻.createDate | formatDate}}</span> -->
                    <!-- <span>|</span>
                    <span>来源:{{config.title}}手游</span> -->
                </div>
            </div>
            <div class="content" v-html="当前新闻.content_1"></div>
        </div>
        
    </div>
</template>

<script>
import { escape2Html } from "@/assets/js/通用.js";
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            新闻:[],
            技巧:[],
            id:""
        }
    },
    computed: {
        ...mapState({
            config:'config'
        }),
        当前新闻(){
            if(this.id){
                var obj1=this.新闻.find(x=>x.essayId==this.id);
                var obj2=this.技巧.find(x=>x.essayId==this.id);
                if(obj1){
                    obj1.content_1= escape2Html(obj1.content)
                    return obj1
                }else if(obj2){
                    obj2.content_1=escape2Html(obj2.content)
                    return obj2
                }else{
                    return {}
                }
            }
            return {}
        }
    },
    filters:{
        formatDate: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d;
            // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    },
    mounted() {
        this.$axios.get('static/json/zixun.json').then(x=>{
            this.新闻=x.data.list;
            this.技巧=x.data.list1
        }).catch(err=>{})
        this.id=this.$route.query.i

    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ffffff;
}

.头部{
    padding: _vw(10);
    .标题{
        font-size: _vw(24);
    }
    .来源{
        margin: _vw(10) 0px;
        display: flex;
        font-size: _vw(12);
        color: #999;
        span{
            padding: 0px _vw(3);
        }
        // span:nth-child(1){
        //     border-right: 1px solid #999;
        // }
    }
}

.content{
    padding: _vw(5);
    /deep/ img{
        max-width: 100%
    }
}
</style>
