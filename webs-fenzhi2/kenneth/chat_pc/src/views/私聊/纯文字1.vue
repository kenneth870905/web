<template>
    <li class="item" :class="type">
        <!-- 头像 -->
        <div class="img_box" v-if="type=='left'" @click="会员详情()">
            <i v-if="正在聊天 && !正在聊天.SenderProfile.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="正在聊天 && 正在聊天.SenderProfile.ImgId" :src="config.img_url+'static/image/touxiang/'+正在聊天.SenderProfile.ImgId" alt="">
        </div>

        <div class="cont">
            <p class="time" v-if="type=='left'">
                <span v-if="正在聊天 && 正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.Nickname}}</span>
                <span v-if="正在聊天 && !正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.MemberId}}</span>
                <span class="time_2">{{obj.CreateTime | filter_time}}</span>
            </p>
            <p class="time mui-text-right" v-if="type=='right'">
                <span class="time_2">{{obj.CreateTime | filter_time}}</span>
                <span v-if="自己.Nickname">{{自己.Nickname}}</span>
                <span v-if="!自己.Nickname">{{自己.UserId}}</span>
            </p>
            <div class="msg">
                <div @contextmenu="contextmenu_1" v-text="obj.Message"></div>
            </div>
        </div>
        <div class="img_box" v-if="type=='right'">
            <i v-if="!自己.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="自己.ImgId" :src="config.img_url+'static/image/touxiang/'+自己.ImgId" alt="">
        </div>
    </li>
</template>

<script>
import { mapState , mapMutations , mapActions } from "vuex";
import { 时间格式化 } from "@/assets/js/通用.js";
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
    filters:{
        filter_time(t){
            return 时间格式化('yyyy-MM-dd hh:mm',t)
        }
    },
    computed: {
        ...mapState({
            config:'config',
            自己:x=>x.私聊.自己,
            操作:x=>x.私聊.操作,
            正在聊天:x=>x.私聊.正在聊天
        }),
        type(){
            return this.obj.SenderCode==this.自己.Code ? 'right' :'left'
        },
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
            var obj=this.obj;
                obj.OnlineId = this.obj.SenderCode      //Id
                obj.MemberId = this.正在聊天.SenderProfile.MemberId;
                obj.Nickname = this.正在聊天.SenderProfile.Nickname
            this.点击会员详情(obj);
        },
        contextmenu_1(e){
            if(this.type=='right'){
                // console.log('点击',e);
                this.操作.obj=this.obj;
                this.操作.top=e.y;
                this.操作.left=e.x;
                this.操作.show=true;
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.time_2{
    font-size: 12px;
}
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
            background: #f1f1f1;
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


