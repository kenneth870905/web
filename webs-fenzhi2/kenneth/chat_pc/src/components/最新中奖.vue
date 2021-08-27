<template>
    <div class="最新中奖" :class="class1" v-if="中奖弹幕">
        <div class="img_0">
            <img src="static/image/liaotian/zhongjiang.png" alt="" srcset="">
        </div>
        <div class="img_1">
            <img src="static/image/liaotian/zhongjiang1.png" alt="" srcset="">
        </div>
        <div class="text_1">
            恭喜
            <span class="名字">{{当前中奖.UserName}}</span>在{{当前中奖.GameName}}中投注
            <br/>
            中奖
            <span class="金额">{{当前中奖.Money}}元</span>
        </div>
        <div class="img_2">
            <img src="static/image/liaotian/zhongjiang2.png" alt="" srcset="">
        </div>
        <!-- <div class="关闭" @click="关闭()"></div> -->
    </div>
</template>

<script>
import { api_最新中奖 } from "@/api/中奖接口.js";
import { NextNumberArray } from "@/assets/js/通用.js";
import { mapState, mapMutations } from "vuex";
export default {
    name:"",
    inject:['打开烟花'],
    data() {
        return {
            list:[],
            间隔: Math.round(60/25 * 100)/100,
            当前中奖:{},
            class1:"",
        }
    },
    computed: {
        ...mapState({
            中奖弹幕:x=>x.聊天室.中奖弹幕
        }),
        索引(){
            var list=[];
            for (let i = 0; i < 25; i++) {
                list.push( Math.round(this.间隔*i * 100)/100 )
            }
            return list;
        }
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key'
        }),
        关闭(){
            mui.confirm('是否确认关闭中间弹幕通知,再次开启请前往“设置-偏好设置”','提示',['取消','确定'],(value)=>{
                if(value.index==1){
                    this.设置key(['显示最新中奖',false]);      
                }
            },'div')
        },
        设置中奖(){
            this.当前中奖 = '';
            this.$nextTick(function(){
                var 分钟=new Date().getMinutes();
                var index = NextNumberArray(分钟,this.索引)
                this.当前中奖 = this.list[index] ? this.list[index] : {} ;
                // console.log(index)
            })
            if(this.中奖弹幕){
                this.打开烟花()
            }
        },
        获取中奖(){
            api_最新中奖().then(x=>{
                this.list=x.data.winList;
            }).catch(err=>{})
        }
    },
    mounted() {
        this.获取中奖();

        setInterval(() => {
            this.设置中奖();
        }, 1000*30);
        
        setInterval(() => {
            this.获取中奖();
        }, 1000 * 60 *60);

    },
    watch: {
        当前中奖(){
            if(this.当前中奖.UserName){
                this.class1="进入";
                setTimeout(() => {
                    this.class1="离开";
                }, 4000);
                setTimeout(() => {
                    this.class1="";
                }, 5000);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@function _vw($str){
    @return $str+px;
}

.最新中奖{
    position: absolute;
    top: _vw(150);
    z-index: 21;
    width: 400px;
    left: 150%;
    right: 0px;
    margin: 0px auto;
    height: _vw(45);
    display: flex;
    &.进入{
        transition: all 0.3s;
        left: 0px;
    }
    &.离开{
        transition: all 0.3s;
        left: -200%;
    }
    .img_0,
    .img_1,
    .img_2{
        position: absolute;
        img{
            width: 100%;
        }
    }
    .img_0{
        z-index: 1;
        width: _vw(80);
        bottom: 0px;
        left: -8px;
    }
    .img_2{
        z-index: 1;
        width: _vw(60);
        right: _vw(-16);
        bottom: 0px;
    }
    .text_1{
        position: relative;
        z-index: 1;
        color: #ffffff;
        padding: 8px _vw(22) 0px _vw(70);
        font-size: _vw(15);
        .名字{
            color: #a2f302;
        }
        .金额{
            color: #fff203;
        }
    }
    .关闭{
        position: absolute;
        top: 0px;
        right: 0px;
        width: 20px;
        height: 20px;
        z-index: 1;
    }
}

</style>
