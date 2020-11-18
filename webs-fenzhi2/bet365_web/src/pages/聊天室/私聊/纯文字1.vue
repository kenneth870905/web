<template>
    <li class="item" :class="type">
        <!-- 头像 -->
        <div class="img_box" v-if="type=='left'" @click="会员详情()">
            <i v-if="正在聊天 && !正在聊天.SenderProfile.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="正在聊天 && 正在聊天.SenderProfile.ImgId" :src="config.img_url+'image/touxiang/'+正在聊天.SenderProfile.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <!-- <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                <span v-if="!user.VipImg">{{obj.Vip}}</span> -->
                <span v-if="正在聊天 && 正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.Nickname}}</span>
                <span v-if="正在聊天 && !正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.MemberId}}</span>
                <span class="time_2">{{obj.CreateTime | filter_time}}</span>
            </p>
            <p class="time mui-text-right" v-if="type=='right'">
                <span class="time_2">{{obj.CreateTime | filter_time}}</span>
                <span v-if="自己.Nickname">{{自己.Nickname}}</span>
                <span v-if="!自己.Nickname">{{自己.MemberId}}</span>
                <!-- <span v-if="!user.VipImg">{{obj.Vip}}</span>
                <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt=""> -->
            </p>
            <div class="msg" @touchstart="touchstart_1($event)" @touchend="touchend_1()">
                <div v-text="obj.Message"></div>
            </div>
        </div>
        <!-- 头像 -->
        <div class="img_box" v-if="type=='right'">
            <i v-if="!自己.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="自己.ImgId" :src="config.img_url+'image/touxiang/'+自己.ImgId" alt="">
            <!-- <img src="https://tg-cdn2.gdbzh.com.cn/10cce331-5f0b-42df-a804-3abcbfd5a80f.png" alt="" srcset=""> -->
        </div>
        
    </li>
</template>

<script>
import { mapState , mapMutations , mapActions, mapGetters} from "vuex";
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
            time:0,
            定时器:""
        }
    },
    filters:{
        filter_time(t){
            try {
                return 时间格式化('yyyy.MM.dd hh:mm',t)            
            } catch (error) {
                return t
            }
        }
    },
    computed: {
        ...mapState({
            config:'config',
            操作:x=>x.私聊.操作,
            正在聊天:x=>x.私聊.正在聊天,
            自己:x=>x.私聊.自己,
        }),
        type(){
            return this.obj.SenderCode==this.自己.Code ? 'right' :'left'
        },
    },
    methods: {
        ...mapMutations({
            设置key:'聊天室/设置key'
        }),
        ...mapActions({
            点击会员详情:'聊天室/点击会员详情'
        }),
        touchstart_1(e){
            if(this.type=='left'){
                return
            }
            console.log('开始拖动',e,e.touches[0].clientX,e.touches[0].clientY);
            this.time=new Date();
            try {
                clearTimeout(this.定时器)
            } catch (error) {}
            this.定时器=setTimeout(() => {
                console.log('长按')
                this.操作.obj=this.obj
                this.操作.show=true;
                this.操作.left=e.touches[0].clientX;
                this.操作.top=e.touches[0].clientY;
            }, 1000);
        },
        touchend_1(){
            if(this.type=='left'){
                return
            }
            clearTimeout(this.定时器)
        },
        会员详情(){
            this.点击会员详情(this.obj)
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
        font-size: _vw(14);
        display: flex;
        align-items: center;
        // img{
        //     height: _vw(13);
        // }
        span{
            margin: 0px _vw(3);
        }
        .time_2{
            font-size: _vw(12);
            color: #bbbbbb;
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


