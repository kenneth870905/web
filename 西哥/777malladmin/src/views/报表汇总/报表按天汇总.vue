<template>
    <div>
        <div class="header-1">
            <el-button-group class="r15">
                <el-button type="primary" size="mini">统计代理</el-button>
                <el-button type="" size="mini">统计会员</el-button>
            </el-button-group>
            <el-date-picker class="r15" v-model="time" type="date" placeholder="选择日期" size="mini"></el-date-picker>
            <el-input style="width: 150px;" class="r15" size="mini" v-model="代理" placeholder="代理账号"></el-input>
            <el-input class="r15" placeholder="会员账号" v-model="会员账号" size="mini" style="width: 250px;">
                <el-select style="width:100px" v-model="会员类型" slot="prepend">
                    <el-option label="普通会员" value></el-option>
                    <el-option label="高级会员" value="2"></el-option>
                </el-select>
            </el-input>
            <el-select class="r15" v-model="彩种" size="mini" style="width: 100px;">
                <el-option label="全部彩种" value></el-option>
                <el-option label="彩票1" value="1"></el-option>
                <el-option label="彩票2" value="2"></el-option>
            </el-select>
            <el-button type size="mini">查询</el-button>
        </div>
        
         <el-table :data="list" border size="mini" >
            <el-table-column label="上级代理"></el-table-column>
            <el-table-column label="代理"></el-table-column>
            <el-table-column label="订单数量"></el-table-column>
            <el-table-column label="投注金额"></el-table-column>
            <el-table-column label="平台输赢"></el-table-column>
        </el-table>

    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            time: moment().format('YYYY-MM-DD'),
            代理: "",
            会员类型: "",
            会员账号: "",
            彩种: "",
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
    span {
        font-size: 14px;
    }
}
</style>