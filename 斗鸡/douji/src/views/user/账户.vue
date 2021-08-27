<template>
    <!-- <ul class="type">
        <li :class="{active:type==0}" @click="type=0">基本资料</li>
        <li :class="{active:type==1}" @click="type=1">登录密码</li>
    </ul> -->

    <div>
        <el-form label-width="100px" class="from" size="small">
            <el-form-item label="账号">
                <el-input value="xxxxxxxxxxxx" disabled placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
                <el-input value="" placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input value="" placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input value="" placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="">
                <div class="title-1">如果不进行修改密码，可不填写</div>
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input value="" placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input value="" placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="密码确认">
                <el-input value="" placeholder="" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="warning" style="width: 400px;">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props) {
        let type = ref(0)

        return{
            type
        }
    }
}
</script>

<style lang="scss" scoped>
.type{
    line-height: 35px;
    text-align: center;
    background: #e4e4e4;
    display: flex;
    li{
        flex: 1;
        cursor: pointer;
        &.active,
        &:hover{
            background: var(--color);
            color: #fff;
        }
    }
}
.from{
    margin: 30px 0px;
}
.title-1{
    color: red;
}
</style>