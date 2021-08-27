<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">账号信息填写</h1>
            <!-- <a @tap="选择时间()" class="mui-btn mui-btn-link mui-pull-right">{{时间 ? 时间 : '选择日期'}} </a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="list">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell">
                        <div class="item" :class="{'active':index==1 || phone}">
                            <div class="选择国家" @click="选择国家()">
                                <span>+86</span>
                                <i class="icon iconfont icon-tubiaozhizuo-"></i>
                            </div>
                            <div class="input_box">
                                <span class="提示1">手机号码</span>
                                <input v-model="phone" @focus="index=1" @blur="index=''" type="text">
                            </div>
                        </div>
                        <div class="提示">手机号码将作为您的登录凭证</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <div class="item" :class="{'active':index==2 || username}">
                            <div class="input_box">
                                <span class="提示1">请输入用户名</span>
                                <input v-model="username" @focus="index=2" @blur="index=''" type="text">
                            </div>
                        </div>
                        <div class="提示">5-25字符，可用于登录或找回密码，不含除下划线以外的其他特殊字符</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <div class="item" :class="{'active':index==3 || password}">
                            <div class="input_box">
                                <span class="提示1">请输入密码</span>
                                <input type="password" v-model="password" @focus="index=3" @blur="index=''">
                            </div>
                            <i icon-yanjing1 class="icon iconfont icon-yanjing"></i>
                        </div>
                        <div class="提示">最少6位字符，至少包含英文字母，数字，符号中的两种组成</div>
                    </li>
                    <!-- <li class="mui-table-view-cell">
                        <div class="item" :class="{'active':index==4}">
                            <div class="input_box">
                                <span class="提示1">重复密码</span>
                                <input @focus="index=4" @blur="index=''" type="text">
                            </div>
                            <i icon-yanjing1 class="icon iconfont icon-yanjing"></i>
                        </div>
                        <div class="提示">最少6位字符，至少包含英文字母，数字，符号中的两种组成</div>
                    </li> -->
                    <li class="mui-table-view-cell">
                        <div class="item" :class="{'active':index==5 || 推荐人}">
                            <div class="input_box">
                                <span class="提示1">推荐人ID</span>
                                <input v-model="推荐人" @focus="index=5" @blur="index=''" type="text">
                            </div>
                        </div>
                        <div class="提示">最少6位字符，至少包含英文字母，数字，符号中的两种组成</div>
                    </li>
                    <li class="mui-table-view-cell">
                        <div class="item" :class="{'active':index==6 || code}">
                            <div class="input_box">
                                <span class="提示1">验证码</span>
                                <input v-model="code" @focus="index=6" @blur="index=''" type="text">
                            </div>
                            <img src="https://yun996.com/Home/Verify?v=0.9232953553856149" alt="" srcset="">
                        </div>
                        <div class="提示">请输入左侧验证码</div>
                    </li>
                </ul>
            </div>

            <div class="协议">
                    继续操作即视为同意
                    <span>云来平台服务协议</span>、
                    <span>隐私权政策</span>、
                    <span>法律声明</span>
                    和
                    <span>云来及客户端服务协议</span>
            </div>
            <btn />

        </div>
    </div>
</template>

<script>
import btn from '@/components/btn.vue'
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            index:"",
            value1:0,
            
            phone:"",
            username:"",
            password:"",
            推荐人:"",
            code:""
        }
    },
    methods: {
        选择国家(){
            this.$toast('目前只对中国大陆开放');
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ffffff;
}
.list{
    margin-top:_vw(10); 
    padding: 0px 10px;
    .mui-table-view:before,
    .mui-table-view:after{
        opacity: 0;
    }
    .item{
        padding: 10px 0px 0px;
        position: relative;
        display: flex;
        border-bottom: 1px solid #c8c7cc;
        &::before{
            position: absolute;
            width: 0px;
            height: 2px;
            left: 0px;
            right: 0px;
            margin: auto;
            bottom: -1px;
            content: "";
            z-index: 1;
            transition: all 0.5s;
            background: rgb(244, 67, 54);
        }
        &.active::before{
            width: 100%;
        }
        &.active{
            .input_box{
                .提示1{
                    top: -22px;
                    color: rgb(244, 67, 54);
                    font-size: _vw(12)
                }
            }
        }
    }
    .选择国家{
        white-space: nowrap;
        flex-shrink: 0;
        margin: 0px _vw(10) 0px 0px;
        span {
            margin: 0px _vw(15) 0px 0px;
        }
    }
    .input_box{
        width: 0;
        flex-grow: 1;
        position: relative;
        .提示1{
            position: absolute;
            color: rgba(0, 0, 0, 0.3);
            font-size: _vw(14);
            top: 0px;
            transition: all 0.3s;
        }
        input{
            padding: 0px;
            margin: 0px;
            height: auto;
            border: none;
        }
    }
    .提示{
        font-size: _vw(12);
        color: rgba(0,0,0,.4);
    }
    .mui-table-view-cell:after{   
        opacity: 0;
    }
}
.协议{
    margin: _vw(40) 25px;
    font-size: _vw(12);
    color: rgb(128, 128, 128);
    span{
        color: #ff5000;
    }
}
</style>
