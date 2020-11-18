<template>
    <div>
        <header class="mui-bar mui-bar-nav" @click="$router.back()">
            <a  class=" mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">存取记录</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="header_1">
                <li :class="{'active':query.type==2}" @click="切换类型(2)">手机转账</li>
                <li :class="{'active':query.type==1}" @click="切换类型(1)">在线充值</li>
                <li :class="{'active':query.type==3}" @click="切换类型(3)">提款记录</li>
            </ul>

            <van-list v-model="loading" :finished="total<=list.length" finished-text="没有更多了" @load="onLoad" >
                <ul class="mui-table-view list">
                    <li class="mui-table-view-cell" v-for="(item,index) in list" :key="index">
                        <div class="mui-table">
                            <div class="mui-table-cell mui-col-xs-7 table-title">
                                <h4 class="mui-ellipsis title_1" style="font-weight: 600;padding-bottom:5px;">{{item.Title}}</h4>
                                <p class="mui-h6 mui-ellipsis">{{item.Code}}</p>
                                <p class="mui-h6 mui-ellipsis" :class="{'红色字体':(item.Note && query.type!=3),'红色字体':(item.Note=='提款成功' && query.type==3)}">{{item.Note}}</p>
                            </div>
                            <div class="mui-table-cell mui-col-xs-5 mui-text-right">
                                <p class="mui-h5" :class="{'红色字体':item.Success,'红色字体':query.type==3}">
                                    <i class="fa fa-cny fa-fw"></i>{{item.Amount}}
                                </p>
                                <p class="mui-h5">{{item.Createtime}}</p>
                                <p class="mui-h5" :class="{'红色字体':item.Success}">{{item.State}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>

        </div>
    </div>
</template>

<script>
import { api_获取充值记录 , api_资金明细列表 } from "@/api/资金接口.js";
export default {
    name:'',
    data() {
        return {
            query:{
                page: 1,
                rows: 20,
                type: 2     //1表示在线充值 2 表示转账记录 3 提款记录
            },
            list:[],
            total:0,
            loading:true,
            finished:false
        }
    },
    methods: {
        onLoad(){
            if(this.list.length < this.total){
                this.query.page++;
                if(this.query.type==3){
                    this.获取提款记录();
                }else{
                    this.获取数据();
                }
            }
        },
        获取数据(){
            api_获取充值记录(this.query).then(x=>{
                console.log(x)
                this.loading=false;
                this.total=x.data.total;
                this.list=[...this.list,...x.data.rows]
            }).catch(err=>{
                this.loading=false;
            })
        },
        获取提款记录(){
            var obj=Object.assign({},this.query);
                obj.type=0
            api_资金明细列表(obj).then(x=>{
                // console.log(x)
                this.loading=false;
                this.total=x.data.total;
                this.list= [...this.list , ...x.data.rows]
            }).catch(err=>{
                // console.log(err);
                this.loading=false
            })
        },
        切换类型(type){
            this.query.type=type;
            this.list=[];
            this.query.page=1;
            if(type==3){
                this.获取提款记录();
            }else{
                this.获取数据(); 
            }
            
        }
    },
    mounted() {
        this.获取数据();
    },
}
</script>

<style lang="scss" scoped>
.header_1{
    background: #ffffff;
    line-height: _vw(40);
    display: flex;
    font-size: _vw(14);
    text-align: center;
    position: sticky;
    top: 0px;
    z-index: 1;
    margin: 0;
    border-bottom: 1px solid #c8c7cc;
    li{
        width: 50%;
        &.active{
            color: $color;
            border-bottom: 2px solid $color;
        }
    }
}

.list{
    .title_1{
        font-size: _vw(14);
    }
    .红色字体{
        color: #dc3545;
    }
}
</style>
