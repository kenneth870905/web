<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box" @click="会员详情()">
            <i v-if="!obj.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <template v-if="obj.ChatRole">
                    <img v-if="obj.ChatRole==1" :src="`${config.api_url}/App_Upload/ChatVip/管理员.png`" alt="">                    
                    <img v-if="obj.ChatRole==2" :src="`${config.api_url}/App_Upload/ChatVip/计划员.png`" alt="">
                </template>
                <template v-else>
                    <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                </template>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{obj.MemberId}}</span>
                <span>{{obj.Createtime}}</span>
            </p>
            <p class="time mui-text-right" v-if="type=='right'">
                <span>{{obj.Createtime}}</span>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{userinfo.UserId}}</span>
                <template v-if="obj.ChatRole">
                    <img v-if="user.ChatRole==1" :src="`${config.api_url}/App_Upload/ChatVip/管理员.png`" alt="">                    
                    <img v-if="user.ChatRole==2" :src="`${config.api_url}/App_Upload/ChatVip/计划员.png`" alt="">
                </template>
                <template v-else>
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                    <img v-if="user.VipImg" :src="`${config.api_url}/App_Upload/ChatVip/${obj.Vip}.png`" alt="">
                </template>
            </p>
            <div class="msg">
                <div class="红包" @click="查看状态()" @contextmenu="contextmenu_1">
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
import { api_群红包状态 , api_领取群红包 , api_查询状态} from "@/api/红包接口.js";
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
        }),
        ...mapActions({
            失败提示:"失败提示",
            点击会员详情:'聊天室/点击会员详情'
        }),
        async 查看状态(){
            this.失败提示('请使用手机版或APP领取')
        },
        contextmenu_1(e){
            if(this.user.ChatRole!=1){
                return
            }
            console.log(this.obj)
            // console.log('点击',e);
            this.操作.obj=this.obj
            this.操作.top=e.y;
            this.操作.left=e.x
            this.操作.show=true;
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
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
@function _vw($str){
    @return $str+px;    
}



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
    >div:nth-child(1){
        display: flex;
        padding: 10px 0px 10px 10px;
        background: #fb9d3b;
        border-top-left-radius: _vw(5);
        border-top-right-radius: _vw(5);
    }
    .text_1{
        width: 200px;
        box-sizing: border-box;
        padding: 0px _vw(10);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: _vw(14);
    }
    .img_1{
        width: 50px;
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
