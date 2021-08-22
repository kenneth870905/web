<template>
    <div class="header-1">
        <el-button size="small" @click="openDialog()">添加园区</el-button>
    </div>

    <el-table :data="list" border size="mini">
        <el-table-column label="编号" width="50px" align="center" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="code" prop="code"></el-table-column>
        <el-table-column label="备注" prop="description"></el-table-column>
        <!-- <el-table-column label="创建时间"></el-table-column> -->
        <el-table-column label="操作" align="center" width="150px">
            <template #default="scope">
                <el-button type size="mini" @click="openDialog(scope.row)">修改</el-button>
                <el-button type="warning" size="mini" @click="deleteYuanqu(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- <el-pagination background :total="total" @current-change="changePage" :page-size="query.size" class="fenye" layout="prev, pager, next"></el-pagination> -->


    <el-dialog :title="DialogType==0 ? '添加园区' :'修改园区'" v-model="showDialog" width="450px" custom-class="usertankuang">
        <el-form>
            <el-form-item label="园区名称">
                <el-input v-model="yuanqu.name" placeholder="园区名称"></el-input>
            </el-form-item>
            <el-form-item label="code">
                <el-input v-model="yuanqu.code" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="yuanqu.description" placeholder="备注：如张三"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="queding()">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref ,getCurrentInstance} from 'vue'
export default {
    name: "",
    setup(props) {
        const {proxy} = getCurrentInstance()


        let list = reactive([])
        let query= reactive({
            page:1, size:100
        })
        let total = ref(0)
        let yuanqu = reactive({id:"",name: "", code: "", description: ""})
        let showDialog = ref(false)
        let DialogType = ref(0) //0添加1修改
        
        
        let getList = ()=>{
            axios.get('/park',{params:query}).then(res => {
                console.log('查询园区',res)
                list.length=0
                list.push(...res.data)
                total.value=res.total
            })
        }
        let openDialog=(item)=>{
            if(!item){
                DialogType.value=0
                Object.assign(yuanqu,{id:"",name: "", code: "", description: ""})
                delete yuanqu.id
            }else{
                DialogType.value=1
                Object.assign(yuanqu,{id:"",name: "", code: "", description: ""})
                Object.keys(yuanqu).map((key)=>{
                    yuanqu[key] = item[key]
                })
            }
            showDialog.value=true
        }
        let queding=()=>{
            if(!yuanqu.name){
                proxy.$message({  message: '请输入园区名称', type: 'error'});
            }
            if(DialogType.value==0){
                let form = Object.assign({},yuanqu)
                axios.post('/park',yuanqu).then(res => {
                    console.log(res)
                    if(res.code==0){
                        proxy.$message({  message: '添加成功', type: 'success'});
                    }else{
                        proxy.$message({  message: '添加失败', type: 'error'});
                    }
                    showDialog.value=false
                    getList()
                }).catch(err => {
                    console.error(err); 
                    proxy.$message({  message: '连接异常，请联系管理员', type: 'error'});
                    showDialog.value=false
                })
            }else{
                axios.put(`/park/${yuanqu.id}`,yuanqu).then(res => {
                    console.log(res)
                    if(res.code==0){
                        proxy.$message({  message: '修改成功', type: 'success'});
                    }else{
                        proxy.$message({  message: '修改失败', type: 'error'});
                    }
                    showDialog.value=false
                    getList()
                }).catch(err => {
                    console.error(err); 
                    showDialog.value=false
                    proxy.$message({  message: '连接异常，请联系管理员', type: 'error'});
                })
            }
        }

        let changePage = (i) => {
            query.page = i
            getList()
        }

        let deleteYuanqu=async (item)=>{
            let r = await proxy.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);
            if(!r) return
            axios.delete(`/park/${item.id}`).then(res => {
                console.log(res)
                if(res.code==0){
                    proxy.$message({message:"删除成功",type:"success"})
                    getList()
                }else{
                    proxy.$message({message:"删除失败",type:"success"})
                }
            })
            .catch(err => {
                console.error(err); 
                proxy.$message({message:'连接异常，请稍后再试'})
            })
            
        }



        getList()

        return {
            list,
            total,
            query,
            yuanqu,
            showDialog,
            DialogType,
            openDialog,
            queding,
            changePage,
            deleteYuanqu
        }
    }
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: flex-end;
    margin: 0px 0px 10px;
}
.usertankuang {
    .el-form-item {
        display: block;
    }
}
</style>