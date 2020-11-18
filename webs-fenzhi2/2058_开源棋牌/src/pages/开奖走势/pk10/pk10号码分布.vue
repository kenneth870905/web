<template>
    <div class="号码分析">
        <ul class="筛选条件">
            <li class="数量">
                <div @tap="点击筛选(item)" v-for="(item, index) in list" :key="index" :class="{'active':筛选号码.find(x=>x==item)}">
                    <span class="编号">{{item}}</span>
                    <i class="选中 icon iconfont icon-gouxuanzhong"></i>
                </div>
            </li>
            <li class="单双大小">
                <div @tap="点击筛选1('单')" :class="{'active':筛选号码1.find(x=>x=='单')}">单</div>
                <div @tap="点击筛选1('双')" :class="{'active':筛选号码1.find(x=>x=='双')}">双</div>
                <div @tap="点击筛选1('大')" :class="{'active':筛选号码1.find(x=>x=='大')}">大</div>
                <div @tap="点击筛选1('小')" :class="{'active':筛选号码1.find(x=>x=='小')}">小</div>
            </li>
        </ul>
        <ul class="开奖号" >
            <van-list  v-model="loading1" :finished="开奖记录.length<=查看条数" :finished-text="开奖记录.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <li v-if="item.Content && index<查看条数" v-for="(item, index) in 开奖记录" :key="index">
                    <div class="时间">{{item.ResultDatetime | 时间格式}}</div>
                    <div class="期数" v-if="item.IssueCode.length>6">{{item.IssueCode.substring(4)}}</div>
                    <div class="期数" v-else>{{item.IssueCode}}</div>
                    <div class="item item2">
                        <div class="号码列表">
                            <span class="号码" :class="'号码'+item1+' '+(设置class(item1) ? 'active':'')" v-for="(item1, index1) in item.开奖号码" :key="index1">{{item1}}</span>
                        </div>
                    </div>
                </li>
            </van-list>
        </ul>
    </div>
</template>

<script>
import { 时间格式化 } from "@/assets/js/通用.js";

import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            list:['01','02','03','04','05','06','07','08','09','10'],
            筛选号码:[],
            筛选号码1:[],

            loading1:false,            
            查看条数:20,
        }
    },
    filters:{
        时间格式(time){
            return 时间格式化('hh:mm',time)
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录
        }),
    },
    methods: {
        onLoad1(){
            console.log(132)
            this.查看条数=this.查看条数+20;
            this.loading1=false;
        },
        点击筛选(item){
            var index = this.筛选号码.findIndex(x=>x==item);
            if(index==-1){
                this.筛选号码.push(item);
            }else{
                this.筛选号码.splice(index,1);
            }
        },
        点击筛选1(item){
            console.log(item)
            this.筛选号码=[];
            if(item=='单' || item=='双'){
                var index1 = this.筛选号码1.findIndex(x=>x=='单' || x=='双');
                if(index1==-1){
                    this.筛选号码1.push(item);
                }else if(this.筛选号码1[index1]==item){
                    this.筛选号码1.splice(index1,1);
                }else{
                    this.筛选号码1[index1]= item;
                }
            }else{
                var index1 = this.筛选号码1.findIndex(x=>x=='大' || x=='小');
                if(index1==-1){
                    this.筛选号码1.push(item);
                }else if(this.筛选号码1[index1]==item){
                    this.筛选号码1.splice(index1,1);
                }else{
                    this.筛选号码1[index1]= item;
                }
            }
        },
        设置class(item){
            if(this.筛选号码.length==0 && this.筛选号码1.length==0){
                return true
            }else{
                var a=false;
                var obj = this.筛选号码.find(x=>x==item);
                if(obj){
                    a=true
                }
                this.筛选号码1.forEach(x => {
                    if(x=='大'){
                        item > 4 ? a= true :'' 
                    }else if(x=='小'){
                        item <= 4 ? a= true :'';
                    }else if(x=='双'){
                        item%2==0 ? a=true : ''
                    }else if(x=='单'){ 
                        item%2==1 ? a=true : ''
                    }
                });
                return a
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.号码分析{
    display: flex;
    flex-direction: column;
    height: 100%;
     margin: 0;
}
.筛选条件{
    flex-shrink: 0;
    background: #ffffff;
    padding: _vw(5);
     margin: 0;
    .数量{
        display: flex;
        justify-content: space-between;
        div{
            width: _vw(30);
            height: _vw(30);
            text-align: center;
            border: 1px solid#989899;
            font-size: _vw(12);
            position: relative;
            border-radius: 3px;
            .编号{
                line-height:  calc(#{_vw(30)} - 2px) ;
            }
            &.active{
                border: 1px solid #ff7614;
                .选中{
                    display: block;
                } 
            }
            .选中{
                position: absolute;
                top: 0px;
                left: 0px;
                color: #ff7614;
                font-size: _vw(18);
                display: none;
            }
        }
    }
    .单双大小{
        margin: _vw(5) 0px 0px;
        height: _vw(26);
        display: flex;
        font-size: _vw(13);
        border:1px solid #ff7614;
        color: #ff7614;
        border-radius: 3px;
        div{
            border-left: 1px solid #ff7614;
            width: 25%;
            text-align: center;
            line-height: calc(#{_vw(26)} - 2px);
        }
        .active{
            background: #ff7614;
            color: #ffffffff;
        }
        div:nth-child(1){
            border-left: none;
        }
    }
}

.开奖号{
    flex-grow: 1;
    overflow: auto;
    background: #ffffff;
    text-align: center;
     margin: 0;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    li{
        padding: _vw(10) _vw(5);
        display: flex;
        align-items: center;
        // border-block:
        border-bottom: 1px solid #efeff4;
    }
    .时间{
        color: #999999;
        font-size: _vw(13);
        width: _vw(50);
        flex-shrink: 0;
    }
    .期数{
        width: _vw(60);
        flex-shrink: 0;
        color: #999999;
        font-size: _vw(13);
    }
    .item{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
}

.号码列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
    .号码{
        width: _vw(22);
        height: _vw(22);
        // background-image: url('~@/assets/bg/pk10.png');
        // background-size: auto _vw(24);
        border-radius: 5px;
        text-align: center;
        font-size: _vw(12);
        line-height: _vw(22);
        color: #ffffff;
        // background: $color;
        // border-radius: 100%;
        opacity: 0.1;
        &.active{
            opacity: 1;
        }
    }
    $colorList:(#eedd0f, #0092dd, #4b4b4b,#ff7600,#17e2e5,#5234ff,#bfbfbf,#ff2600 , #780b00 ,#07bf00);
    @for $i from 1 through length($colorList) {
        $color1:nth($colorList, $i );
        @if($i<10){
            $i:'0'+$i;
        }
        .号码#{$i}{
            background: $color1
        }
    }



    
}




</style>
