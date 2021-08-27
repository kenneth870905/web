<template>
    <div >
        <van-nav-bar title="登录注册" left-text="首页" left-arrow @click-left="$router.push('/')"/>
        <div class="登录">
            <van-cell-group class="输入框">
                <van-field @keydown.enter="登录()" v-model="user.userName" placeholder="用户名/邮箱/手机号码" clearable />
                <van-field @keydown.enter="登录()" v-model="user.password" :type="ispassword ? 'password' : 'text'" clearable  @click-right-icon="ispassword=!ispassword" :right-icon="ispassword ? 'closed-eye' : 'eye-o'" placeholder="请输入密码">
                    <span slot="button" @click="$toast('请联系管理员')">忘记密码</span>
                </van-field>
            </van-cell-group>
            <div class="btn_list">
                <van-button @click="登录()" round type="warning" size="large">登录</van-button>
                <!-- <van-button round plain  type="warning" size="large">一键登录</van-button> -->
            </div>
            <ul class="box_1">
                <li>
                    <!-- 短信验证码登录 -->
                </li>
                <li @click="$router.push('/register')">快速注册</li>
            </ul>
            <van-divider>其他登录方式</van-divider>
            <ul class="其他">
                <li @click="$toast('暂未开放')">
                    <img src="static/image/login/qq.png" alt="" srcset="">
                    <div>QQ</div>
                </li>
                <li @click="$toast('暂未开放')">
                    <img src="static/image/login/weixin.png" alt="" srcset="">
                    <div>微信</div>
                </li>
            </ul>
            <div class="提示">
                登录即代表您已同意<a href="javascript:;" @click="显示隐私策略=true">隐私策略</a> 
            </div>
        </div>
        <van-popup v-model="显示隐私策略" :close-on-click-overlay="false">
            <yscl />
        </van-popup>
    </div>
</template>

<script>
import yscl from '@/components/隐私策略.vue'
import { mapMutations , mapState} from "vuex";
export default {
    name: "",
    components:{
        yscl
    },
    provide(){
        return {
            关闭隐私策略:()=>{
                this.显示隐私策略=false
            }
        }
    },
    data() {
        return {
            显示隐私策略:false,
            ispassword:true,
            user:{
                userName:"",
                password:"",
            }
        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo,
            token有效:x=>x.user.token有效
        })
    },
    methods: {
        ...mapMutations({
            保存用户:'user/保存用户',
            修改userState:'user/修改state'
        }),
        登录(){
            this.$axios.post('/user/login',this.user).then(x=>{
                if(x.data.message){
                    this.$toast(x.data.message);
                }else{
                    this.保存用户(x.data.user);
                    this.修改userState(['token',x.data.token]);
                    this.$toast('登录成功');
                    this.$router.push('/my');
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.登录{
    padding: 0px _vw(20);
}

.输入框{
    border-bottom: 1px solid #ebedf0;
    &::after{
        display: none;
    }
    .van-cell{
        margin: _vw(20) 0px ;
    }
    .van-cell-group{
        border: none;
    }
    /deep/ .van-field__button{
        border-left: 1px solid #eeeeee;
        margin-left:_vw(20);
    }
}

.btn_list{
    padding: _vw(20) 0px;
    button{
        margin: _vw(10) 0px;
    }
}

.box_1{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0,0,0,.4);
    font-size: _vw(14);
}

.van-divider{
    margin-top: _vw(60);
}

.其他{
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: _vw(14);
    color: rgba(0,0,0,.4);
    li{
        width: 48px;
        margin:0px _vw(15);
        img{
            width: 100%;
        }
    }
}
.提示{
    text-align: center;
    font-size: _vw(14);
    margin: _vw(10) 0px 30px;
    color: rgba(0,0,0,.5);
}

</style>

