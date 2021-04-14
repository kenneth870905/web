<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="a"></el-tab-pane>
            <el-tab-pane label="非登录" name="b"></el-tab-pane>
            <el-tab-pane label="自定义" name="c"></el-tab-pane>
        </el-tabs>
        <div class="header-1">
            <el-button type="" size="mini">添加公告</el-button>
        </div>
        <el-table :data="list" stripe border size="mini" @sort-change="change1">
            <el-table-column label="公告标题"></el-table-column>
            <el-table-column label="周期"></el-table-column>
            <el-table-column label="状态"></el-table-column>
            <el-table-column label="平台"></el-table-column>
            <el-table-column label="分类"></el-table-column>
            <el-table-column label="排序"></el-table-column>
            <el-table-column label="创建人"></el-table-column>
            <el-table-column label="创建时间"></el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="" size="mini">修改</el-button>
                    <el-button type="" size="mini">启用</el-button>
                    <el-button type="" size="mini">停用</el-button>
                    <el-button type="" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName:"a",
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
    font-size: 14px;
    .r15 {
        margin-right: 15px;
    }
    .flex1{
        flex: 1;
    }
}
</style>