<template>
    <div class="title-1">请核实你的存提款银行信息，如你打算更新有关信息，请联系我们的在线客服专员。</div>
    <el-form label-width="120px" class="form" size="small">
        <el-form-item label="收款银行">
            <el-select v-model="form.bankName" placeholder="请选择收款银行" style="width: 500px;">
                <el-option v-for="(item,index) in list" :key="index" :label="item.bankName+'('+item.number+')'" :value="item.bankName"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="银行">
            <div>中国建设银行</div>
        </el-form-item>
        <el-form-item label="卡号">
            <div>0000000000000000000000000</div>
        </el-form-item>
        <el-form-item label="持卡人姓名">
            <div>张三</div>
        </el-form-item>
        <el-form-item label="取款金额">
            <el-input v-model="form.amount" placeholder="" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="warning" style="width: 100px;">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup(props) {
        
        let form = reactive({
            bank:"",
            amount:0
        })
        let list = reactive([
            { bankName: "中国银行", number: '000000000000000', name: "张三", beizhu: "额度为：100-1000元" },
            { bankName: "农业银行", number: '1111111111111111', name: "张三", beizhu: "额度为：100-1000元" }
        ])

        return{
            list,
            form
        }
    }
}
</script>

<style lang="scss" scoped>
.title-1{
    color:red;
    border-bottom: 1px solid #eee;
    padding: 10px 0px;
}

.form{
    padding: 10px 50px;
    margin: 20px auto;
}
</style>