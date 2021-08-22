<template>
    <div class="header-1">
        <el-select size="small" v-model="query.park_id" placeholder="请选择" class="r10" @change="changYuanQU()">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in yuanquList" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="flex1"></div>
        <el-button size="small" @click="$router.push('/danyuan')">添加园区</el-button>
    </div>

    <el-table :data="list" border size="mini">
        <el-table-column label="单元名" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="行"></el-table-column>
        <el-table-column label="列"></el-table-column>
        <el-table-column label="状态">
            <template #default="scope">
                可用
            </template>
        </el-table-column>
        <el-table-column label="剩余数量"></el-table-column>
        <el-table-column label="备注" prop="description"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
        <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
            <template #default="scope">
                <el-button type size="mini" @click="$router.push('/danyuan?id='+scope.row.id)">修改</el-button>
                <el-button type="warning" size="mini" @click="deleteDanYuan(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="page" :total="total"  v-model="query.page" :page-size="query.size" @current-change="changePage" layout="prev, pager, next" background></el-pagination>

    
</template>

<script>
import { reactive, ref , getCurrentInstance} from 'vue'
export default {
    name: "",
    setup(props) {
        let {proxy} = getCurrentInstance()

        let yuanquList = reactive([]) 
        let query=reactive({
            park_id:"", page:1, size:10
        })
        let total=ref(0)
        let list = reactive([])
        

        let getYuanQu=()=>{
            axios.get('/park',{params:{page:1,size:100}})
            .then(res => {
                console.log(res)
                yuanquList.push(...res.data)
            }).catch(err => {
                console.error(err); 
            })
        }
        let getDanyuan=()=>{
            axios.get('/unit',{params:query})
            .then(res => {
                console.log('查询单元',res)
                list.length=0
                list.push(...res.data)
            })
            .catch(err => {
                console.error(err); 
            })
        }
        let changYuanQU=()=>{
            getDanyuan()
        }
        let changePage=(i)=>{
            query.page=i
            getDanyuan()
        }
        let deleteDanYuan=async (item)=>{
            let r = await proxy.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);
            if(!r) return
            axios.delete(`/unit/${item.id}`)
            .then(res => {
                if(res.code==0){
                    proxy.$message({message:"删除成功",type:"success"})
                    getDanyuan()
                }else{
                    proxy.$message({message:"删除失败",type:"error"})
                }
            })
            .catch(err => {
                console.error(err); 
                proxy.$message({message:'连接异常，请稍后再试'})
            })
        }




        getYuanQu()
        getDanyuan()

        console.log(proxy)

        return {
            yuanquList,
            query,
            total,
            list,

            changYuanQU,
            deleteDanYuan,
            changePage,
            

        }
    }
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
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