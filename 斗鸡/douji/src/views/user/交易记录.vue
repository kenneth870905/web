<template>
    <ul class="type-list">
        <li :class="{active:type==0}" @click="type=0">下注</li>
        <li :class="{active:type==1}" @click="type=1">充值</li>
        <li :class="{active:type==2}" @click="type=2">提现</li>
        <li :class="{active:type==3}" @click="type=3">返佣</li>
        <li :class="{active:type==4}" @click="type=4">其他</li>
    </ul>
    <el-empty description="暂无数据"></el-empty>
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
.type-list{
    line-height: 35px;
    background: #e4e4e4;
    display: flex;
    li{
        cursor: pointer;
        padding: 0px 20px;
        &.active{
            background: var(--color);
            color: #fff;
        }
        &:hover{
            background: var(--color);
            color: #fff;
        }
    }
}
</style>