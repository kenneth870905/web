<template>
    <div class="personage">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">个人资料</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div>
                <ul class="mui-table-view">
                    <!-- <li class="mui-table-view-cell title_1">
                        通用
                    </li>
                    <li class="mui-table-view-cell" @click="$router.push('/my/plsz')">
                        <a class="mui-navigate-right">
                            偏好设置
                        </a>
                    </li> -->
                    
                    <li class="mui-table-view-cell title_1">
                        头像昵称
                    </li>
                    <li class="mui-table-view-cell" @click="$router.push('/my/basic')">
                        <a class="mui-navigate-right">
                            头像昵称
                        </a>
                    </li>
                    <li class="mui-table-view-cell title_1">
                        安全设置
                    </li>
                    <li class="mui-table-view-cell" @click="跳转安全问题()">
                        <a class="mui-navigate-right">
                            安全问题
                        </a>
                    </li>
                    <li class="mui-table-view-cell" @click="$router.push('/my/cardbag')">
                        <a class="mui-navigate-right">
                            银行卡信息
                        </a>
                    </li>
                    <li class="mui-table-view-cell" @click="$router.push('/dlmima')">
                        <a class="mui-navigate-right">
                            登录密码
                        </a>
                    </li>
                    <li class="mui-table-view-cell" @click="$router.push('/aqmima')">
                        <a class="mui-navigate-right">
                            提款密码
                        </a>
                    </li>
                </ul>
            </div>
            

            <!-- <div class="mui-button-row out" @click="goOut()">
                退出登录
            </div> -->

            <div class="版本">
                当前版本 0.0.3
            </div>
        </div>
    </div>
</template>
<script>
import { api_退出登录 } from "@/api/登录接口.js";
import { api_GetPersonInfo } from "@/api/个人资料.js";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            Person:x=>x.个人资料.Person 
        })
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        ...mapActions({
            getUserInfo: "user/getUserInfo",
            getPersonInfo:'个人资料/getPersonInfo'
        }),
        async goOut(url) {
            this.加载中(true);
            try {
                var r = await api_退出登录();          
            } catch (error) {
                console.log(error)
                this.$toast('系统错误，稍后再试！')
            }
                this.加载中(false)
            if (r.data.code == 0) {
                this.$toast('退出成功');
                this.$router.push('/');
            } else {
                this.$toast(r.data.msg);
            }
            this.getUserInfo();
            // this.$store.state.title="",
            // this.$router.push(url)
        },
        跳转安全问题() {
            if (this.Person.IsAnswer) {
                mui.confirm('您已设置安全问题，如需修改请联系客服。', '提示', ['取消', '确定'], value => {

                }, 'div')
            } else {
                this.$router.push('/my/grzl/aqwt')
            }
        },
        初始化() {
            if(!this.Person){
                this.getPersonInfo();
            }
        }
    },
    mounted() {
        this.初始化()
    },
}
</script>
<style lang="scss" scoped>
.版本{
    position: fixed;
    bottom: 60px;
    left: 0px;
    width: 100%;
    font-size: 12px;
    color: #bdbdbd;
    text-align: center;
}
.personage {
    font-size: _vw(14);
    background: #ffffff;
    .title_1{
        background: #efeff4;
        color: #909090;
        &:after{
            display: none;
        }
    }
    .mui-fullscreen {
        ul {
            li {
                input {
                    font-size: _vw(14);
                }
                .mui-btn-block {
                    font-size: _vw(14);
                    float: left;
                    width: 50%;
                }
            }
        }
        .out {
            background: #ffffff;
            height: 40px;
            margin-top: _vw(37);
            color: red;
            padding-top: -vw(8);
            position: absolute;
            width: 100%;
            bottom: 0px;
            left: 0px;
        }
    }
}
</style>



