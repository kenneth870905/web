<template>
    <Modal class="在线充值" title="充值" v-model="充值弹框" width="500" :mask-closable="false">
        <Form :label-width="80" size="small" ref="Form" :model="cz" :rules="rules">
            <FormItem label="收款账户" prop="description">
                <Select v-model="cz.description" placeholder="请选择收款账号">
                    <Option v-for="item in 入款账户" :value="`${item.cardNo}(${item.bankName})`">{{item.cardNo}}({{item.bankName}})</Option>
                </Select>
            </FormItem>
            <FormItem label="充值账单" prop="billNo">
                <Input v-model="cz.billNo" placeholder="请输入充值账单号" />
            </FormItem>
            <FormItem label="充值金额" prop="amount2">
                <input type="number" v-model.number="cz.amount2" placeholder="请输入充值金额" class="ivu-input ivu-input-default" />
            </FormItem>
        </Form>
        <ul class="说明">
            <li>充值说明:</li>
            <li>1.向存款账号转账</li>
            <li>2.填写 微信/支付宝/银行 返回的充值订单号和金额</li>
            <li>3.提交充值凭证</li>
            <li>充值到账金额以实际金额为准，填写错误可能导致无法到账，请勿随意填写，到账时间约为1-2分钟</li>
        </ul>
        <div slot="footer">
            <Button @click="充值弹框=false">取消</Button>
            <Button type="primary" @click="提交()">提交</Button>
        </div>
    </Modal>
</template>

<script>
import { mapState } from 'vuex';
export default {
    inject: [],
    data() {
        return {
            充值弹框: false,
            value: "",
            cz: { "amount": 0, "description": "", amount2: 0, billNo: "" },
            rules: {
                description: [
                    { required: true, message: '请选择收款账户', trigger: 'blur' }
                ],
                billNo: [
                    { required: true, message: '请输入充值账单号', trigger: 'blur' }
                ],
                amount2: [
                    {
                        required: true, trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入充值金额'));
                            } else if (value < 0.01) {
                                callback(new Error('充值金额不能小于0.01'));
                            } else {
                                callback();
                            }
                        }
                    },
                ]
            }
        }
    },
    computed: {
        ...mapState({
            入款账户: "入款账户"
        })
    },
    methods: {
        提交() {
            this.$refs.Form.validate((valid) => {
                if (valid) {
                    this.$Spin.show()
                    this.$axios.post('/api/loadrecord', this.cz).then(res => {
                        console.log(res)
                        if (res.data.code === 0) {
                            this.正确('提交成功')
                            this.充值弹框 = false
                        } else {
                            this.错误(res.data.message)
                        }
                        this.$Spin.hide()
                    }).catch(err => {
                        this.$Spin.hide()
                        console.error(err);
                        this.错误('系统错误，稍后再试')
                    })
                }
            })
        }
    },
    watch: {
        'cz.amount2'(newVal, oldVal) {
            if (newVal) {
                console.log(newVal)
                // let price2 = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(newVal)
                let price2 = parseFloat(Math.floor(newVal * 100)) / 100

                this.cz.amount2 = parseFloat(price2)
                this.cz.amount = parseInt(this.cz.amount2 * 100)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.说明 {
    color: red;
    li:not(:nth-child(1)) {
        padding: 0px 0px 0px 16px;
    }
}
</style>