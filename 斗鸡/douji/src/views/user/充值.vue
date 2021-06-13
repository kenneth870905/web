<template>
    <div class="chongzhi">
        <ul class="list">
            <li :class="{active:czType==0}" @click="czType=0">转账到银行卡</li>
            <li :class="{active:czType==1}" @click="czType=1">转账到微信</li>
            <li :class="{active:czType==2}" @click="czType=2">转账到支付宝</li>
        </ul>

        <div v-if="czType==0">
            <div class="title-1">支持银行</div>
            <div class="box-1">
                <el-table :data="list" border size="mini">
                    <el-table-column prop="bankName" label="银行"></el-table-column>
                    <el-table-column prop="number" label="卡号"></el-table-column>
                    <el-table-column prop="name" label="持卡人姓名"></el-table-column>
                    <el-table-column prop="beizhu" label="备注"></el-table-column>
                </el-table>
            </div>
            <div class="title-1">填写充值信息</div>
            <div>
                <el-form class="form" size="small">
                    <el-form-item label="选择收款银行">
                        <el-select v-model="form.bankName" placeholder="请选择收款银行" style="width: 100%;">
                            <el-option v-for="(item,index) in list" :key="index" :label="item.bankName+'('+item.number+')'" :value="item.bankName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请输入充值金额">
                        <el-input v-model="form.Amount" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="银行反馈账单号">
                        <el-input v-model="form.nnumber" placeholder=""></el-input>
                    </el-form-item>
                    <el-button type="warning" style="width: 100%;">已充值完成，提交订单</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    setup(props) {
        let list = reactive([
            { bankName: "中国银行", number: '000000000000000', name: "张三", beizhu: "额度为：100-1000元" },
            { bankName: "农业银行", number: '1111111111111111', name: "张三", beizhu: "额度为：100-1000元" }
        ])

        let form = reactive({
            bankName: "",
            Amount:0,
            nnumber:''
        })

        let czType = ref(0)



        return {
            list,
            form,
            czType
        }
    }
}
</script>


<style lang="scss" scoped>
.title-1 {
    padding: 10px 20px;
    font-size: 14px;
}
.list {
    line-height: 40px;
    display: flex;
    background: #e4e4e4;
    li {
        padding: 0px 15px;
        cursor: pointer;
        &:hover{
            background: var(--color);
            color: #fff;
        }
        &.active{
             background: var(--color);
            color: #fff;
        }
    }
}
.form{
    width: 500px;
    border: 1px solid red;
    padding: 10px;
    border-radius: 10px;
}
</style>