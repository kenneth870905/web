<template>
    <el-form class="form">
        <el-form-item label="选择园区">
            <el-select v-model="form.yuanqu" class="input-1" placeholder="请选择">
                <el-option v-for="item in yuanquList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="单元名">
            <el-input v-model="form.name" placeholder="" class="input-1"> </el-input>
        </el-form-item>
        <el-form-item label="价格">
            <el-input v-model="form.jiage" placeholder="" class="input-1"></el-input>
        </el-form-item>
        <el-form-item label="">
            <div slot="label">
                行/列
                <el-button type="" size="mini">添加行</el-button>
            </div>
            <ul class="list-1">
                <li>
                   <div class="btn-box">
                       数量
                    </div> 
                    <div class="inpt-box">
                        名称
                    </div>
                </li>
                <li v-for="(item,index) in form.list1" :key="index">
                    <div class="btn-box">
                        <!-- <el-button type="" size="mini">添加列</el-button> -->
                        <el-input v-model.number="item.number" type="number" placeholder="" size="mini"></el-input>
                    </div>
                    <div class="inpt-box">
                        <el-input v-model="item.name" placeholder="" size="mini"></el-input>
                    </div>
                    <div class="list-2">
                        <!-- <div class="fangxing" v-for="(item2,index2) in item.children" :key="index2"></div> -->
                        <div class="fangxing" v-for="(item2,index2) in item.number" :key="index2"></div>
                    </div>
                </li>
            </ul>
        </el-form-item>
        <el-form-item label="">
            <el-button type="">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {

    setup(props) {


        let yuanquList = [{
            value: '选项1',
            label: '黄金糕'
        }, {
            value: '选项2',
            label: '双皮奶'
        }, {
            value: '选项3',
            label: '蚵仔煎'
        }, {
            value: '选项4',
            label: '龙须面'
        }, {
            value: '选项5',
            label: '北京烤鸭'
        }]
        let list1 = [
            {
                name:"第一行",
                number:1,
                children:[{name:"1"},{name:"2"}]
            },
            {
                name:"第二行",
                number:30,
                children:[{name:"1-1"},{name:"2-1"},{name:"2-2"},{name:"1-1"},{name:"2-1"},{name:"2-2"},{name:"1-1"},{name:"2-1"},{name:"2-2"},{name:"1-1"},{name:"2-1"},{name:"2-2"},{name:"1-1"},{name:"2-1"},{name:"2-2"},{name:"1-1"},{name:"2-1"},{name:"2-2"},{name:"1-1"},{name:"2-1"},{name:"2-2"}]
            }
        ]
        let form = reactive({

            list1:list1
        })

        
        return {
            yuanquList,
            form,
            list1
        }
    }
}
</script>

<style lang="scss" scoped>
.form{
    /deep/ .el-form-item{
        display: block;
    }
    .input-1{
        width: 300px;
    }
}

.list-1{
    overflow: auto;
    >li{
        display: flex;
        .inpt-box{
            width: 80px;
            padding: 5px;
            border: 1px solid #eee;
            flex-shrink: 0;
            /deep/ input{
                padding: 0px;
                text-align: center;
            }
        }
        .btn-box{
            flex-shrink: 0;
            width: 100px;
            padding: 5px;
            border: 1px solid #eee;
        }
    }
    .list-2{
        flex: 1;
        display: flex;
        align-items: center;
        .fangxing{
            width: 10px;
            height: 10px;
            margin: 0px 2px;
            background: rgba($color: #000000, $alpha: 0.5);
        }
    }
}

</style>