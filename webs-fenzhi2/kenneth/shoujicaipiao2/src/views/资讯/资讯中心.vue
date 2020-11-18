<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">资讯中心</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="头部">
                <li :class="{'active':type==0}" @click="type=0">新闻资讯</li>
                <li :class="{'active':type==1}" @click="type=1">购彩技巧</li>
            </ul>
            <div class="内容">
                <ul class="mui-table-view" v-if="type==0">
                    <li @click="$router.push('/zx/xq?i='+item.essayId)" class="mui-table-view-cell" v-for="(item, index) in 新闻.list" :key="index">
    					<a class="mui-navigate-right item">
                            <div class="标题">{{item.title}}</div>
                            <!-- <div class="来源">
                                <span class="时间">{{item.createDate | formatDate}}</span>
                                <span class="时间"></span>
                                <span class="来源">
                                    <span>查看详情</span>
                                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                                </span>
                            </div> -->
    					</a>
                    </li>
                </ul>
                <ul class="mui-table-view"  v-if="type==1">
                    <li @click="$router.push('/zx/xq?i='+item.essayId)" class="mui-table-view-cell" v-for="(item, index) in 购彩技巧.list" :key="index">
    					<a class="mui-navigate-right item">
                            <div class="标题">{{item.title}}</div>
                            <!-- <div class="来源">
                                <span class="时间">{{item.createDate | formatDate}}</span>
                                <span class="来源"></span>
                            </div> -->
    					</a>
                    </li>
                </ul>
                
            </div>
        </div>        
    </div>
</template>

<script>
import { escape2Html } from "@/assets/js/通用.js";
import { mapState } from 'vuex';
export default {
    nameL:"",
    data() {
        return {
            type:0,
            新闻:{
                total:0,
                list:[]
            },
            购彩技巧:{
                total:0,
                list:[]
            }
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
    computed: {
        ...mapState({
            config:'config' 
        })
    },
    mounted() {
        // Content-Type:application/json;charset=UTF-8
        // timestamp:1561530629358
        // sign:be56917ec5f2a911f79255e673f89177
        // deviceId:h5-8G5RK9AJS1VJMLT38IGMQIGU9QVTO8M7
        // Origin:https://q17k46f85m.zshsiangyuan.com
        // User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1
        // Referer:https://q17k46f85m.zshsiangyuan.com/

        // https://q17k46f85m.zshsiangyuan.com/api/v2/cms/queryAdvisoryEssayList
        this.$axios.get('static/json/zixun.json').then(x=>{
            this.新闻.list=x.data.list;
            this.购彩技巧.list=x.data.list1
        }).catch(err=>{})
    
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;

}
.头部{
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    font-size: _vw(16);
    line-height: _vw(40);
    background: #ffffff;
    li{
        padding: 0px _vw(3);
    }
    .active{
        color: $color;
        border-bottom: 2px solid red;
    }
}

.内容{
    flex-grow: 1;
    overflow: auto;
    margin: _vw(5) 0px 0px;
}
.item{
    .标题{
        font-size: _vw(14);
        color: #3d3d3d;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .来源{
        font-size: _vw(12);
        display: flex;
        justify-content: space-between;
        margin: _vw(3) 0px 0px;
        color: #a2a3a2;
        align-items: center;
        i{
            transform: rotate(-90deg);
            margin: 3px 0px 0px;
        }
        .时间{
            color: #e5645e;
        }
    }
}

</style>
