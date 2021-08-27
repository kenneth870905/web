<template>
    <el-row class="pcheader width" justify="center" type="flex">
        <el-row justify="space-between" type="flex" align="middle" class="w1200">
            <img @click="$router.push('/')" class="logo" src="static/image/logo.png" alt srcset />
            <el-row type="flex" align="middle">
                <!-- 已登录 -->
                <!-- <div class="input-1">{{text[L].huanying}}：xxxxxx</div>
                <el-button type="danger" size="small">我的账户</el-button>
                <el-button type="danger" size="small">退出</el-button> -->
                <!-- 没有登录 -->
                <el-input class="input-1" v-model="user.name" :placeholder="text[L].name" size="small"></el-input>
                <el-input class="input-1" v-model="user.name" :placeholder="text[L].password" size="small"></el-input>
                <el-button type="danger" size="small">{{text[L].logIn}}</el-button>
                <el-button type="danger" size="small">{{text[L].ForgotPassword}}</el-button>
                <el-button type="danger" plain size="small" @click="$router.push('/register')">{{text[L].registered}}</el-button>
            </el-row>
        </el-row>
        
        <!-- <div class="btn-2">
            <el-dropdown trigger="click"  @command="changeL">
                <el-button type="primary" size="small">
                    <span v-if="L=='zh'">中文</span>
                    <span v-if="L=='en'">English</span>
                    <span v-if="L=='tai'">ไทย</span>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu style="width: 150px;">
                        <el-dropdown-item command="zh">中文</el-dropdown-item>
                        <el-dropdown-item command="en">English</el-dropdown-item>
                        <el-dropdown-item command="tai">ไทย</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div> -->
    </el-row>
    
    <el-row type="flex" justify="center" class="pcheader2">
        <div class="list w1200">
            <div :class="{active:path=='/'}"><span @click="$router.push('/')">主页</span></div>
            <div :class="{active:path=='/cockfighting'}">
                <span @click="$router.push('/cockfighting')">斗鸡</span>
                <ul>
                    <li>
                        <img src="static/image/sv.png" alt="" srcset="">
                        <div>SV388</div>
                    </li>
                    <li>
                        <img src="static/image/digmaan.png" alt="" srcset="">
                        <div>Digmaan</div>
                    </li>
                </ul>
            </div>
            <div :class="{active:path=='/user/recharge'}"><span @click="$router.push('/user/recharge')">存款</span></div>
            <div :class="{active:path=='/user/withdraw'}"><span @click="$router.push('/user/withdraw')">提款</span></div>
            <div :class="{active:path=='/Discount'}"><span @click="$router.push('/Discount')">红利优惠</span></div>
            <div :class="{active:path=='/alliance'}"><span @click="$router.push('/alliance')">联属伙伴</span></div>
        </div>
    </el-row>

</template>

<script>
import { reactive, ref , inject, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
    setup(props) {

        const route = useRoute()

        const user = reactive({
            name: "",
            password: ""
        })
        const text = {
            zh: {
                name: "用户名",
                password: "密码",
                huanying:"欢迎",
                logIn:'登录',
                ForgotPassword:"忘记密码",
                registered:'注册'
            },
            en: {
                name: "username",
                password: "password",
                huanying:"welcome",
                logIn:"log in",
                ForgotPassword:'Forgot password',
                registered:'Registered'
            },
            tai:{
                name: "ชื่อผู้ใช้",
                password: "รหัสผ่าน",
                huanying:"ยินดีต้อนรับ",
                logIn:'เข้าสู่ระบบ',
                ForgotPassword:"ลืมรหัสผ่าน",
                registered:'จดทะเบียน'
            }
        }
        const L = ref('zh')
        let setLanguage = inject('setLanguage')

        const changeL = (str)=>{
            L.value=str
            setLanguage(str)
        }


        let path = computed(()=>{
            return route.path
        })

        


        return {
            user,

            text,
            L,
            changeL,
            path
        }
    }
}
</script>

<style lang="scss" scoped>
.pcheader {
    position: relative;
    .logo {
        height: 50px;
    }
    .input-1 {
        width: auto;
        margin: 0px 10px 0px 0px;
    }
    .btn-2 {
        position: absolute;
        right: 40px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        height: 33px;
    }
}
.pcheader2{
    background: var(--color);
    position: relative;
    .list{
        display: flex;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        >div{
            &:hover{
                ul{
                    display: flex;
                }
                span{
                    opacity: 0.8;
                    border-bottom: 3px solid #fff;
                }
            }
            &.active{
                span{
                    opacity: 0.8;
                    border-bottom: 3px solid #fff;
                }
            }
            >span{
                display: block;
                line-height: 40px;
                padding: 0px 15px;
                cursor: pointer;
            }
        }
    }
    ul{
        display: none;
        z-index: 0;
        position: absolute;
        width: 100%;
        top: 42px;
        left: 0px;
        background: rgba(0, 0, 0,0.6);
        text-align: center;
        justify-content: center;
        border-bottom: 5px solid #c8af96;
        img{
            height: 120px;
        }
        li{
            width: 200px;
            cursor: pointer;
            transition: all 1s;
            &:hover{
                background: #c8af96;
            }
        }
    }
}



</style>