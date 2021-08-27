<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box" @click="会员详情()">
            <i v-if="!obj.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="title" v-if="type=='left'">
                <span>{{obj.Nickname ? obj.Nickname  : obj.MemberId}}</span>
                <span>{{obj.Createtime}}</span>
            </p>
            <p class="title mui-text-right" v-if="type=='right'">
                <span>{{obj.Createtime}}</span>
                <span>{{obj.Nickname ? obj.Nickname  : obj.MemberId}}</span>
            </p>
            
            <div class="msg">
                <div class="红包" @click="查看状态()">
                    <div class="bg_1">
                        <img v-show="type=='right'" :src="`${config.img_url}static/image/hbgame/niuniu3.png`" alt="" srcset="">
                        <img v-show="type=='left'" :src="`${config.img_url}static/image/hbgame/niuniu4.png`" alt="" srcset="">
                    </div>
                    <div class="content_1">
                        <!-- <div class="img_1">
                            <img :src="`${config.img_url}static/image/liaotian/hongbao.jpg`" />
                        </div> -->
                        <!-- <div class="text_1"> -->
                            <div>{{Content.TotalAmount+'-'+Content.TotalQuantity}}</div>
                            <div>查看红包</div>
                        <!-- </div> -->
                    </div>
                    <div class="btn_1">
                        牛牛红包
                    </div>
                </div>
            </div>
        </div>
        <div v-if="type=='right'" class="img_box" @click="会员详情()">
            <i v-if="!obj.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId" :src="`${config.img_url}static/image/touxiang/${obj.ImgId}`" alt="">
        </div>
    </li>
</template>

<script>
import { api_查询状态 } from "@/api/红包接口.js";
import { api_查询游戏状态 , api_禁抢状态 , api_查询牛牛状态 } from '@/api/红包游戏.js'
import { mapState, mapActions , mapMutations } from "vuex";
export default {
    name:"",
    props:{
        obj:{
            default(){
                return {}
            }
        },
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:'config',
            user:x=>x.红包游戏.user,
            userinfo:x=>x.user.userinfo,
            操作:x=>x.聊天室.操作,
            领取红包:x=>x.红包游戏.领取红包
        }),
        title(){
            if(this.obj.Type == 6){
                return this.Content.TotalAmount+'-'+ this.Content.Bomb
            }else{
                return this.Content.Note
            }
        },
        type(){
            return this.obj.OnlineId==this.user.OnlineId ? 'right' :'left'
        },
        Content(){
            try {
                return JSON.parse(this.obj.Content)
            } catch (error) {
                return {}
            }
        },
        
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key',
            加载中:"加载中"
        }),
        async 查看状态(){
            this.加载中(true);
            // 普通红包
            var id = ''
            if(this.obj.Type==5){
                id = this.Content.bonusId;
                try {
                    var r = await api_查询状态(id);            
                } catch (error) {
                    this.$toast('系统错误，稍后再试');
                    this.加载中(false);
                    return
                }
                this.加载中(false);
            //扫雷红包
            }else if(this.obj.Type==6){
                id = this.Content.Id;
                try {
                    var r = await api_查询游戏状态(id);     
                } catch (error) {
                    this.$toast('系统错误，稍后再试');
                    this.加载中(false);
                    return
                }
                this.加载中(false);
            }else if(this.obj.Type==8){
                id = this.Content.Id;
                try {
                    var r = await api_禁抢状态(id);     
                } catch (error) {
                    this.$toast('系统错误，稍后再试');
                    this.加载中(false);
                    return
                }
                this.加载中(false);
            }else if(this.obj.Type == 7){
                id = this.Content.Id;
                try {
                    var r = await api_查询牛牛状态(id);
                } catch (error) {
                    this.$toast('系统错误，稍后再试');
                    this.加载中(false);
                    return
                }
            }
            console.log(r)
            this.加载中(false);
            if(r.data.code==1 && typeof r.data.msg =='object'){
                //已经领取红包 直接进入 详情页面
                // if(this.obj.Type==7){
                    this.$router.push(`/hbGame/lqxq1?b=${id}&t=${this.obj.Type}`)
                // }else{
                //     this.$router.push(`/hbxq?b=${id}&t=${this.obj.Type}`)
                // }
            }else{
                // 没有红包了 也没有领取过
                this.领取红包.状态 = r.data;
                this.领取红包.弹框 = true;
                this.领取红包.红包 = this.obj;
            }
            
        }
    },
}
</script>

<style lang="scss" scoped>
.bg_1{
    position: absolute;
    margin: 0px _vw(-5) 0px 0px;
    left: 0px;
    img{
        width: 100%;
    }
}
.left{
    .bg_1{
        margin: 0px 0px 0px _vw(-5);
    }
}

.item.right{
    justify-content: flex-end;
    .title{
        justify-content: flex-end;
    }
    .msg{
        justify-content: flex-end;
    }
    // .红包{
    //     &::after{
    //         right: -7px;
    //         left: auto;
    //     }
    // }
}
.item{
    margin: _vw(20) 0px;
    padding:0px _vw(10) 0px _vw(10);
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: _vw(40);
        height: _vw(40);
        margin: 0px _vw(10) 0px _vw(10);
        font-size: _vw(40);
        // color: red;
        @include textcolor;
        background: #cccccc;
        border-radius: 100%;
        i{
            line-height: _vw(40);
            display: block;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
        }
    }
    .title{
        color: #656565;
        margin-bottom: _vw(5);
        font-size: _vw(12);
        display: flex;
        align-items: center;
        // img{
        //     height: _vw(13);
        // }
        span{
            margin: 0px _vw(3);
        }
    }
}

.红包{
    width: _vw(230);
    position: relative;
    // &::after{
    //     position: absolute;
    //     top: 0px;
    //     left: -7px;
    //     content: '';
    //     width: 0;
    //     height: 0;
    //     border: 8px solid transparent;
    //     border-top: 12px solid #fb9d3b;
    // }
    .content_1{
        position: relative;
        z-index: 1;
        height: _vw(72);
        font-size: _vw(14);
        color: #fff;
        padding: _vw(26) 0px 0px _vw(60);
    }
    .btn_1{
        background: #fbf9f9;
        position: relative;
        z-index: 1;
        // background: #dadada;
        padding: 5px _vw(10);
        border-bottom-left-radius: _vw(5);
        border-bottom-right-radius: _vw(5);
        border-left: 1px solid #cccccc;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #cccccc;
        font-size: _vw(14);
        color: #4e4e4e;
    }
}
</style>
