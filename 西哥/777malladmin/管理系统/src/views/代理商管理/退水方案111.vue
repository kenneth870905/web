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
            <span>操作：</span>
            <el-button size="mini">添加方案</el-button>
            <el-button size="mini">退水配置</el-button>
            <el-button size="mini" type="warning">退水明细</el-button>
        </div>
        <div class="header-1">
            <span>默认打码量（所有彩种）</span>
            <el-button size="mini">添加明细</el-button>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini">默认</el-button>
        </div>

        <el-table :data="list" border stripe size="mini">
            <el-table-column label="范围" fixed=""></el-table-column>
            <el-table-column label="操作" fixed="" width="150px" align="center">
                <template>
                    <el-button size="mini">编辑</el-button>
                    <el-button type="warning" size="mini">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column label="第一层返利"></el-table-column>
            <el-table-column label="第二层返利"></el-table-column>
            <el-table-column label="显示返利"></el-table-column>
            <el-table-column label="系统彩票"></el-table-column>
            <el-table-column label="系统体育"></el-table-column>
            <el-table-column label="AG"></el-table-column>
            <el-table-column label="VR"></el-table-column>
            <el-table-column label="BBIN(BY)"></el-table-column>
            <el-table-column label="OG(东方)"></el-table-column>
            <el-table-column label="TGP(申博)"></el-table-column>
            <el-table-column label="AB(欧博)"></el-table-column>
            <el-table-column label="EB(易博)"></el-table-column>
            <el-table-column label="BG"></el-table-column>
            <el-table-column label="CQ9"></el-table-column>
            <el-table-column label="FG"></el-table-column>
            <el-table-column label="MG电子"></el-table-column>
            <el-table-column label="SW"></el-table-column>
            <el-table-column label="FY"></el-table-column>
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