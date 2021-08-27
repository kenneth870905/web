<template>
    <div>
        <van-nav-bar title="提现密码" z-index="10" left-arrow @click-left="$back()"/>
        <ul class="list">
            <li>
                <label>手机号码：</label>
                <span>131****7902</span>
            </li>
            <li>
                <label>旧密码：</label>
                <input placeholder="请输入旧密码" type="password">
            </li>
            <li class="">
                <label>新密码:</label>
                <input placeholder="请输入新的登录密码" type="password">
            </li>
            <li class="">
                <label>确认密码:</label>
                <input placeholder="请再次确认登录密码" type="password">
            </li>
            <li>
                <label>验证码:</label>
                <input  placeholder="请输入验证码" type="text">
                <button class="yzmbtn" type="button">获取验证码</button>
            </li>
        </ul>

        <btn name="确定"/>
    </div>
</template>

<script>
import btn from '@/components/btn.vue';
export default {
    name:"",
    components:{
        btn
    },
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>

.list{
    margin: _vw(10) 0px 0px;
    padding: _vw(0) _vw(10);
    background: #ffffff;
    font-size: _vw(13);
    li{
        display: flex;
        align-items: center;
        height: _vw(46);
        border-bottom: 1px solid #cccccc;
        &:last-child{
            border-bottom: none;
        }
        label{
            width: _vw(80);
            flex-shrink: 0;
        }
        input{
            width: 100%;
            border: none;
        }
        .yzmbtn{
            white-space: nowrap;
            height: 100%;
            padding: 0px _vw(15);
            background: none;
            color: red;
            border-right: none;
            border-top: none;
            border-bottom: none;
        }
    }
}
</style>
