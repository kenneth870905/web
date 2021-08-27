<template>
    <div class="title-1">
        <el-button type="success" size="small" @click="showAddBox=true">添加银行卡</el-button>
    </div>
    <el-table :data="list" border stripe size="mini">
        <el-table-column prop="bankName" label="银行"></el-table-column>
        <el-table-column prop="number" label="卡号"></el-table-column>
        <el-table-column prop="userName" label="持卡人"></el-table-column>
        <el-table-column label="操作" width="80px" align="center">
            <el-button type="warning" size="mini">删除</el-button>
        </el-table-column>
    </el-table>

    <el-dialog title="添加银行卡" v-model="showAddBox" width="500px">
        <el-form size="small">
            <el-form-item label="银行">
                <el-select v-model="bank.bankName" placeholder="" style="width: 100%;">
                    <el-option label="农业银行" value="农业银行"></el-option>
                    <el-option label="中国银行" value="中国银行"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卡号">
                <el-input v-model="bank.number" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="持卡人">
                <el-input v-model="bank.userName" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="small" @click="showAddBox = false">取 消</el-button>
                <el-button size="small" type="primary" @click="showAddBox = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    setup(props) {

        let list = reactive([
            { bankName: '中国银行', number: 'xxxxxxxxxxxxx', 'userName': '张三' },
            { bankName: '农业银行', number: 'xxxxxxxxxxxxx', 'userName': '张三' },
            { bankName: '建设银行', number: 'xxxxxxxxxxxxx', 'userName': '张三' },
        ])
         
        let showAddBox = ref(false)
        
        let bank=reactive({
            bankName:"",
            number:'',
            userName:''
        })

        return {
            list,
            showAddBox,
            bank
        }
    }
}
</script>

<style lang="scss" scoped>
.title-1 {
    text-align: right;
    margin: 0px 0px 20px;
}
</style>