<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box" @click="会员详情()">
            <i v-if="!obj.ImgId || obj.ImgId=='null'" class="icon iconfont icon-touxiang"></i>
            <img v-if="obj.ImgId && obj.ImgId!='null'" :src="config.img_url+'static/image/touxiang/'+obj.ImgId" alt="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <template v-if="obj.ChatRole">
                    <img v-if="obj.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">                    
                    <img v-if="obj.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
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
                    <img v-if="user.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">                    
                    <img v-if="user.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
                </template>
                <template v-else>
                    <span v-if="!user.VipImg">{{obj.Vip}}</span>
                    <img v-if="user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+obj.Vip+'.png'" alt="">
                </template>
                
            </p>
            <div class="msg" @touchstart="touchstart_1($event)" @touchend="touchend_1()">
                <div class="img_box1">
                    <img :src="obj.Content" @click="查看大图()" alt="" srcset="">
                </div>
            </div>
        </div>
        
        <div v-if="type=='right'" class="img_box">
            <i v-if="!user.ImgId" class="icon iconfont icon-touxiang"></i>
            <img v-if="user.ImgId" :src="config.img_url+'static/image/touxiang/'+user.ImgId" alt="">
        </div>
    </li>
</template>

<script>
import { ImagePreview } from 'vant';
import { mapState , mapActions, mapMutations} from "vuex";

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
    computed: {
        ...mapState({
            config:'config',
            user:x=>x.聊天室.user,
            userinfo:x=>x.user.userinfo,
            操作:x=>x.聊天室.操作
        }),
        type(){
            return this.obj.OnlineId == this.user.OnlineId ? 'right' : 'left';
        }
    },
    methods: {
        ...mapActions({
            点击会员详情:'聊天室/点击会员详情'
        }),
        查看大图(){
            ImagePreview({
                images:[this.obj.Content],
                'show-index':false
            });
        },
        touchstart_1(e){
            console.log('按下')
            if(this.user.ChatRole!=1){
                return
            }
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
            this.点击会员详情(this.obj)
        }
    },  
}
</script>

<style lang="scss" scoped>
.right{
    justify-content: flex-end;
    .time{
        justify-content: flex-end;
    }
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
        font-size: _vw(12);
        display: flex;
        align-items: center;
        img{
            min-height: _vw(16);
        }
        span{
            margin: 0px _vw(3);
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


