<template>
    <div class="generalizeAdmin">
        <header class="mui-bar mui-bar-nav" v-if="!$route.meta.不显示顶部">
            <a v-show="!$route.meta.无返回键" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">推广管理</h1>
        </header>
        <div class="提示">
            <i class="icon iconfont icon-gantanhao"></i>
            <span>添加绑定代理线请访问电脑版网站查看</span>
        </div>
        <table>
            <thead class="header">
                <tr>
                    <td>返佣类型</td>
                    <td>推广链接</td>
                    <td>会员</td>
                    <td>总收益</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody class="tbody">
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{item.TuiShuiType}}</td>
                    <td>{{item.Domain}}</td>
                    <td>{{item.MemberCount}}</td>
                    <td>{{item.TuiShuiTotal}}</td>
                    <td>
                        <div @click="复制(item)" class="btn_1">复制链接</div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import { api_获取推广链接 } from "@/api/代理接口.js";
import 复制 from '@/assets/js/复制.js'
export default {
    // name:"",
    data() {
        return {
            list:[]
        }
    },
    methods: {
        复制(item){
            复制(this , item.Domain)
            // if(navigator.userAgent.indexOf("Html5Plus")<0){
            //     //网页打开
            //     复制(item.Domain)
            // }else{

            // }
        },
    },
    mounted() {
        api_获取推广链接().then(x=>{
            console.log(x);
            var data=x.data;
                data.forEach(item => {
                    if(item.Url){
                        item.Domain=item.Url
                    }else{
                        item.Domain= (location.host ? location.host : config.agency_url)  + '/p/' +item.Id
                    }
                });
            this.list=x.data;
        })
    },
}
</script>

<style lang="scss" scoped>
.提示 {
    padding: 10px;
    font-size: 12px;
    i {
        margin: 0px 5px 0px 0px;
        color: $color;
    }
    color: #888888;
}
//头部样式
header {
    height: _vw(44);
    .mui-icon-left-nav,
    .mui-title {
        font-size: _vw(18);
        line-height: _vw(40);
        padding: 0px;
    }
    .mui-bar-nav {
        height: _vw(44);
    }
    position: relative;
    span {
        position: absolute;
        right: _vw(10);
        top: 0px;
        color: #ffffff;
        line-height: _vw(44);
        font-size: _vw(15);
    }
}

//内容部分
table {
    table-layout: fixed;
    width: 100%;
    td{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    td:nth-child(1){
        width: _vw(85);
    }

    td:nth-child(3){
        width: _vw(50);
    }
    td:nth-child(4){
        width: _vw(60);
    }
    td:nth-child(5){
        width: _vw(60);
    }
    thead {
        width: 100%;
        tr {
            width: 100%;
            td {
                text-align: center;
                font-size: _vw(12);
                background: #b9b9b9;
                color: #fff;
                height: _vw(32);
            }
            td:not(:nth-child(1)){
                border-left: 1px solid #eeeeee;
            }
        }
    }
    .tbody {
        tr {
            width: 100%;
            td {
                text-align: center;
                font-size: _vw(12);
                height: _vw(32);
                border-top: 1px solid #eeeeee;
            }
            td:not(:nth-child(1)){
                border-left: 1px solid #eeeeee;
            }
        }
        tr:nth-child(2n-1){
            background: #fff;
        }
        tr:nth-child(2n){
            background: #f7f7f7;
        }

        .btn_1{
            display: inline-block;
            padding: 3px;
            background: #565656;
            color: #ffffff;
        }
    }
}
</style>