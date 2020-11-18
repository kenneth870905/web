<template>
    <div>
        <!-- <button @click="centerDialogVisible = true" >点击</button> -->
        <el-dialog :title="待进入游戏.name" :visible.sync="centerDialogVisible" width="30%" center @close="close1" v-if="设置进入游戏弹框">
            <table>
                <tr>
                    <td>
                        <el-button type="danger" plain disabled>转入余额</el-button>
                    </td>
                    <td>
                        <el-input v-model="user.shiftToMoney" placeholder="请输入转入金额"></el-input>
                    </td>
                    <td>
                        <el-button type="info" plain @click="转入()">转入</el-button>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <el-button type="danger" plain disabled>转出余额</el-button>
                    </td>
                    <td>
                        <el-input v-model="user.rollOutMoney" placeholder="请输入转出金额"></el-input>
                    </td>
                    <td>
                        <el-button type="info" @click="转出()" plain>转出</el-button>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <el-button type="danger" plain disabled>平台余额</el-button>
                    </td>
                    <td>
                        <el-input :value="userInfo.Money" :loading="true"></el-input>
                    </td>
                    <!-- <td> <el-input v-model="input"  :value="userInfo.Money" :disabled="true"></el-input></td> -->
                    <td>
                        <el-button type="info" @click="getUserInfo()" plain>刷新</el-button>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        <el-button type="danger" plain disabled>当前余额</el-button>
                    </td>
                    <td>
                        <el-input :value="待进入游戏.金额" :loading="true"></el-input>
                    </td>
                    <td>
                        <el-button type="info" @click="刷新平台余额()" plain>刷新</el-button>
                    </td>
                </tr>
            </table>
            <table class="enter_game">
                <tr>
                    <el-button type="danger" :disabled="userInfo.UserId ? false : true" @click="submitForm('ruleForm')">进入游戏</el-button>
                    <el-button type="primary" @click="试玩()" :disabled="userInfo.UserId ? true : false">试玩体验</el-button>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
import { api_登录试玩 } from "@/api/登录接口.js";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            centerDialogVisible: true,
            input: "",
            MoneyAll: "",
            hint: "444",
            user: {
                shiftToMoney: "",
                rollOutMoney: ""
            }
        };
    },
    computed: {
        ...mapGetters({
            显示进入游戏弹框: "显示进入游戏弹框",
            待进入游戏: "待进入游戏",
            userInfo: "userInfo"
        }),
        ...mapState({
            Aname: "Aname"
        }),
        totalMoney() {
            //总余额
            return this.$store.state.Money;
        },
        // MinMoney() {
        //     //平台余额
        //     return this.$store.state.Moneymin;
        // }
    },
    methods: {
        ...mapActions({
            设置进入游戏弹框: "设置进入游戏弹框",
            设置是否显示登录框: "设置是否显示登录框",
            getUserInfo: "getUserInfo",
            获取平台余额: "获取平台余额",
            转入金额: "转入金额",
            转出金额: "转出金额",
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        close1() {
            console.log(132)
            this.修改state(['显示进入游戏弹框', false])
        },
        刷新平台余额() {
            this.获取平台余额(this.待进入游戏.查询类型);
        },
        转入() {
            var 整数 = /^[0-9]+.?[0-9]*$/; //验证正整数
            if (!this.user.shiftToMoney) {
                this.$alert("请输入金额", "友情提示", {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: "确定"
                });
            } else if (!整数.test(this.user.shiftToMoney)) {
                this.$alert("请输入整数", "友情提示", {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: "确定"
                });
            } else {
                this.转入金额(this.user.shiftToMoney);
            }
        },
        转出() {
            var 整数 = /^[0-9]+.?[0-9]*$/; //验证正整数
            if (!this.user.rollOutMoney) {
                this.$alert("请输入金额", "友情提示", {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: "确定"
                });
            } else if (!整数.test(this.user.rollOutMoney)) {
                this.$alert("请输入整数", "友情提示", {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: "确定"
                });
            } else {
                this.转出金额(this.user.rollOutMoney);
            }
        },
        async 试玩() {
            await api_登录试玩();
            this.$message.success("恭喜你试玩账号登陆成功");
            this.getUserInfo();
        },
        handleClose() {
            console.log("点击了关闭");
            this.设置进入游戏弹框(false);
        },
        //提交
        submitForm(formName) {
            if (this.userInfo.UserId) {
                // if (!this.待进入游戏.gid || !this.待进入游戏.查询类型) {
                //     alert("参数错误,请刷新再试");
                //     return;
                // }
                // var gid=tiaozhuanConfig[this.待进入游戏.url_key][this.待进入游戏.url_id];
                // var url=config.api_url+ '/M/Other/Go?gameId='+this.待进入游戏.id+'&tryOut=&type='+this.待进入游戏.type
                var url =
                    config.api_url +
                    "/M/Other/Go?gameId=" +
                    this.待进入游戏.id +
                    "&tryOut=&type=" +
                    this.待进入游戏.type;
                //console.log(url)
                // https://0698aa.com/ M/Other/Go?gameId=11&tryOut=&type=AG

                //转换成小写
                // var type=this.待进入游戏.查询类型.toLowerCase();
                // var type=this.待进入游戏.url_key.toLowerCase();
                // var url=config.iframe_url+'/Bet/#playgame_'+type+'_'+tiaozhuanConfig[type][this.待进入游戏.url_id];
                window.open(url);
            } else {
                this.设置是否显示登录框(false);
            }
        }
    }
};
//
</script>

<style>
.el-dialog--center .el-dialog__body {
    padding: 25px 98px 30px !important;
}
.enter_game {
    padding-left: 80px;
}
.el-dialog {
    border-radius: 25px !important;
}
</style>
