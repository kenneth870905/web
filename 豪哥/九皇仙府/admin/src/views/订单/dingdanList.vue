<template>
    <div class="header-1">
        <el-select v-model="query.status" size="small" placeholder="请选择" class="r10" @change="changeType" style="width: 150px;">
            <el-option label="全部订单" value=""></el-option>
            <el-option label="预定" :value="1"></el-option>
            <el-option label="已付定金" :value="2"></el-option>
            <el-option label="已售出" :value="3"></el-option>
            <el-option label="批量出售" :value="5"></el-option>
            <el-option label="本村" :value="6"></el-option>
            <el-option label="已安装" :value="7"></el-option>
            <el-option label="预定已取消" :value="4"></el-option>
        </el-select>
        <el-select v-model="query.park_id" size="small" placeholder="请选择" class="r10" @change="changePark" style="width: 150px;">
            <el-option label="全部园区" value=""></el-option>
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in ParkList" :key="index"></el-option>
        </el-select>
        <el-select v-show="query.park_id" v-model="query.unit_id" size="small" placeholder="请选择" class="r10" @change="changeUnit" style="width: 150px;">
            <el-option label="全部单元" value=""></el-option>
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in unitList" :key="index"></el-option>
        </el-select>
        <el-input v-model="query.user_name" size="small" style="width: 150px;" placeholder="请输入销售员名称"></el-input>
        <el-button type="" size="small" style="margin-left: 10px;" @click="查询()">查询</el-button>
        <div class="tishi">（全部订单不包含已取消,如需查询已取消）</div>
        <div class="flex1"></div>
        <el-button size="small" @click="openDialog()" type="warning">添加订单</el-button>
        <el-button size="small" @click="getOrderList()">刷新</el-button>
    </div>

    <el-table :data="orderList" border size="mini">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="园区名称" prop="park_name"></el-table-column>
        <el-table-column label="单元名称" prop="unit_name"></el-table-column>
        <el-table-column label="显示行名" prop="row_name"></el-table-column>
        <el-table-column label="列号" prop="column"></el-table-column>
        <el-table-column label="销售员" prop="user_name"></el-table-column>
        <el-table-column label="状态">
            <template #default="scope">
                <span v-if="scope.row.status==1">预定</span>
                <span v-else-if="scope.row.status==2">已付定金</span>
                <span v-else-if="scope.row.status==3">已出售</span>
                <span v-else-if="scope.row.status==4">已取消</span>
                <span v-else-if="scope.row.status==5">批量出售</span>
                <span v-else-if="scope.row.status==5">批量出售</span>
                <span v-else-if="scope.row.status==6">本村</span>
                <span v-else-if="scope.row.status==7">已安装</span>
            </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updatedAt"></el-table-column>
        <!-- <el-table-column label="备注"></el-table-column> -->
        <el-table-column label="操作" align="center" width="200px">
            <template #default="scope">
                <el-button type size="mini" v-if="scope.row.status!=4" @click="openStatusDialog(scope.row)">修改</el-button>
                <el-button type="warning" size="mini" @click="deleteOrder(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="page" :total="total"  v-model="query.page" :page-size="query.size" @current-change="changePage" layout="prev, pager, next" background></el-pagination>


    <el-dialog title="添加订单" v-model="showDialog" width="450px" custom-class="添加订单">
        <el-form size="mini" class="form-1">
            <el-form-item label="园区">
                <el-select v-model="order.park_id" placeholder="请选择园区" @change="选择园区" style="width: 100%;">
                    <el-option v-for="item in ParkList" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单元">
                <el-select v-model="order.unit_id" placeholder="请选择园区"   style="width: 100%;" @change="选择单元">
                    <el-option v-for="item in danyuanList" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择位置" v-if="rows.length>0">
                <ul class="list-1">
                    <li v-for="item in rows">
                        <div class="name-1">{{item.name}}</div>
                        <div class="number" 
                            :class="['status_'+item2.status,(order.row==item2.row && order.column==item2.column) ? 'active': '']"  
                            v-show="item2.column%10!=4 || (item2.column%10==4 && 选中园区.show_four)" v-for="item2 in item.children" @click="选择位置(item2)">
                            {{item2.column}}
                        </div>
                    </li>
                </ul>
            </el-form-item>
            <!-- <el-form-item label="状态">
                <el-select v-model="order.status" style="width: 100%;" >
                    <el-option label="预定" :value="1"></el-option>
                    <el-option label="已交定金" :value="2"></el-option>
                    <el-option label="已出售" :value="3"></el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="提交订单()">确 定</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog title="修改订单状态" v-model="statusDialog" width="450px" custom-class="状态弹框">
        <el-form size="mini" class="form-1" label-width="90px"> 
            <el-form-item label="请选择状态">
                <el-select v-model="oldOrder.status" style="width: 100%;">
                    <el-option label="已预定" :value="1"></el-option>
                    <el-option label="已付定金" :value="2"></el-option>
                    <el-option label="已出售" :value="3"></el-option>
                    <el-option label="已批量售出" :value="5"></el-option>
                    <el-option label="本村" :value="6"></el-option>
                    <el-option label="已安装" :value="7"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售员">
                <el-select v-model="oldOrder.user_id" placeholder="" style="width: 100%;">
                  <el-option v-for="(item,index) in userList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="statusDialog = false">取 消</el-button>
                <el-button type="primary" @click="修改状态()">确 定</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script>
import { reactive, ref , getCurrentInstance} from 'vue'
export default {
    name: "",
    setup(props) {

        const {proxy }=getCurrentInstance()
        

        let orderList = reactive([])
        let total = ref(0)
        let query = reactive({
            status:"",
            park_id:"", //园区
            unit_id:"", //单元
            user_name:"",
            page:1,
            size:10
        })
        //园区
        let ParkList=reactive([])
        let unitList=reactive([])
        //添加用
        let order=reactive({
            "grave_id": 1,
            "park_id": '',
            "park_name": "",
            "unit_id": '',
            "unit_name": "",
            "row": 0,
            "row_name": "",
            "column": 0,
            price: 0,
            // status:1,   //1表示下单 2表示已交定金 3表示订单完成售出
        })
        //修改状态时使用
        let newStatus = ref(1)
        let oldOrder= reactive({})
        let danyuanList = reactive([])
        
        let rows = reactive([])
        let 选中园区 = reactive({})

        let showDialog = ref(false)
        let statusDialog=ref(false)
        let userList = reactive([])
        

        let getOrderList = ()=>{
            axios.get('/order',{params:query}).then(res => {
                console.log('订单列表',res)
                let list = res.data
                let a = [0]
                for (let index = 1; index <= 100; index++) {
                    if(index%10!=4)
                    a.push(index)            
                }
                list.map(y=>{
                    let addindex=0
                    // if(y.row>=4){
                    //     addindex = 1 * Math.ceil(y.row/12)
                    // }
                    y.newRow = a[y.row]
                    //  y.row + addindex
                    // console.log(y.row)
                })
                orderList.length=0
                orderList.push(...res.data)
                total.value=res.total
            }).catch(err => {
                console.error(err); 
            })
        }
        let changePage=(i)=>{
            console.log(i)
            query.page=i
            getOrderList()
        }
        
        //查询园区
        let getParkList = ()=>{
            axios.get('/park',{params:{page:1, size:1000}}).then(res => {
                console.log('查询园区',res)
                ParkList.length=0
                ParkList.push(...res.data)
            })
        }
        let openDialog=()=>{
            order.park_id=''
            order.park_name=""
            order.unit_id= ''
            order.unit_name=""
            order.row= 0
            order.row_name= ""
            order.column= 0
            order.price=0
            showDialog.value=true
            rows.length=0
        }
        let 选择园区 = (id)=>{
            Object.assign(选中园区,ParkList.find(x=>x.id ==id))
            order.park_name=ParkList.find(x=>x.id==id).name
            axios.get('/unit',{params:{park_id:order.park_id,page:1,size:1000}})
            .then(res => {
                console.log('单元',res)
                danyuanList.length=0
                danyuanList.push(...res.data)
            })
            .catch(err => {
                console.error(err); 
            })
        }
        let 选择单元=(id)=>{
            order.unit_name = danyuanList.find(x=>x.id==id).name

            Promise.all([
                axios.get(`/unit/${order.unit_id}`),
                axios.get('/order',{params:{unit_id:id,page:1,size:5000}})
            ]).then(([r1,r2])=>{
                console.log(r1,r2)
                rows.length=0
                r1.data.Rows.map(value=>{
                    let row={}
                        row.name = value.name
                        row.children = []
                    for (let i = 1; i <= value.count; i++) {
                        let status =  ''
                        let obj = r2.data.find(x=>x.row==value.row && x.column==i)
                        if(obj){
                            status = obj.status
                        }
                        row.children.push({row:value.row,column:i,status:status})
                    }
                    rows.push(row)
                })

            })
        }
        let 选择位置=(item)=>{
            console.log(item)
            if(item.status==''){
                order.row=item.row
                order.column = item.column
            }
        }

        let 提交订单=()=>{
            if(!order.park_id){
                proxy.$message({message:"请选择园区",type:"error"})
                return
            }else if(!order.unit_id){
                proxy.$message({message:"请选择单元",type:"error"})
                return
            }else if(!order.row){
                proxy.$message({message:"请选择位置",type:"error"})
                return
            }
            axios.post('/order',order)
            .then(res => {
                console.log('添加订单',res)
                if(res.code==0){
                    proxy.$message({message:"添加成功",type:"success"})
                    getOrderList()
                    showDialog.value=false
                }else{
                    proxy.$message({message:"添加失败，请联系管理员",type:"error"})
                }
            })
            .catch(err => {
                console.error(err); 
                proxy.$message({message:"连接错误，请联系管理员",type:"error"})
            })
        }
        let setClass=(item,column)=>{
            let className = ''
            if(order.row==item.row && order.column==column){
                className = 'active '
            }
            return className
        }

        let openStatusDialog=async (item)=>{
            if(userList.length==0)
                await getUser()
            Object.assign(oldOrder,item)
            newStatus.value = item.status
            statusDialog.value=true
        }
        let getUser =()=>{
            let q = {
                page: 1,
                size: 1000
            }
            return new Promise((resolve, reject) => {
                axios.get('/user', { params: q }).then(res => {
                    if (res.code == 0) {
                        userList.length = 0
                        userList.push(...res.data)
                        resolve()
                    }
                })
            });
        }
        let 修改状态 = async ()=>{
            let order = orderList.find(x=>x.id==oldOrder.id)
            if(order.status ==oldOrder.status && order.user_id==oldOrder.user_id){
                return
            }
            oldOrder.user_name = userList.find(x=>x.id==oldOrder.user_id).name
            let r = await proxy.$confirm('确定修改状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);
            if(!r) return
            oldOrder.status=newStatus.value
            // oldOrder.user_id=5
            // oldOrder.user_name="test"
            delete oldOrder.createdAt
            delete oldOrder.deletedAt
            delete oldOrder.updatedAt
            axios.put(`/order/${oldOrder.id}`,oldOrder)
            .then(res => {
                console.log(res)
                if(res.code==0){
                    proxy.$message({message:"修改成功",type:"success"})
                    statusDialog.value=false
                    getOrderList()
                }else{
                    proxy.$message({message:"修改失败，请联系管理员",type:"error"})
                }
            })
            .catch(err => {
                console.error(err); 
                proxy.$message({message:"连接错误，请联系管理员",type:"error"})
            })
        }

        let deleteOrder =async (item)=>{
            let r = await proxy.$confirm('确定删除订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);
            if(!r) return
            axios.delete(`/order/${item.id}`)
            .then(res => {
                console.log(res)
                if(res.code==0){
                    proxy.$message({message:"删除成功",type:"success"})
                    getOrderList()
                }else{
                    proxy.$message({message:"删除失败，请联系管理员",type:"error"})
                }
            })
            .catch(err => {
                console.error(err); 
                proxy.$message({message:"连接错误，请联系管理员",type:"error"})
            })
        }

        let changeType=()=>{
            query.page=1
            getOrderList()
        }
        //搜索选择园区
        let changePark=()=>{
            query.page=1
            query.unit_id = ''
            getOrderList()
            axios.get('/unit',{params:{park_id:query.park_id,page:1,size:10000}})
            .then(res => {
                console.log('单元',res)
                unitList.length=0
                unitList.push(...res.data)
            })
            .catch(err => {
                console.error(err); 
            })
        }
        let changeUnit=()=>{
            query.page=1
            getOrderList()
        }
        let 查询 =()=>{
            query.page=1
            getOrderList()
        }



        getParkList()

        getOrderList()


        return {
            orderList,
            total,
            query,
            showDialog,
            order,
            ParkList,
            unitList,
            danyuanList,
            rows,
            statusDialog,
            newStatus,
            oldOrder,
            选中园区,
            userList,
            changeType,
            changePark,
            changeUnit,
            查询,

            getOrderList,
            openDialog,
            setClass,
            选择园区,
            选择单元,
            选择位置,
            提交订单,
            openStatusDialog,
            修改状态,
            deleteOrder,
            changePage
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
    .tishi{
        font-size: 12px;
        color: red;
    }
    .r10{
        margin: 0px 10px 0px 0px;
    }
}

.page{
    text-align: right;
    margin: 10px 0px;
}

.添加订单{
    .el-form-item {
        display: block;
    }
    .form-1{
        margin: -25px 0px;
    }
}

.list-1{
    overflow: auto;
    li{
        display: flex;
        align-items: center;
        font-size: 12px;
        text-align: center;
        line-height: initial;
        .name-1{
            flex-shrink: 0;
            width: 60px;
            border: 1px solid #eee;
            padding: 3px;
        }
        .number{
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            line-height: 20px;
            margin: 0px 2px;
            // color: #fff;
            cursor: pointer;
            background: #e5e6e0;
            &.active{
                color: red;
                background: none;
                border: 1px solid red;
            }
            &.status_1{
                background: #87e3a8;
            }
            &.status_2{
                background: #80bfeb;
            }
            &.status_3{
                background: #d99493;
            }
            &.status_5{
                background: #f3de8d;
            }
            &.status_6{
                background: #683535;
            }
            &.status_7{
                background: #d115f3;
            }
        }
    }
}


</style>