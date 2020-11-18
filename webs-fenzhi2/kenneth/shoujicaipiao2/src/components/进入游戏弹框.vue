<template>
    <div class="tk" :class="'步骤_'+特邀引导.步骤">
        <van-popup v-model="进入游戏.显示弹框" :close-on-click-overlay="false" :overlay-style="{'z-index':20}">
            <div class="游戏弹框">
                <div class="title_1">{{进入游戏.title}}</div>
                <i @click="设置state(['显示弹框',false])" class="关闭 icon iconfont icon-guanbi"></i>
                <ul class="list">
                    <li>
                        <div class="title_2">转入余额</div>
                        <input type="number" v-model="金额1" class="money" @blur="blur()">
                        <button @click="转入()" class="转入 mui-btn mui-btn-primary">转入</button>
                    </li>
                    <li>
                        <div class="title_2">转出余额</div>
                        <input type="number" v-model="金额2">
                        <button @click="转出()" class="mui-btn mui-btn-primary">转出</button>
                    </li>
                    <li>
                        <div class="title_2">平台余额</div>
                        <input class="input_1" type="number" :value="userinfo.Money" readonly>
                        <button @click="刷新平台余额()" class="mui-btn mui-btn-primary">刷新</button>
                    </li>
                    <li>
                        <!-- <div class="title_2">{{进入游戏.name2 ? 进入游戏.name2 : 进入游戏.type}}余额</div> -->
                        <div class="title_2">当前余额</div>
                        <input class="input_1" :value="进入游戏.平台余额" type="number" readonly placeholder="正在获取">
                        <button class="mui-btn mui-btn-primary" @click="获取平台余额()">刷新</button>
                    </li>
                </ul>
                <div class="footer">
                    <button type="button" @click="进入()" class="进入 mui-btn mui-btn-danger">进入游戏</button>
                    <button type="button" @click="试玩()" class="mui-btn mui-btn-primary">试玩游戏</button>
                </div>
                <div class="mask"></div>
            </div>
        </van-popup>
        <div class="提示" v-show="进入游戏.显示弹框 && (特邀引导.步骤==6 || 特邀引导.步骤==7 || 特邀引导.步骤==8)">
            <img class="游戏箭头" :src="config.img_url+'static/image/yindao/jiantou.png'" alt="" srcset="">
            <div class="游戏说明">
                <span v-show="特邀引导.步骤==6">请在下方输入7</span>
                <span v-show="特邀引导.步骤==7">请点击转入</span>
                <span v-show="特邀引导.步骤==8">请点击进入游戏</span>
            </div>
        </div>
        
    </div>
</template>

<script>
import { api_登录试玩} from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name: "",
    components:{
    },
    data() {
        return {
            金额1:"",
            金额2:""
        }
    },
    computed: {
        ...mapState({
            进入游戏:x=>x.进入游戏,
            userinfo:x=>x.user.userinfo,
            特邀引导:x=>x.引导.特邀引导,
            config:"config"
        })
    },
    methods: {
        ...mapMutations({
            设置state_2:"设置state",
            M特邀引导:"引导/M特邀引导",
            设置state:"进入游戏/设置state",
            加载中:"加载中"
        }),
        ...mapActions({
            获取平台余额:"进入游戏/获取平台余额", 
            转入金额:"进入游戏/转入金额", 
            转出金额:"进入游戏/转出金额", 
            getUserInfo:'user/getUserInfo'
        }),
        blur(){
            if(this.金额1 && this.特邀引导.步骤==6){
                this.特邀引导.步骤 = 7
            }
        },
        转入() {
            var 整数=/^[0-9]+.?[0-9]*$/;  //验证正整数  
            if(!this.金额1){
                this.$toast('请输入转入金额');
            }else if(!整数.test(this.金额1)){
                this.$toast('请输入整数');
            }else{
                this.转入金额(this.金额1)
            }
            if(this.特邀引导.步骤==7){
                this.特邀引导.步骤 = 8
            }
        },
        转出(){
            var 整数=/^[0-9]+.?[0-9]*$/;  //验证正整数
            if(!this.金额2){
                this.$toast('请输入金额')
            }else if(!整数.test(this.金额2)){
                this.$toast('请输入整数')
            }else{
                this.转出金额(this.金额2)
            }
        },
        async 试玩(){
            if(this.userinfo.UserId){
                this.$toast('登录试玩账号点击进入游戏即可试玩！')
                return
            }
            try {
                var r = await api_登录试玩()            
            } catch (error) {
                this.$toast('系统错误，稍后再试')
            }
            if(r.data.code==0){
                this.$toast('登录成功')
                this.getUserInfo();
                this.获取平台余额();
            }else{
                this.$toast(r.data.msg)
            }
        },
        进入(){
            if(this.金额1 && this.特邀引导.步骤==8){
                this.特邀引导.步骤 = 'over'
                this.M特邀引导(['引导结束',true])
            }
            var url= config.api_url+ '/M/Other/Go?gameId='+this.进入游戏.id+'&tryOut=&type='+this.进入游戏.type;
            console.log(url);
            if (window.plus) {
                console.log('跳转1')
                window.location.href = url;
                // plus.runtime.openURL(url);
            }else if (window.webkit) {
                console.log('跳转2')
                window.location.href = url;
                // window.webkit.messageHandlers.FillMoney.postMessage({ link: url });
            }else {
                console.log('跳转3')
                window.open(url)
            }
        },
        async 刷新平台余额(){
            this.加载中(true);
            try {
                await this.getUserInfo()            
            } catch (error) {
                
            }
            this.加载中(false)
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>

.tk{
    &.步骤_6{
        .mask{
            display: block;
        }
        .money{
            position: relative;
            z-index: 1;
        }
        .游戏箭头{
            display: block;
            top: _vw(-140);
            left: _vw(-35);
        }
        .游戏说明{
            display: block;
            white-space: nowrap;
            top: _vw(-175);
            left: _vw(-75);
        }
    }
    &.步骤_7{
        .mask{
            display: block;
        }
        .转入{
            position: relative;
            z-index: 1;
            &::after{
                position: absolute;
                width: 150%;
                height: 150%;
                left: -25%;
                top: -25%;
                border: 2px dashed #fff;
                border-radius: 30px;
                content: '';
                box-sizing: border-box;
            }
        }
        .游戏箭头{
            display: block;
            top: _vw(-140);
            left: _vw(100);
        }
        .游戏说明{
            display: block;
            white-space: nowrap;
            top: _vw(-175);
            left: _vw(83);
        }
    }
    &.步骤_8{
        .mask{
            display: block;
        }
        .进入{
            position: relative;
            z-index: 1;
        }
        .游戏箭头{
            display: block;
            top: _vw(44) ;
            left: _vw(-100);
        }
        .游戏说明{
            display: block;
            white-space: nowrap;
            top: _vw(4);
            left: _vw(-125);
        }
    }
}

@keyframes shangxia{
    0%{
        margin-top: 0px;
    }50%{
        margin-top:-10px;
    }100%{
        margin-top: 0px;
    }
}




.游戏箭头{
    display: none;
    position: absolute;
    margin: auto;
    width: _vw(50);
    animation: shangxia 1s linear infinite;
}
.游戏说明{
    display: none;
    position: absolute;
    text-align: center;
    color: #fff;
}
.提示{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 21;
}



.mask{
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    // pointer-events: none;
    border-radius: 20px;
}

.tk{
    /deep/ .van-overlay{
        z-index: 20 !important;
    }
    .van-popup{ 
        background: none;
        z-index: 21 !important;
    }
}
.游戏弹框 {
    position: relative;
    width: _vw(320);
    min-height: _vw(100);
    border-radius: 20px;
    background: #ffffff;
    font-size: 14px;
    .title_1{
        line-height: _vw(40);
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
    }   
    .关闭{
        position: absolute;
        top: 12px;
        right: 12px;
        color: red;
    }
    .list{
        padding: 0px 10px;
        li{
            display: flex;
            align-items: center;
            margin: 10px 0px;
        }
        input{
            margin: 0px ;
            padding: 0px 10px;
            height: 32px;
        }
        .title_2{
            width: 130px;
        }
        button{
            margin: 0px 0px 0px 20px;
        }
        .input_1{
            background: #e5e5e5;
        }
    }
    .footer{
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        button{
            width: 48%;
        }
    }
}
</style>
