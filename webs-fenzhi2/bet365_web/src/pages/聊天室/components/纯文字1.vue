<template>
    <li class="item" :class="type">
        <!-- 头像 -->
        <div class="img_box" v-if="type=='left'" @click="会员详情()">
            <i v-if="!obj.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId" :src="config.img_url+'image/touxiang/'+obj.ImgId" alt="">
        </div>

        <div class="cont">
            <p class="time" v-if="type=='left'">
                <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                <span v-if="!user.VipImg">{{obj.Vip}}</span>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{obj.MemberId}}</span>
                <span>{{obj.Createtime}}</span>
            </p>
            <p class="time mui-text-right" v-if="type=='right'">
                <span>{{obj.Createtime}}</span>
                <span v-if="obj.Nickname">{{obj.Nickname}}</span>
                <span v-if="!obj.Nickname">{{userinfo.UserId}}</span>
                <span v-if="!user.VipImg">{{obj.Vip}}</span>
                <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
            </p>
            <div class="msg">
                <div v-text="obj.Content"></div>
                <!-- <div v-html="html"></div> -->
            </div>
        </div>
        <div class="img_box" v-if="type=='right'">
            <i v-if="!user.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="user.ImgId" :src="config.img_url+'image/touxiang/'+user.ImgId" alt="">
            <!-- <img src="https://tg-cdn2.gdbzh.com.cn/10cce331-5f0b-42df-a804-3abcbfd5a80f.png" alt="" srcset=""> -->
        </div>
    </li>
</template>

<script>
import { mapState , mapMutations , mapActions} from "vuex";
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
            userinfo:x=>x.user.userinfo
        }),
        type(){
            return this.obj.OnlineId==this.user.OnlineId ? 'right' :'left'
        }
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key'
        }),
        ...mapActions({
            点击会员详情:'聊天室/点击会员详情'
        }),
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
        >div{
            background: #a0e759;
        }
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
    .msg{
        display: flex;

        >div{
            padding: _vw(5) _vw(10);
            font-size: _vw(14);
            background: #fff3f0;
            max-width: _vw(250);
            border-radius: _vw(4);
            word-break: break-all;
            white-space: pre-wrap;
        }
    }
}
</style>


