<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="打码量分成" name="a"></el-tab-pane>
            <el-tab-pane label="自定义赔率" name="b"></el-tab-pane>
            <el-tab-pane label="盈亏分成" name="c"></el-tab-pane>
            <el-tab-pane label="存款分成" name="d"></el-tab-pane>
            <el-tab-pane label="取款分成" name="e"></el-tab-pane>
        </el-tabs>
        <div class="header-1">
            <el-input class="r15" size="mini" style="width: 300px;">
                <el-select style="width:100px" v-model="type1" slot="prepend" placeholder="请选择">
                    <el-option label="代理商" value></el-option>
                    <el-option label="会员" value="2"></el-option>
                </el-select>
            </el-input>
            <el-button type="" size="mini">获取明细</el-button>
            <el-button type="warning" size="mini">按【打码量分成功】手动反水</el-button>
        </div>
        <el-table :data="list" border stripe size="mini">
            <el-table-column label="推广编号"></el-table-column>
            <el-table-column label="代理商"></el-table-column>
            <el-table-column label="上级代理"></el-table-column>
            <el-table-column label="域名"></el-table-column>
            <el-table-column label="退水方案">
                <template>
                    默认打码量 <i class="el-icon-edit"></i>
                </template>
            </el-table-column>
            <el-table-column label="本次退水"></el-table-column>
            <el-table-column label="上级退水"></el-table-column>
            <el-table-column label="手动退水">
                <el-button type="text" size="mini">手动退水</el-button>
            </el-table-column>
            <el-table-column label="备注"></el-table-column>
            <el-table-column label="累计退水总额"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="1000"></el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName:"a",
            list: [{ id: 1 }, { id: 2 }, { id: 3 }],
            type1:"",
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