<template>
    <div>
        <div class="header-1">
            <span>操作：</span>
            <el-button size="mini" >添加分成</el-button>
            <el-button size="mini" >银行账号设置</el-button>
            <el-button size="mini" >在线支付设置</el-button>
            <el-button size="mini" >线下转账设置</el-button>
            <el-button size="mini" >绑定支付</el-button>
        </div>

        <el-table :data="list" border size="mini">
            <el-table-column label="分成"></el-table-column>
            <el-table-column label="类别"></el-table-column>
            <el-table-column label="入款次数"></el-table-column>
            <el-table-column label="备注"></el-table-column>
            <el-table-column label="修改时间"></el-table-column>
            <el-table-column label="操作" width="330px" align="center">
                <template>
                    <el-button size="mini" >编辑</el-button>
                    <el-button size="mini" >绑定支付</el-button>
                    <el-button size="mini" >旗下会员</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
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
    padding: 0px 0px 10px;
    margin: 0px 0px 10px;
    .r15 {
        margin-right: 15px;
    }
    span{
        font-size: 14px;
    }
}
</style>