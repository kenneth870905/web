<template>
    <div>
        <div class="header-1">
            <el-select class="r15" v-model="刷新时间" size="mini" style="width: 120px;">
                <el-option label="刷新间隔15秒" value></el-option>
                <el-option label="刷新间隔30秒" value="1"></el-option>
                <el-option label="刷新间隔1分钟" value="1"></el-option>
            </el-select>
            <div class="flex1"></div>
            <el-button type="" size="mini">存款历史</el-button>
            <el-button type="warning" size="mini">刷新列表</el-button>
        </div>

        <el-table :data="list" border stripe size="mini">
            <el-table-column label="编号/时间"></el-table-column>
            <el-table-column label="会员账号"></el-table-column>
            <el-table-column label="姓名"></el-table-column>
            <el-table-column label="入款人/单号"></el-table-column>
            <el-table-column label="金额"></el-table-column>
            <el-table-column label="实际到账/代理退水"></el-table-column>
            <el-table-column label="分成"></el-table-column>
            <el-table-column label="支付方式/时间"></el-table-column>
            <el-table-column label="收款银行信息"></el-table-column>
            <el-table-column label="次数"></el-table-column>
            <el-table-column label="操作" width="200px" align="center">
                <template>
                    <el-button type="" size="mini">通过</el-button>
                    <el-button type="warning" size="mini">不通过</el-button>
                </template>
            </el-table-column>
            
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            刷新时间:""
        }
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    margin: 0px 0px 10px;
    .r15 {
        margin-right: 15px;
    }
    >*{
        margin-bottom: 10px;
    }
    span{
        font-size: 14px;
    }
    .flex1{
        flex: 1;
    }
}
</style>