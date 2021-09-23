<template>
    <div class="header-1">
        <el-button size="small" type="warning" @click="$back()">返回上一页</el-button>
        <div class="flex1"></div>
    </div>
    <el-form class="form" size="mini">
        <el-form-item label="选择园区">
            <el-select v-model="danyuan.park_id" class="input-1" placeholder="请选择园区">
                <el-option v-for="(item,index) in yuanquList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单元名">
            <el-input v-model="danyuan.name" placeholder="请输入单元名称" class="input-1"></el-input>
        </el-form-item>
        <el-form-item label="价格">
            <el-input v-model.number="danyuan.price" @blur="changePrice()" type="number" placeholder="价格必须是整数且不小于0" class="input-1"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="danyuan.status" class="input-1" placeholder="状态">
                <el-option label="可用" :value="0"></el-option>
                <!-- <el-option label="不可用" value="1"></el-option> -->
            </el-select>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="danyuan.description" type="textarea" autosize placeholder class="input-1"></el-input>
        </el-form-item>

        <el-form-item>
            <div>
                行/列
                <el-button type size="mini" @click="添加行()">添加行</el-button>
            </div>
            <ul class="list-1">
                <li>
                    <div class="btn-box">操作</div>
                    <div class="btn-box">尾数</div>
                    <div class="inpt-box">名称</div>
                    <div class="inpt-box" style="width: 120px;">排序方式</div>
                </li>
                <li v-for="(item,index) in danyuan.rows" :key="index">
                    <div class="btn-box">
                        <el-button type="warning" @click="danyuan.rows.splice(index,1)">删除行</el-button>
                    </div>
                    <div class="btn-box">
                        <el-input v-model.number="item.count" type="number" placeholder size="mini"></el-input>
                    </div>
                    <div class="inpt-box">
                        <el-input v-model="item.name" placeholder size="mini"></el-input>
                    </div>
                    <div class="inpt-box" style="width: 120px;">
                        <el-select v-model="item.is_reverse" placeholder="排序方式">
                            <el-option label="正向" :value="false"></el-option>
                            <el-option label="反向" :value="true"></el-option>
                        </el-select>
                    </div>
                    <div class="list-2">
                        <template v-if="!item.is_reverse" v-for="(item2,index2) in item.count">
                            <div class="fangxing"  v-if="item2%10!=4" :key="index2">{{item2}}</div>
                        </template>
                        <template v-else v-for="(item2,index2) in item.count">
                            <div class="fangxing"  v-if="(item.count-index2)%10!=4" :key="index2">{{item.count-index2}}</div>
                        </template>
                    </div>
                </li>
            </ul>
        </el-form-item>
        <el-form-item label>
            <el-button type="warning" size="medium" @click="保存()">保存</el-button>
            <el-button type="" size="medium" @click="$back()">返回上一页</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { reactive, ref, getCurrentInstance, watch } from 'vue'
import { useRoute } from "vue-router";
export default {

    setup(props) {
        const { proxy } = getCurrentInstance()
        const route = useRoute()


        let yuanquList = reactive([])
        let danyuan = reactive({
            // id:"",
            park_id: "",
            name: "",
            price: 0,
            status: 0,
            description: "",
            rows: [
                { 
                    row: 0, name: "行名", count: 10 ,is_reverse:false
                }
            ]
        })

        let getYuanQu = () => {
            axios.get('/park', { params: { page: 1, size: 100 } })
                .then(res => {
                    console.log(res)
                    yuanquList.push(...res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
        let changePrice = () => {
            console.log(danyuan.price)
            if (!danyuan.price || danyuan.price < 0) {
                danyuan.price = 0
            } else {
                danyuan.price = parseInt(danyuan.price)
            }
        }
        let 添加行 = () => {
            danyuan.rows.push({ row: 0, name: "行名", count: 10,is_reverse:false })
        }

        let 保存 = () => {
            if (!danyuan.park_id) {
                proxy.$message({ message: "请选择园区", type: "error" })
            } else if (!danyuan.name) {
                proxy.$message({ message: "请输入单元名称", type: "error" })
            } else if (danyuan.price < 0 || danyuan.price % 1 != 0) {
                proxy.$message({ message: "价格必须是整数且不小于0", type: "error" })
            } else {
                danyuan.rows.map((value, index) => {
                    value.row = index + 1
                })
                if(!danyuan.id){
                    axios.post('/unit', danyuan).then(res => {
                        console.log(res)
                        if (res.code == 0) {
                            proxy.$message({ message: "添加成功", type: "success" })
                            history.back()
                        } else {
                            proxy.$message({ message: "添加失败，请联系管理员", type: "success" })
                        }
                    }).catch(err => {
                        console.error(err);
                        proxy.$message({ message: "连接错误，请联系管理员", type: "error" })
                    })
                }else{
                    danyuan.rows.map((value)=>{
                        delete value.createdAt
                        delete value.deletedAt
                        delete value.updatedAt
                    })
                    danyuan.Rows = danyuan.rows
                    axios.put(`unit/${danyuan.id}`, danyuan).then(res => {
                        console.log(res)
                        if (res.code == 0) {
                            proxy.$message({ message: "更新成功", type: "success" })
                            history.back()
                        } else {
                            proxy.$message({ message: "更新失败，请联系管理员", type: "success" })
                        }
                    }).catch(err => {
                        console.error(err);
                        proxy.$message({ message: "连接错误，请联系管理员", type: "error" })
                    })
                }
            }
        }
        let getDanyuan = () => {
            axios.get(`/unit/${danyuan.id}`).then(res => {
                console.log('查询单个单元', res)
                danyuan.id = res.data.id
                for (const key in danyuan) {
                    danyuan[key] = res.data[key]
                }
                danyuan.rows = res.data.Rows
            }).catch(err => {
                console.error(err);
            })
        }

        if (route.query.id) {
            danyuan.id = route.query.id
            getDanyuan()
        }

        console.log(route.query)

        getYuanQu()

        return {
            yuanquList,
            danyuan,
            changePrice,
            添加行,
            保存
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

.form {
    /deep/ .el-form-item {
        display: block;
    }
    .input-1 {
        width: 300px;
    }
}

.list-1 {
    margin: 5px 0px 0px;
    overflow: auto;
    > li {
        display: flex;
        .inpt-box {
            width: 80px;
            padding: 5px;
            border: 1px solid #eee;
            flex-shrink: 0;
            /deep/ input {
                padding: 0px;
                text-align: center;
            }
        }
        .btn-box {
            flex-shrink: 0;
            width: 100px;
            padding: 5px;
            border: 1px solid #eee;
        }
    }
    .list-2 {
        flex: 1;
        display: flex;
        align-items: center;
        .fangxing {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #fff;
            font-size: 12px;
            margin: 0px 2px;
            background: rgba($color: #000000, $alpha: 0.5);
        }
    }
}
</style>