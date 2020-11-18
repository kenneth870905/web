<template>
    <div class="最新中奖">
        <div class="title">
            <span>最新中奖</span>
        </div>
        <ul class="list" ref="list" :class="{'animate':animate}">
            <li v-for="(item, index) in 中奖号码.winList" :key="index" @click="进入彩票(item)">
                <div class="img_box">
                    <img :src="config.img_url+'static/image/home/caipiao/'+item.Code+'.png'" alt="">
                </div>
                <div class="text-box">
                    <div>恭喜<span class="user">{{item.UserName}}</span>在{{item.GameName}}中了<span :class="{红1:item.Money>=10000,红2:item.Money<10000}">{{item.Money}}</span></div>
                    <div class="mui-text-right 时间">
                        1分钟前
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { api_最新中奖 } from "@/api/中奖接口.js";
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            animate:true,
            中奖号码:[]
        }
    },
    computed: {
        ...mapState({
            config:'config',
            彩票玩法:x=>x.user.彩票玩法     //官方信用
        })
    },
    methods: {
        进入彩票(item){
            if(this.config.newbet){
                this.$router.push(`/buyLottery?i=${item.Code}&t=${this.彩票玩法}`)
            }else{
                this.$router.push('/cpiframe?i='+item.Code+'&t='+this.彩票玩法)
            }
        },
        滚动(){
            try {
                var li = this.$refs.list.querySelector('ul>li:nth-child(1)');            
            } catch (error) {
                return
            }
            var height= li.offsetHeight
            // document.querySelector('ul>li:nth-child(1)')
                li.style['margin-top'] = -height+'px';
                this.animate=true;
            setTimeout(() => {
                this.中奖号码.winList.push(this.中奖号码.winList[0]);
                this.中奖号码.winList.shift();
                li.style['margin-top'] = '0px';
                this.animate=false;
                this.$nextTick(()=>{
                    this.滚动();
                })
            }, 1000);
        }
    },
    mounted() {
        api_最新中奖().then(x=>{
            this.中奖号码=x.data;
            this.$nextTick(()=>{
                setTimeout(() => {
                    this.滚动();              
                }, 1000);
            })
        }).catch(er=>{})
        
    },
}
</script>

<style lang="scss" scoped>

.title {
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    font-size: 18px;
    font-weight: bold;
    span{
        @include border-full(4px,left);
        padding: 0px _vw(10);
    }
}
.list{
    height: 300px;
    overflow: hidden;
    background: #ffffff;
    color: #6d6d6d;
    &.animate{
        li{
            transition: all 1s linear;
        }
    }
    li{
        padding: _vw(10) _vw(10);
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        font-size: _vw(13);
        .img_box{
            flex-shrink: 0;
            width: _vw(30);
            height: _vw(30);
            margin: 0px _vw(10) 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text-box{
            width: 100%;
            flex-grow: 1;
        }
        .时间{
            color: #afafaf;
            font-size: _vw(12);
        }
        .user{
            color:#000000;
            font-weight: bold;
        }
        .红1{
            color: red;
            font-weight: bold;
        }
        .红2{
             color: #f5cd00;
             font-weight: bold;
        }
    }
}
</style>