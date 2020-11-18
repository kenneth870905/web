<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box">
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
                <span v-if="正在聊天.ReceiverProfile.Nickname">{{正在聊天.ReceiverProfile.Nickname}}</span>
                <span v-if="!正在聊天.ReceiverProfile.Nickname">{{正在聊天.ReceiverProfile.MemberId}}</span>
            </p>
            <div class="msg" @touchstart="touchstart_1($event)" @touchend="touchend_1()">
                <div class="img_box1">
                    <img :src="obj.Message" @click="查看大图()" alt="" srcset="">
                </div>
            </div>
        </div>
        
        <div v-if="type=='right'" class="img_box">
            <i v-if="!正在聊天.ReceiverProfile.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="正在聊天.ReceiverProfile.ImgId" :src="config.img_url+'static/image/touxiang/'+正在聊天.ReceiverProfile.ImgId" alt="">
        </div>
    </li>
</template>

<script>
import { ImagePreview } from 'vant';
import { mapState , mapActions, mapMutations, mapGetters} from "vuex";
import { 时间格式化 } from "@/assets/js/通用.js";
export default {
    name: "",
    props:{
        obj:{
            default(){
                return {}
            }
        }
    },
    data() {
        return {
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
        }),
        type(){
            return this.obj.SenderCode==this.正在聊天.ReceiverProfile.Code ? 'right' :'left'
        },
    },
    methods: {
        touchstart_1(e){
            if(this.type=='left'){
                return
            }
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
        查看大图(){
            ImagePreview({
                images:[this.obj.Message],
                'show-index':false
            });
        }
    },  
}
</script>

<style lang="scss" scoped>
.right{
    justify-content: flex-end;
}

.item {
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
        span{
            margin: 0px _vw(3);
        }
        .time_2{
            font-size: _vw(12);
            color: #bbbbbb;
        }
    }
    .msg{}
}

.img_box1{
    img{
        max-width: _vw(250);
        max-height: _vw(300);
    }
}


</style>


