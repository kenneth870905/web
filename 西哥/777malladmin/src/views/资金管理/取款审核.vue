<template>
    <div>
        <div class="header-1">
            <el-select class="r15" v-model="刷新" placeholder="类型" size="mini" style="width: 120px;">
                <el-option label="刷新间隔30秒" value></el-option>
                <el-option label="刷新间隔15秒" value="1"></el-option>
                <el-option label="刷新间隔1分" value="2"></el-option>
            </el-select>
            <el-button-group class="r15">
                <el-button type="primary" size="mini">正在审核</el-button>
                <el-button type size="mini">自动出款</el-button>
                <el-button type size="mini">已导出</el-button>
            </el-button-group>
            <el-input placeholder="金额小于等于" size="mini" v-model="金额" style="width: 200px;">
                <template slot="append">导出</template>
            </el-input>
            <div class="flex1"></div>
            <div class="r15">
                当前：
                <span class="color-red">0</span>元|当天
                <span class="color-red">0</span>笔
                <span class="color-red">0</span>元
            </div>
            <el-button type="primary" size="mini">刷新信息</el-button>
            <el-button type="primary" size="mini">取款历史</el-button>
            <el-button type size="mini">刷新列表</el-button>
        </div>

        <el-table :data="list" border size="mini">
            <el-table-column type="selection" width="40" align="center"></el-table-column>
            <el-table-column label="编号/时间">
                <template>
                    222222222222222
                    <br>
                    2021-02-28 10:00
                </template>
            </el-table-column>
            <el-table-column label="会员账号"></el-table-column>
            <el-table-column label="真实姓名"></el-table-column>
            <el-table-column label="分层"></el-table-column>
            <el-table-column label="开户行/账号"></el-table-column>
            <el-table-column label="金额"></el-table-column>
            <el-table-column label="总次数"></el-table-column>
            <el-table-column label="当日次数"></el-table-column>
            <el-table-column label="正在审核"></el-table-column>
            <el-table-column label="审核">
                <el-button type="" size="mini">审核</el-button>
            </el-table-column>
            <el-table-column label="审核" width="300px">
                <el-input placeholder="" size="mini" style="width: 200px;">
                    <template slot="append">提交</template>
                </el-input>
            </el-table-column>
        </el-table>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            刷新: "",
            金额: "",
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
    .flex1 {
        flex: 1;
    }
    .color-red {
        color: red;
    }
}
</style>