<template>
    <div>
        <div class="header-1">
            <el-input class="r15" placeholder v-model="会员账号" size="mini" style="width: 250px;">
                <el-select style="width:80px" v-model="账号类型" slot="prepend">
                    <el-option label="账号" value></el-option>
                    <el-option label="Id" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button type size="mini">查询</el-button>
        </div>

        <el-table :data="list" border size="mini" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="账号" prop="id"></el-table-column>
            <el-table-column label="编号" ></el-table-column>
            <el-table-column label="姓名"></el-table-column>
            <el-table-column label="启动"></el-table-column>
            <el-table-column label="分层"></el-table-column>
            <el-table-column label="上级代理"></el-table-column>
            <el-table-column label="旗下会员">
                <template>
                    <el-button type="" size="mini">点击查询</el-button>
                </template>
            </el-table-column>
            <el-table-column label="注册时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            账号类型: "",
            会员账号: "",
            list: [
                { id: 1, },
                { id: 2, },
                {
                    id: 3,
                    children: [{ id: 31 }, { id: 32 }]
                },
                { id: 4 }
            ]
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
    span {
        font-size: 14px;
    }
}
</style>