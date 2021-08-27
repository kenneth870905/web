<template>
    <div>
        <el-dialog :title="待进入游戏.name" width="400px" :visible.sync="显示进入游戏弹框" :before-close="handleClose">
            <el-form :model="user" ref="user">
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="请输入转入金额" size="small" v-model="user.shiftToMoney">
                            <template type="danger" slot="prepend">转入余额</template>
                        </el-input>
                        <el-button size="small" type="info" @click="转入()" :disabled="userInfo.UserId ? false : true">转入</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="请输入转出金额" size="small" v-model="user.rollOutMoney">
                            <template slot="prepend" class="title_1">转出余额</template>
                        </el-input>
                        <el-button size="small" type="info" @click="转出()" :disabled="userInfo.UserId ? false : true">转出</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="" :value="userInfo.Money" size="small" :loading="true" disabled>
                            <template slot="prepend">平台余额</template>
                        </el-input>
                        <el-button size="small" @click="刷新用户余额()" type="primary" :disabled="userInfo.UserId ? false : true">刷新</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="item">
                        <el-input class="input_1" placeholder="" :value="MinMoney" size="small" :loading="true" disabled>
                            <template slot="prepend">当前余额</template>
                        </el-input>
                        <el-button size="small" @click="刷新平台余额()" type="primary" :disabled="userInfo.UserId ? false : true">刷新</el-button>
                    </div>
                </el-form-item>

                <el-button-group class="按钮组" size="medium" v-show="登录状态==0">
                    <el-button type="danger" @click="submitForm('ruleForm')">进入游戏</el-button>
                    <el-button type="primary" @click="试玩()">试玩体验</el-button>
                    <!-- :disabled="userInfo.UserId ? true : false" -->
                </el-button-group>
                <el-button-group class="btn_1" size="medium" v-show="登录状态==1">
                    <!-- <el-button type="danger" @click="submitForm('ruleForm')">进入游戏</el-button> -->
                    <el-button type="primary" @click="submitForm('ruleForm')">试玩体验</el-button>
                    <!-- :disabled="userInfo.UserId ? true : false" -->
                </el-button-group>
                <el-button-group class="btn_1" size="medium" v-show="登录状态==2">
                    <el-button type="danger" @click="submitForm('ruleForm')">进入游戏</el-button>
                    <!-- <el-button type="primary" @click="试玩()">试玩体验</el-button> -->
                    <!-- :disabled="userInfo.UserId ? true : false" -->
                </el-button-group>



            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { api_登录试玩 } from '@/api/登录接口.js'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
export default {
    name: '',
    data() {
        return {
            MoneyAll: '',
            hint: '444',
            user: {
                shiftToMoney: '',
                rollOutMoney: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            显示进入游戏弹框: '显示进入游戏弹框',
            待进入游戏: '待进入游戏',
            userInfo: 'userInfo'
        }),
        totalMoney() { // 总余额
            return this.$store.state.Money
        },
        MinMoney() { // 平台余额
            return this.$store.state.Moneymin
        },
        登录状态(){
            // 0 未登录 1 试玩 2 正式 
            if(!this.userInfo.UserId){
                return 0
            }else if(this.userInfo.UserId.includes('Demo')){
                return 1
            }else{
                return 2
            }
        }
    },
    methods: {
        ...mapActions({
            openloading:"openloading",
            设置进入游戏弹框: '设置进入游戏弹框',
            设置是否显示登录框: '设置是否显示登录框',
            getUserInfo: 'getUserInfo',
            获取平台余额: '获取平台余额',
            转入金额: '转入金额',
            转出金额: '转出金额'
        }),
        async 刷新平台余额() {
            this.openloading(true)
            try {
                await this.获取平台余额(this.待进入游戏.type)            
            } catch (error) {}
            this.openloading(false);
        },
        async 刷新用户余额(){
            this.openloading(true)
            await this.getUserInfo()
            this.openloading(false);
        },
        转入() {
            var 整数 = /^[0-9]+.?[0-9]*$/ // 验证正整数
            if (!this.user.shiftToMoney) {
                this.$alert('请输入金额', '友情提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定'
                })
            } else if (!整数.test(this.user.shiftToMoney)) {
                this.$alert('请输入整数', '友情提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定'
                })
            } else {
                this.转入金额(this.user.shiftToMoney)
            }
        },
        转出() {
            var 整数 = /^[0-9]+.?[0-9]*$/ // 验证正整数
            if (!this.user.rollOutMoney) {
                this.$alert('请输入金额', '友情提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定'
                })
            } else if (!整数.test(this.user.rollOutMoney)) {
                this.$alert('请输入整数', '友情提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定'
                })
            } else {
                this.转出金额(this.user.rollOutMoney)
            }
        },
        async 试玩() {
            var r = await this.$confirm('此操作将自动登录一个试玩账号，每个IP每天仅允许有3个试玩帐号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);
            if(!r) return

            await api_登录试玩()
            this.$message.success('恭喜你试玩账号登陆成功')
            this.getUserInfo()
        },
        handleClose() {
            console.log('点击了关闭')
            this.设置进入游戏弹框(false)
        },
        // 提交
        submitForm(formName) {
            if (this.userInfo.UserId) {
                var url = config.iframe_url + '/M/Other/Go?gameId=' + this.待进入游戏.gid + '&tryOut=&type=' + this.待进入游戏.type
                console.log(url)
                window.open(url)
            } else {
                this.设置是否显示登录框(true)
            }
        }
    }
}
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
    .el-input.is-disabled {
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
        background: red;
    }
}
.btn_1 {
    width: 100%;
    button{
        width: 100%;
    }
    /deep/ .el-button--danger {
        background: red;
    }
}
</style>
