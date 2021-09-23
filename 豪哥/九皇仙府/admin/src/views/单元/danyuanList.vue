<template>
    <div class="header-1">
        <el-select size="small" v-model="query.park_id" placeholder="请选择" class="r10" @change="changYuanQU()">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in yuanquList" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="flex1"></div>
        <el-button size="small" @click="$router.push('/danyuan')" type="warning">添加园区</el-button>
        <el-button size="small" @click="getDanyuan()" >刷新</el-button>
    </div>

    <el-table :data="list" border size="mini">
        <el-table-column label="单元名" prop="name"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <!-- <el-table-column label="行"></el-table-column>
        <el-table-column label="列"></el-table-column> -->
        <el-table-column label="状态">
            <template #default="scope">
                可用
            </template>
        </el-table-column>
        <el-table-column label="销售状态">
            <template #default="scope">
                <el-button type="text" size="mini" @click="查看销售(scope.row)">查看销售状态</el-button>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="description"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
        <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
            <template #default="scope">
                <el-button size="mini" @click="$router.push('/danyuan?id='+scope.row.id)">修改</el-button>
                <el-button type="warning" size="mini" @click="deleteDanYuan(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="page" :total="total"  v-model="query.page" :page-size="query.size" @current-change="changePage" layout="prev, pager, next" background></el-pagination>


    <el-dialog :title="`${selectObj.name}  销售详情`" v-model="orderDialog" width="500px" custom-class="orderDialog">
        <div class="订单详情">
            <div class="title-1">
                <div>
                    <div class="status1"></div>已预定
                </div>
                <div>
                    <div class="status2"></div>已付定金
                </div>
                <div>
                    <div class="status3"></div>已卖出
                </div>
                <div>
                    <div class="status5"></div>批量出售
                </div>
                
            </div>
            <ul class="orderList">
                <li v-for="(item,index) in rows">
                    <div class="name-1">{{item.name}}</div>
                    <template v-for="(item2,index2) in item.children">
                        <div class="item" v-if="item2.column%10!=4" :class="'status'+item2.status" >{{item2.column}}</div>
                    </template>
                </li>
            </ul>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="orderDialog=false">知道了</el-button>
            </span>
        </template>
    </el-dialog>
    
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
        let orderDialog = ref(false)

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

        let rows= reactive([])
        let selectObj=reactive({})
        let 查看销售 =(danyuan)=>{
            Object.assign(selectObj,danyuan)
            rows.length=0
            Promise.all([
                axios.get(`/unit/${danyuan.id}`),
                axios.get('/order',{params:{page:1,size:1000,unit_id:danyuan.id}})
            ]).then(([r1,r2])=>{
                console.log(r1,r2)
                let rowList = r1.data.Rows
                let orderList = r2.data
                let list = []
                rowList.map(item=>{
                    // console.log(item)
                    let o = {name:item.name,children:[]}
                    for (let i = 1; i <= item.count; i++) {
                        o.children.push({
                            column:i,
                            status:orderList.find(x=>x.column==i && x.row==item.row) ? orderList.find(x=>x.column==i && x.row==item.row).status : 0 
                        })
                    }
                    if(item.is_reverse){
                        o.children.reverse()
                    }
                    rows.push(o)
                })  
                console.log(rowList,orderList)
                orderDialog.value=true
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
            orderDialog,
            rows,
            selectObj,

            getDanyuan,
            changYuanQU,
            deleteDanYuan,
            changePage,
            查看销售

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
.orderDialog{
    .订单详情{
        margin: -15px 0px;
    }
    .title-1{
        display: flex;
        align-items: center;
        margin: 0px 0px 20px;
        >div{
            display: flex;
            align-items: center;
            margin: 0px 10px 0px 0px;
        }
        .status1{
            width: 18px;
            height: 18px;
            background: #87e3a4;
        }
        .status2{
            width: 18px;
            height: 18px;
            background: #7fc0e0;
        }
        .status3{
            width: 18px;
            height: 18px;
            background: #f47073;
        }
        .status5{
            width: 18px;
            height: 18px;
            background: #f3de8d;
        }
        
    }
}
.orderList{
    font-size: 12px;
    overflow: auto;
    li{
        margin: 3px 0px;
        display: flex;
        align-items: center;
    }
    .name-1{
        width: 80px;
        text-align: center;
        padding: 3px;
        background: rgba($color: #000000, $alpha: 0.6);
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex-shrink: 0;
    }
    .item{
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        line-height: 18px;
        margin: 0px 2px;
        text-align: center;
        background: #e4e4e4;
        &.status1{
            background: #87e3a4;
        }
        &.status2{
            background: #7fc0e0;
        }
        &.status3{
            background: #f47073;
        }
        &.status5{
            background:  #f3de8d;
        }
    }
}

</style>