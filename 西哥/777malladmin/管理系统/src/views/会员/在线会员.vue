<template>
    <div>
        <div class="测试">颜色测试</div>
        <div>颜色测试</div>

        <el-color-picker @change="change2"></el-color-picker>


        <div class="header-1">
            <el-button-group>
                <el-button type="primary" size="mini">所有类型</el-button>
                <el-button type="default" size="mini">PC会员</el-button>
                <el-button type="default" size="mini">APP会员</el-button>
                <el-button type="default" size="mini">MWEB会员</el-button>
            </el-button-group>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">普通</el-checkbox>
                <el-checkbox label="2">试玩</el-checkbox>
                <el-checkbox label="3">同IP会员</el-checkbox>
            </el-checkbox-group>
            <el-input style="width: 200px;" size="mini" v-model="name" placeholder="会员名"></el-input>
            <el-button type size="mini">提交</el-button>
        </div>

        <el-table :data="list" border size="mini" @sort-change="change1">
            <el-table-column  label="类型"></el-table-column>
            <el-table-column sortable="custom" label="账号" prop="id"></el-table-column>
            <el-table-column sortable="custom" label="名字" prop="自定义"></el-table-column>
            <el-table-column label="余额"></el-table-column>
            <el-table-column label="在线时长"></el-table-column>
            <el-table-column label="本次时间/IP">
                <template>
                    <div>2021-02-28 00:00</div>
                    <div><span class="红色">192.168.0.0</span>&nbsp;<span class="蓝色 pointer">查询</span></div>
                </template>
            </el-table-column>
            <el-table-column label="上次IP">
                <template>
                    <div>2021-02-28 00:00</div>
                    <div><span class="红色">192.168.0.0</span>&nbsp;<span class="蓝色 pointer">查询</span></div>
                </template>
            </el-table-column>
            <el-table-column label="登录域名"></el-table-column>
            <el-table-column label="所在页面"></el-table-column>
        </el-table>

        <el-pagination class="分页" background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkList: [],
            name:'',
            list: [{id:1},{id:2},{id:3}]
        }
    },
    methods:{
        change1(value){
            console.log(value)
        },
        change2(value){
            document.body.style.setProperty('--color',value);
        }
    }
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
    > * {
        margin: 0px 20px 0px 0px;
    }
}
.红色{
    color: red;
}
.蓝色{
    color: #0000ee;
}
.pointer{
    cursor: pointer;
}

.测试{
    color: var(--color);
}

</style>