<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box" @click="会员详情()">
            <i v-if="!obj.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <!-- <template v-if="obj.ChatRole">
                    <img v-if="obj.ChatRole==1" :src="`${config.api_url}/App_Upload/ChatVip/管理员.png`" alt="">                    
                    <img v-if="obj.ChatRole==2" :src="`${config.api_url}/App_Upload/ChatVip/计划员.png`" alt="">
                </template>
                <template v-else>
                    <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                </template>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{obj.MemberId}}</span> -->
                <span>{{obj.Createtime}}</span>
            </p>
            <p class="time mui-text-right" v-if="type=='right'">
                <span>{{obj.Createtime}}</span>
                <!-- <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{userinfo.UserId}}</span>
                <template v-if="obj.ChatRole">
                    <img v-if="user.ChatRole==1" :src="`${config.api_url}/App_Upload/ChatVip/管理员.png`" alt="">                    
                    <img v-if="user.ChatRole==2" :src="`${config.api_url}/App_Upload/ChatVip/计划员.png`" alt="">
                </template>
                <template v-else>
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                    <img v-if="user.VipImg" :src="`${config.api_url}/App_Upload/ChatVip/${obj.Vip}.png`" alt="">
                </template> -->
            </p>
            <div class="msg" @touchstart="touchstart_1($event)" @touchend="touchend_1()">
                <div class="红包" @click="查看状态()">
                    <div>
                        <div class="img_1">
                            <img :src="`${config.img_url}static/image/liaotian/hongbao.jpg`" />
                        </div>
                        <div class="text_1">
                            <div>{{Content.Note ? Content.Note : '什么也没说'}}</div>
                            <div>领取红包</div>
                        </div>
                    </div>
                    <div class="btn_1">系统红包</div>
                </div>
            </div>
        </div>
        <div v-if="type=='right'" class="img_box" @click="会员详情()">
            <i v-if="!user.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="user.ImgId" :src="`${config.img_url}static/image/touxiang/${user.ImgId}`" alt="">
        </div>
    </li>
</template>

<script>
import { api_查询状态} from "@/api/红包接口.js";
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
            user:x=>x.聊天室.user,
            userinfo:x=>x.user.userinfo,
            操作:x=>x.聊天室.操作,
            领取红包:x=>x.聊天室.领取红包
        }),
        type(){
            return this.obj.OnlineId==this.user.OnlineId ? 'right' :'left'
        },
        Content(){
            try {
                return JSON.parse(this.obj.Content)
            } catch (error) {
                return {}
            }
        }
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key',
            加载中:"加载中"
        }),
        ...mapActions({
            点击会员详情:'聊天室/点击会员详情'
        }),
        async 查看状态(){
            this.加载中(true);
            try {
                var r = await api_查询状态(this.Content.bonusId);            
            } catch (error) {
                this.$toast('系统错误，稍后再试');
                this.加载中(false);
                return
            }
            this.加载中(false);
            // if(r.data.code==0){
            //     //还有红包 并且 没有领取过
            //     this.领取红包.状态 = r.data;
            //     this.领取红包.领取弹框 = true;
            //     this.领取红包.红包 = this.obj;
            // }else 
            if(r.data.code==1 && typeof r.data.msg =='object'){
                //已经领取红包 直接进入 详情页面
                this.$router.push(`/hbxq?b=${this.Content.bonusId}`)
            }else{
                // 没有红包了 也没有领取过
                this.领取红包.状态 = r.data;
                this.领取红包.领取弹框 = true;
                this.领取红包.红包 = this.obj;
            }
        },
        touchstart_1(e){
            if(this.user.ChatRole!=1){
                return
            }
            console.log('开始拖动',e,e.touches[0].clientX,e.touches[0].clientY);
            this.time=new Date();
            try {
                clearTimeout(this.定时器)
            } catch (error) {}
            this.定时器=setTimeout(() => {
                console.log('长按',this.obj)
                this.操作.obj=this.obj
                this.操作.show=true;
                this.操作.left=e.touches[0].clientX;
                this.操作.top=e.touches[0].clientY;
            }, 1000);
        },
        touchend_1(){
            if(this.user.ChatRole!=1){
                return
            }
            clearTimeout(this.定时器)
        },
        会员详情(){
            if(this.obj.ChatRole){
                this.$router.push('/privateChat?Code='+this.obj.OnlineId)
            }else{
                this.点击会员详情(this.obj)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.item.right{
    justify-content: flex-end;
    .time{
        justify-content: flex-end;
    }
    .msg{
        justify-content: flex-end;
    }
}
.item{
    margin: _vw(20) 0px;
    padding:0px _vw(10) 0px _vw(10);
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: _vw(30);
        height: _vw(30);
        margin: 0px _vw(10) 0px _vw(10);
        font-size: _vw(30);
        // color: red;
        @include textcolor;
        background: #cccccc;
        border-radius: 100%;
        i{
            line-height: _vw(30);
            display: block;
        }
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
            object-fit: cover;
        }
    }
    .time{
        color: #656565;
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
    // .msg{
    //     display: flex;
    //     >div{
    //         padding: _vw(5) _vw(10);
    //         font-size: _vw(14);
    //         // background: #fff3f0;
    //         // max-width: _vw(250);
    //         border-radius: _vw(4);
    //         word-break: break-all;
    //         white-space: pre-wrap;
    //     }
    // }
}

.红包{
    // width: _vw(230);
    >div:nth-child(1){
        display: flex;
        padding:_vw(10) 0px _vw(10) _vw(10);
        background: #fb9d3b;
        border-top-left-radius: _vw(5);
        border-top-right-radius: _vw(5);
    }
    .text_1{
        width: _vw(200);
        padding: 0px _vw(10);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: _vw(14);
    }
    .img_1{
        width: _vw(50);
        flex-shrink: 0;
        img{
            width: 100%;
        }
    }
    .btn_1{
        // background: #dadada;
        padding: _vw(5) _vw(10);
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
