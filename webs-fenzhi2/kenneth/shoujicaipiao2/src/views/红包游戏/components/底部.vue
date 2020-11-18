<template>
    <div class="底部" ref="b" :class="className">
        <div class="气泡" v-show="未读条数>0" @click="到底()">
            {{未读条数}}
        </div>
        <div class="输入框">
            <input id="hbInput" type="text" @focus="获得焦点()" @blur="失去焦点()" @keyup.enter="发送文字()" v-model="text" :readonly='!user.IsSend' :placeholder="!user.IsSend ? '发言已被限制':'' ">
            <i @click="选择表情包()" class="icon iconfont icon-smile"></i>
            <!-- <label for="hbInput" class="btn_1" @click="发送文字()">发送</label> -->
            <div class="btn_1" v-show="可以发送" @click="发送文字()">发送</div>
            <!-- <button  class="mui-btn mui-btn-primary">发送</button> -->
            <i v-show="!可以发送" @click="选择更多()" class="icon iconfont icon-jiahao"></i>
        </div>
        <div class="box_2" v-show="显示更多!=0">
            <ul class="字体" v-show="显示更多==1">
                <li @click="小表情(item)" v-for="(item, index) in 字体" :key="index">{{item}}</li>
            </ul>
            <ul class="更多" v-show="显示更多==2">
                <!-- <li @click="$toast('暂未开放')">
                    <div><img :src="config.img_url+'static/image/hbgame/fuli.png'" alt=""></div>
                    <div>福利</div>
                </li> -->
                <li @click="发红包()">
                    <div><img :src="config.img_url+'static/image/hbgame/hongbao.png'" alt=""></div>
                    <div>红包</div>
                </li>
                <li @click="$router.push('/agent')">
                    <div><img :src="config.img_url+'static/image/hbgame/jiaMeng.png'" alt=""></div>
                    <div>加盟</div>
                </li>
                <li @click="$router.push('/my/chongzhi')">
                    <div><img :src="config.img_url+'static/image/hbgame/chongZhi.png'" alt=""></div>
                    <div>充值</div>
                </li>
                <li @click="$router.push('/my/tixian')">
                    <div><img :src="config.img_url+'static/image/hbgame/tixian.jpg'" alt=""></div>
                    <div>提现</div>
                </li>
                <li @click="$router.push('/my/zxkf')">
                    <div><img :src="config.img_url+'static/image/hbgame/keFu.png'" alt=""></div>
                    <div>客服</div>
                </li>
                <li @click="$router.push('/hbGame/rule')">
                    <div><img :src="config.img_url+'static/image/hbgame/wanFa.png'" alt=""></div>
                    <div>玩法</div>
                </li>
               
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name:"",
    inject:['到底'],
    data() {
        return {
            字体: ['😀', '😁', '😂', '😃', '😅', '😆', '😇', '😈', '😉', '😑', '😒', '😓', '😔', '😕', '😖', '😘', '😡', '😭', '😣', '😤', '😨',
                '😩', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '🎤', '🎲', '🎵', '🏀', '🏂', '🏡', '🀄', '💡', '💢', '💣', '💤', '💩', '💪', '💰', '📚',
                '📞', '📢', '🚫', '🚿', '🌏', '🌻', '🍚', '🍫', '🍻', '👊', '👌', '👍', '👎', '👏', '👪', '👫', '😬', '👻', '👼', '👽', '👿', '💊', '💋', '💍',
                '🔫', '😊', '😋', '😌', '😍', '😎', '😏', '😚', '😜', '😝', '😞', '😟', '😪', '😫', '😢', '😯', '🙊', '🙏', '🌙', '🌲', '🌹', '🍉', '🍖',
                '🍦', '🍷', '🎁', '🎂', '🎄', '🎉', '🎓', '🐴', '🐶', '🐷', '👑', '💄', '💔', '🔥', '🕖', '🙈', '🙉', '🚀', '⭐', '⏰', '⏳', '⚡', '⚽', '⛄',
                '⛅', '☝', '☺', '✊', '✋', '✌', '✏', '☀', '☁', '☔', '☕', '❄'],
            显示更多:0,
            text:"",
            className:"",
            type:100  //100 扫雷红包 300 禁抢红包
        }
    },
    computed: {
        ...mapState({
            config:'config',
            user:x=>x.红包游戏.user,
            房间id:x=>x.红包游戏.房间id,
            未读条数:x=>x.红包游戏.未读条数
        }),
        可以发送(){
            let test1=/^\s+$/;
            if(!this.text || test1.test(this.text)){
                return false
            }else{
                return true
            }
        }
    },
    methods: {
        ...mapMutations({
            设置key:"红包游戏/设置key"
        }),
        ...mapActions({
            发送消息:'红包游戏/发送消息',
        }),
        发红包(){
            if(this.type==100){
                this.$router.push(`/hbGame/sendSaol?id=${this.房间id}`)
            }else if(this.type==300){
                this.$router.push(`/hbGame/sendJQ?id=${this.房间id}`)
            }else{
                this.$router.push(`/hbGame/sendSaol?id=${this.房间id}`)
            }
        },
        选择表情包(){
            if(!this.user.IsSend){
                this.$toast('发言已经被限制，请联系客服')
                return
            }
            this.显示更多=1
            this.$parent.显示头部 = false
        },
        选择更多(){
            if(!this.user.IsSend){
                this.$toast('发言已经被限制，请联系客服')
                return
            }
            this.显示更多=2
            this.$parent.显示头部 = false
        },
        小表情(item){
            if(!this.user.IsSend) return
            this.text += item
        },
        发送文字(){
            if(!this.user.IsSend){
                this.$toast('发言已经被限制，请联系客服')
                return
            }
            if (!this.text || this.text=='' || this.text.match(/^\s+$/)) {
                this.$toast('请输入文字')
                return
            }
            let obj={
                    type:1,
                    Content:this.text
                }
            this.发送消息(obj)
            this.text=''
        },
        获得焦点(){
            if(this.显示更多!=0){
                this.显示更多=0 
                setTimeout(() => {
                    this.$refs.b.scrollIntoView({ block: 'center'})            
                }, 500);
            }
            this.到底()
            // this.设置key(['输入焦点',true])
            this.$parent.显示头部 = false
        },
        失去焦点(){
            // this.设置key(['输入焦点',false])
            this.$parent.显示头部 = true
        }
    },
    mounted() {
        this.type = this.$route.query.type
    },
}
</script>

<style lang="scss" scoped>
.底部{
    position: relative;
    border-top: 1px solid #cccccc;
}
.气泡{
    position: absolute;
    background: #0195ff;
    top: -40px;
    right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
    &::after{
        position: absolute;
        left: 0px;
        top: 85%;
        right: 0px;
        margin: auto;
        content: '';

        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-top: 10px solid#0195ff;
    }
}

.输入框{
    display: flex;
    height: _vw(50);
    padding: 5px;
    align-items: center;
    input{
        margin: 0px 5px 0px 0px;
    }
    input[readonly="readonly"]{
        background: #f7f7f7;
    }
    i{
        color: #767676;
        font-size: _vw(36);
    }
    .icon-smile{
        margin: 0px _vw(5);
    }
    button{
        font-size: _vw(12);
        padding: 0px;
        width: _vw(36);
        height: _vw(36);
        flex-shrink: 0;
    }
    .btn_1{
        font-size: _vw(12);
        line-height: _vw(36);
        width: _vw(36);
        background: #007aff;
        text-align: center;
        flex-shrink: 0;
        color: #ffffff;
    }
}

.box_2{
    height: _vw(290);
    padding: _vw(10) 0px 0px;
}

.字体{
    // padding: _vw(25) 0px 0px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: _vw(20);
    li{
        width: 20%;
        height: _vw(44);
    }
}

.更多{
    padding: _vw(20) 0px 0px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    align-content:baseline;
    font-size: _vw(13);
    li{
        width: 25%;
        text-align: center;
        margin-bottom: _vw(50);
    }
    img{
        height: 34px;
    }
}

</style>
