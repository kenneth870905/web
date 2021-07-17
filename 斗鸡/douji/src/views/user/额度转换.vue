<template>
    <div class="title-1">
        <el-button type="warning" size="small">一键回收</el-button>
    </div>
    <el-table :data="list" border size="small">
        <el-table-column prop="name" label="游戏名称"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column label="操作" width="250px" align="center">
            <el-button type="" size="mini">转入</el-button>
            <el-button type="" size="mini">转出</el-button>
            <el-button type="" size="mini">刷新</el-button>
        </el-table-column>
    </el-table>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    
    setup(props) {
        let list = reactive([
            {name:'SV388',amount:'0.00'},
            {name:'Digmaan',amount:'0.00'},
        ])

        return{
            list
        }
    }
}
</script>

<style lang="scss" scoped>
.title-1{
    text-align: right;
    margin: 0px 0px 10px 0px;
}
</style>