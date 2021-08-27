<template>
    <div class="排行榜">
        <div class="内容">
            <div class="title_1">
                <span :class="{active:type==0}" @click="type=0" style="margin-left:47px;">昨日充值排行榜</span>
                <span :class="{active:type==1}" @click="type=1">昨日盈利排行榜</span>
                <i @click="设置key(['显示排行榜',false])" class="van-icon van-icon-cross" style="font-size:25px;margin-left:30px;"></i>
            </div>
            <div class="list">
                <ul v-if="type==0">
                    <li v-for="(item, index) in 入款排行" :key="index">
                        <div class="text_1">
                            <div>
                                会员账号：<span class="昵称">{{item.MemberId}}</span>
                            </div>
                            <div>
                                充值金额：<span class="金额">{{item.Total}}</span>
                            </div>
                        </div>
                        <div class="排名">
                            <i v-if="index<3" :class="{金牌:index==0,银牌:index==1,铜牌:index==2}"  class="fa fa-trophy"></i>
                            <div v-if="index>=3" style="background:red;">
                                {{index+1}}
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-if="type==1">
                    <li v-for="(item, index) in 盈利排行" :key="index">
                        <div class="text_1">
                            <div>
                                会员账号：<span class="昵称">{{item.MemberId}}</span>
                            </div>
                            <div>
                                充值金额：<span class="金额">{{item.Total}}</span>
                            </div>
                        </div>
                        <div class="排名">
                            <!-- class="icon iconfont icon-zhongjiangliebiao" -->
                            <i v-if="index<3" :class="{金牌:index==0,银牌:index==1,铜牌:index==2}" class="fa fa-trophy"></i>
                            <div v-if="index>=3" style="background:red;">
                                {{index+1}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import { api_入款排行 , api_盈利排行 } from "@/api/中奖接口.js";
import { mapMutations } from 'vuex';
export default {
    name:"",
    data() {
        return {
            type:0,
            img:['l1.png','n1.png','l2.png','n2.png','l3.png','n3.png','l4.png','n4.png','l5.png','n5.png','l6.png','n6.png','l7.png','n7.png','l8.png','n8.png','l9.png','n9.png','l10.png','n10.png','l11.png','n11.png','l12.png','n12.png','l13.png','n13.png'],
            img1:['l14.png','n14.png','l15.png','n15.png','l16.png','n16.png','l17.png','n17.png','l18.png','n18.png','l19.png','n19.png','l20.png','n20.png','k1.png','q1.jpg','k2.png','q2.jpg','k3.png','q3.jpg','k4.png','q4.jpg','k5.png','q5.jpg','k6.png','q6.jpg'],
            入款排行:[],
            盈利排行:[]
        }
    },
    methods: {
        ...mapMutations({
            设置key:"聊天室/设置key" 
        })
    },
    mounted() {
       api_入款排行().then(x=>{
           this.入款排行=x.data
           console.log(this.入款排行)
       }).catch(err=>{})

       api_盈利排行().then(x=>{
           this.盈利排行=x.data;
       }).catch(err=>{})

    },
}
</script>

<style lang="scss" scoped>
.排行榜{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 21;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
   
    .内容{
        width: _vw(320);
        border-radius: _vw(6);
        overflow: hidden;
        .title_1{
            position: relative;
            // @include bgcolor;
            height: _vw(44);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            background: #ec0909;
            .关闭{
                line-height: _vw(44);
                padding: 0px 10px;
                top: 0px;
                right: 0px;
                color: #ffffff;
                position: absolute;
            }
            span{
                font-size: _vw(12);
                height: _vw(26);
                line-height: _vw(26);
                padding: 0px _vw(10);
                box-shadow: 0px 0px 1px 1px #ffffff;
                &:nth-child(1){
                    border-top-left-radius: _vw(26);
                    border-bottom-left-radius: _vw(26);
                }
                &:nth-child(2){
                    border-top-right-radius: _vw(26);
                    border-bottom-right-radius: _vw(26);
                }
                &.active{
                    background: #ffffff;
                    color: #000000;
                }
            }
        }
        .list{
            height: _vw(410);
            overflow: auto;
            background: #ffffff;
        }
    }
}
.list{
    li{
        border-bottom: 1px solid #f0f0f0;
        padding: 5px 15px;
        display: flex;
        .img_box{
            width: _vw(45);
            height: _vw(45);
            flex-shrink: 0;
            margin: 0px _vw(8) 0px 0px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
                object-fit: cover;
            }
        }
        .text_1{
            width: 100%;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: #828282;
            line-height: 23px;
            .昵称{
                color: #000000;
                font-weight: bold;
            }
            .金额{
                color: red;
            }
        }
        .排名{
            display: flex;
            justify-content: center;
            flex-shrink: 0;
            align-items: center;
            width: _vw(45);
            i{
                font-size: 40px;
                &.金牌{
                    color: #ffcc33;
                }
                &.银牌{
                    color: #e3e2e8;
                }
                &.铜牌{
                    color: #ec8e46;
                }
            }
            div{
                width: _vw(30);
                height: _vw(30);
                line-height: _vw(30);
                border-radius: 100%;
                color: #ffffff;
                // @include bgcolor;
                text-align: center;
                font-size: _vw(14);
            }
        }
    }
}
</style>