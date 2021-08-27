<template>
    <li class="item" :class="type">
        <!-- 头像 -->
        <div class="img_box" v-if="type=='left'" @click="会员详情()">
            <i v-if="!obj.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>

        <div class="cont">
            <p class="time" v-if="type=='left'">
                <!-- 0 其他 1管理员 2 计划员 -->
                <img v-if="user.VipImg && obj.ChatRole==0" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                <img v-if="obj.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">
                <img v-if="obj.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
                <span v-if="!user.VipImg && obj.ChatRole==0">{{obj.Vip}}</span>

                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{obj.MemberId}}</span>
                <span>{{obj.Createtime}}</span>
            </p>
            <p class="time mui-text-right" v-if="type=='right'">
                <span>{{obj.Createtime}}</span>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname && user.ChatRole==0">{{userinfo.UserId}}</span>
                <!-- 1管理员 2 计划员 -->
                <span v-if="!user.VipImg">{{obj.Vip}}</span>
                <img v-if="user.VipImg && user.ChatRole==0" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                <img v-if="user.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">
                <img v-if="user.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
            </p>
            <div class="msg">
                <div @contextmenu="contextmenu_1" v-text="obj.Content"></div>
                <!-- <div v-html="html"></div> -->
            </div>
        </div>
        <div class="img_box" v-if="type=='right'">
            <i v-if="!user.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="user.ImgId" :src="config.img_url+'static/image/touxiang/'+user.ImgId" alt="">
            <!-- <img src="https://tg-cdn2.gdbzh.com.cn/10cce331-5f0b-42df-a804-3abcbfd5a80f.png" alt="" srcset=""> -->
        </div>
    </li>
</template>

<script>
import { mapState , mapMutations , mapActions } from "vuex";
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
            userinfo:'userinfo',
            操作:x=>x.聊天室.操作
        }),
        type(){
            return this.obj.OnlineId==this.user.OnlineId ? 'right' :'left'
        }
    },
    methods: {
        ...mapMutations({
            // 点击会员详情:"聊天室/点击会员详情",
            设置key:'聊天室/设置key'
        }),
        ...mapActions({
            点击会员详情:"聊天室/点击会员详情",
        }),
        会员详情(){
            this.点击会员详情(this.obj)
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
        >div{
            background: #a0e759;
        }
    }
}
.item{
    margin: 20px 0px;
    padding:0px 10px 0px 10px;
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        margin: 25px 10px 0px 10px;
        font-size: 30px;
        color: red;
        background: #cccccc;
        border-radius: 100%;
        i{
            line-height: 30px;
            display: block;
            font-size: 30px;
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
        display: flex;
        align-items: center;
        // img{
        //     height: _vw(13);
        // }
        span{
            margin: 0px 3px;
        }
    }
    .msg{
        display: flex;
        >div{
            padding: 5px 10px;
            background: #fbfbfb;
            // max-width: 250px;
            border-radius: 4px;
            word-break: break-all;
            white-space: pre-wrap;
            box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
        }
    }
    .cont{
        max-width: 80%;
    }
}
</style>


