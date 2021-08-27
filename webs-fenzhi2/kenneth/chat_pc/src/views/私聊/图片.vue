<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box" @click="会员详情()">
            <i v-if="!正在聊天.SenderProfile.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="正在聊天.SenderProfile.ImgId" :src="config.img_url+'static/image/touxiang/'+正在聊天.SenderProfile.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <span v-if="正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.Nickname}}</span>
                <span v-if="!正在聊天.SenderProfile.Nickname">{{正在聊天.SenderProfile.MemberId}}</span>
                <span class="time_2">{{obj.CreateTime | filter_time}}</span>
            </p>
            
            <p class="time mui-text-right" v-if="type=='right'">
                <span class="time_2">{{obj.CreateTime | filter_time}}</span>
                <span v-if="自己.Nickname">{{自己.Nickname}}</span>
                <span v-if="!自己.Nickname">{{自己.UserId}}</span>
            </p>
            <div class="msg" @contextmenu="contextmenu_1">
                <div class="img_box1">
                    <img :src="obj.Message" @click="显示大图=true" alt="" srcset="">
                </div>
            </div>
        </div>
        <div v-if="type=='right'" class="img_box" >
            <i v-if="!自己.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="自己.ImgId" :src="config.img_url+'static/image/touxiang/'+自己.ImgId" alt="">
        </div>

        <div class="大图" v-if="显示大图==true" @click="显示大图=false">
            <img :src="obj.Message" alt="" srcset="">
        </div>
    </li>
</template>

<script>
// import { ImagePreview } from 'vant';
import { mapState , mapGetters , mapActions, mapMutations} from "vuex";
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
            显示大图:false
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
        ...mapActions({
            点击会员详情:"聊天室/点击会员详情",            
        }),
        会员详情(){
            var obj=this.obj;
                obj.OnlineId = this.obj.SenderCode  //Id
                obj.MemberId = this.正在聊天.SenderProfile.MemberId;
                obj.Nickname = this.正在聊天.SenderProfile.Nickname
                console.log(obj);
            this.点击会员详情(obj)
        },
        查看大图(){
            ImagePreview({
                images:[this.obj.Content],
                'show-index':false
            });
        },
        contextmenu_1(e){
            if(this.type=='right'){
                this.操作.obj=this.obj
                this.操作.top=e.y;
                this.操作.left=e.x
                this.操作.show=true;
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@function _vw($str){
    @return $str + px
}

.time_2{
    font-size: 12px;
}

.大图{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.4);
    z-index:32;
    img{
        max-width: 100%;
        max-height: 100%;
    }
}

.mui-text-right{
    text-align: right;   
}
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
        color: red;
        background: #cccccc;
        border-radius: 100%;
        i{
            line-height: _vw(30);
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
        .time_2{
            font-size: 12px;
        }
        span{
            margin: 0px 3px;
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


