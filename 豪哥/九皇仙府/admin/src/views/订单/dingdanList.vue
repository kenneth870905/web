<template>
    <div class="header-1">
        <el-select v-model="value" placeholder="请选择" class="r10">
            <el-option v-for="item in yuanquList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button size="small">查询</el-button>
        <div class="flex1"></div>
        <el-button size="small">添加订单</el-button>
    </div>

    <el-table :data="list" border size="mini">
        <el-table-column label="id"></el-table-column>
        <el-table-column label="园区名称"></el-table-column>
        <el-table-column label="单元名称"></el-table-column>
        <el-table-column label="行号"></el-table-column>
        <el-table-column label="列号"></el-table-column>
        <el-table-column label="销售员"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="创建时间"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
            <template #default="scope">
                <el-button type size="mini">修改</el-button>
                <el-button type="warning" size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="page" :page-count="100"  v-model="pageIndex" :page-size="pageSize" @current-change="changePage" layout="prev, pager, next" background></el-pagination>

    <el-dialog title="园区详情" v-model="userDialog" width="450px" custom-class="usertankuang">
        <el-form>
            <el-form-item label="园区名称">
                <el-input v-model="user.userName" placeholder="园区名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="user.remarks" placeholder="备注：如张三"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="userDialog = false">取 消</el-button>
                <el-button type="primary" @click="userDialog = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    name: "",
    setup(props) {

        let yuanquList = [{
          value: '1',
          label: '全部订单'
        }, {
          value: '2',
          label: '预定'
        }, {
          value: '3',
          label: '已付定金'
        }, {
          value: '4',
          label: '卖出'
        }
        ]


        let list = reactive([1, 2, 3, 4, 5])
        let user = reactive({
            userName: "",
            password: "",
            remark: ""
        })
        let userDialog = ref(false)
        let pageIndex=ref(1)
        let pageSize=ref(10)
        let changePage=(i)=>{
            console.log(i)
        }

        return {
            list,
            user,
            userDialog,
            yuanquList,
            value: ref(''),
            pageIndex,
            pageSize,
            changePage
        }
    }
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: flex-end;
    margin: 0px 0px 10px;
    .flex1{
        flex: 1;
    }
    .r10{
        margin: 0px 10px 0px 0px;
    }
}
.usertankuang {
    .el-form-item {
        display: block;
    }
}
.page{
    text-align: right;
    margin: 10px 0px;
}


</style>