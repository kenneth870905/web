<template>
    <div>
        <el-dialog :title="待入游戏.name" width="400px" :visible.sync="显示" :before-close="handleClose">
            <el-form :model="user" ref="user">
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="请输入转入金额" size="small" v-model="user.shiftToMoney">
                            <template type="danger" slot="prepend">转入余额</template>
                        </el-input>
                        <el-button size="small" type="info" @click="转入()">转入</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="请输入转出金额" size="small" v-model="user.rollOutMoney">
                            <template slot="prepend" class="title_1">转出余额</template>
                        </el-input>
                        <el-button size="small" type="info" @click="转出()">转出</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="正在获取" :value="userInfo.Money" size="small" :loading="true" disabled>
                            <template slot="prepend">平台余额</template>
                        </el-input>
                        <el-button size="small" @click="刷新用户余额()" type="primary" :disabled="userInfo.UserId ? false : true">刷新</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="正在获取" :value="平台余额" size="small" :loading="true" disabled>
                            <!-- <template slot="prepend">{{Aname}}余额</template> -->
                            <template slot="prepend">当前余额</template>
                        </el-input>
                        <el-button size="small" @click="获取平台余额()" type="primary" :disabled="userInfo.UserId ? false : true">刷新</el-button>
                    </div>
                </el-form-item>
                <el-button-group class="按钮组" size="medium">
                    <el-button type="danger" @click="进入游戏()" :disabled="userInfo.UserId ? false : true">进入游戏</el-button>
                    <el-button type="primary" @click="试玩()" :disabled="userInfo.UserId ? true : false">试玩体验</el-button>
                </el-button-group>
            </el-form>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="设置是否显示登录框(false)">取 消</el-button>
                <el-button type="primary" @click="设置是否显示登录框(false)">确 定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
import { api_登录试玩 } from "@/api/登录接口.js";
import { api_转入金额 } from "@/api/转入金额.js";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
    name: "",
    data() {
        return {
            MoneyAll: "",
            hint: "444",
            user: {
                shiftToMoney: "",
                rollOutMoney: ""
            }
        };
    },
    computed: {
        ...mapState({
            userInfo: x => x.user.userinfo,
            Aname: "Aname",
            待入游戏: x => x.待入游戏.待入游戏,
            显示: x => x.待入游戏.显示,
            平台余额: x => x.待入游戏.平台余额
        }),
        totalMoney() {
            // 总余额
            // return this.$store.state.Money
        },
        MinMoney() {
            // 平台余额
            return this.$store.state.Moneymin;
        }
    },
    methods: {
        ...mapActions({
            设置待入游戏: "待入游戏/设置",
            转入金额: "待入游戏/转入金额",
            转出金额: "待入游戏/转出金额",
            获取平台余额: "待入游戏/获取平台余额",
            getUserInfo: "user/getUserInfo",
            加载中: "加载中",

            成功提示: "成功提示",
            错误提示: "错误提示"
        }),
        async 刷新用户余额() {
            this.加载中(true);
            await this.getUserInfo();
            this.加载中(false);
        },
        转入() {
            var 整数 = /^[0-9]+.?[0-9]*$/; // 验证正整数
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
            var 整数 = /^[0-9]+.?[0-9]*$/; // 验证正整数
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
            this.加载中(true);
            try {
                var r = await api_登录试玩();
            } catch (error) {
                this.加载中(false);
                this.错误提示("系统错误，稍后再试");
                return;
            }
            if (r.data.code == 0) {
                this.成功提示("恭喜您登陆试玩账号成功！");
            } else {
                this.错误提示(r.data.msg);
            }
            this.getUserInfo();
            this.加载中(false);
        },
        handleClose() {
            this.设置待入游戏(["显示", false]);
        },
        进入游戏(formName) {
            if (this.userInfo.UserId) {
                var url =
                    config.iframe_url +
                    "/M/Other/Go?gameId=" +
                    this.待入游戏.gid +
                    "&tryOut=&type=" +
                    this.待入游戏.type;
                // 转换成小写
                // var type=this.待进入游戏.查询类型.toLowerCase();
                // var type=this.待进入游戏.url_key.toLowerCase();
                // var url=config.iframe_url+'/Bet/#playgame_'+type+'_'+tiaozhuanConfig[type][this.待进入游戏.url_id];
                console.log(url);
                window.open(url);
            } else {
                this.设置是否显示登录框(true);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.item {
    display: flex;
    .input_1 {
        margin-right: 10px;
        width: auto;
        flex-grow: 1;
    }
    /deep/ .el-input-group__prepend {
        background: red;
        color: #ffffff;
        min-width: 100px;
        text-align: center;
        box-sizing: border-box;
    }
    /deep/ .el-input.is-disabled {
        .el-input__inner {
            color: #000000;
        }
    }
}
/deep/ .el-dialog__header {
    border-bottom: 1px solid #cccccc;
}
.按钮组 {
    width: 100%;
    button {
        width: 50%;
    }
    /deep/ .el-button--danger {
        &.is-disabled {
            background: #fab6b6;
        }
        background: red;
    }
}
</style>
