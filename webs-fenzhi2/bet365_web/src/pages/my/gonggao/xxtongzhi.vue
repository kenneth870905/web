<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">消息列表</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            

            <van-list
                v-model="loading"
                :finished="!loading && total<=list.length"
                finished-text="暂无相关数据"
                @load="onLoad"
            >
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                        <div class="mui-table">
                            <div class="mui-table-cell mui-col-xs-12 table-title mui-text-left">
                                <h4 class="mui-ellipsis" v-text="item.Content" style="white-space: normal;"></h4>
                                <p class="mui-h6" v-text="item.Createtime"></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>

        </div>
    </div>
</template>

<script>
import { api_获取消息列表 } from "@/api/公告接口.js";
export default {
    name:"",
    data() {
        return {
            list:[],
            loading: true,
            total: 0,
            query:{
                page: 1,
                rows: 15
            }
        }
    },
    methods: {
        onLoad(){

        },
        获取数据(){
            this.loading=true
            api_获取消息列表(this.query).then(x=>{
                this.total=x.data.total;
                this.list=[...this.list,...x.data.rows];
                this.loading=false
            }).catch(err=>{
                this.loading=false
            })
        }
    },
    mounted() {
        this.获取数据();
    },
}
</script>

<style>
.mui-bar .mui-icon:active {
    opacity: 1;
}
.mui-bar{
        background-color: #2d2d2d;
}
.mui-title{
    color: white;
}
.mui-bar .mui-icon{
        color: white;
}
</style>
