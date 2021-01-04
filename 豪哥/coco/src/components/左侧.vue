<template>
    <div>
        <div class="title-1">coco</div>
        <ul class="云机状态">
            <li @click="云机类型=1" :class="{active:云机类型==1}">
                <div>云机总数</div>
                <div>0</div>
            </li>
            <li @click="云机类型=2" :class="{active:云机类型==2}">
                <div>故障数</div>
                <div>0</div>
            </li>
            <li @click="云机类型=3" :class="{active:云机类型==3}">
                <div>今日到期</div>
                <div>0</div>
            </li>
        </ul>

        <div class="input-1">
            <Input placeholder="新建分组">
                <Icon @click="添加分组()" slot="append" type="md-add" />
            </Input>
        </div>

        <ul class="分组">
            <li v-for="item in 分组" :class="{active:item.active}">
                <Input type="text" @on-keyup.enter="保存()" v-show="item.xiugai" />
                <span v-show="!item.xiugai">未分组（0）</span>
                <div v-show="!item.xiugai">
                    <Icon class="icon-1" @click="item.xiugai=true" type="ios-create-outline" />
                    <Poptip confirm class="" title="确定删除?" @on-ok="ok(item)" >
                        <Icon class="icon-1" type="ios-close-circle-outline" />
                    </Poptip>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            云机类型: 1,
            分组: [
                { xiugai: true, active: true },
                { xiugai: false, active: false },
                { xiugai: false, active: true }
            ]
        }
    },
    methods: {
        添加分组() {
            console.log(123)
        },
        保存() {
            console.log('保存')
        },
        ok(item){
            console.log(item)
        }
    },
}
</script>

<style lang="scss" scoped>
.title-1 {
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
    margin-bottom: 20px;
}
.云机状态 {
    padding: 0px 5px;
    display: flex;
    text-align: center;
    li {
        width: calc(100% / 3);
        margin: 0px 5px;
        position: relative;
        cursor: pointer;
        div:nth-child(2) {
            font-size: 20px;
            margin: 5px 0px 5px;
        }
        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        &::after {
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            margin: auto;
            content: "";
            width: 0%;
            height: 3px;
            background: #1890ff;
            transition: all 0.1s;
        }
    }
    li.active {
        &::after {
            width: 100%;
        }
    }
}

.input-1 {
    padding: 0px 15px;
    margin: 40px 0px 0px;
    /deep/ .ivu-input {
        background: inherit;
        border: 1px solid rgba($color: #fff, $alpha: 0.3);
        color: #fff;
    }
    /deep/ .ivu-input-group-append {
        background: #1890ff;
        color: #fff;
        border: 1px solid #1890ff;
    }
}
.分组 {
    margin: 10px 0px 0px;
    color: #d2d2d2;
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0px 15px;
        cursor: pointer;
        &:hover {
            .icon-1 {
                display: inline-block;
            }
        }
    }
    li.active {
        background: #1890ff;
        color: #fff;
    }
    .icon-1 {
        color: #d2d2d2;
        display: none;
        font-size: 16px;
        &:hover {
            color: #fff;
        }
    }
    /deep/ .ivu-input {
        background: inherit;
        color: #fff;
    }
    /deep/ .ivu-poptip-body{
        color: #000;
    }
}
</style>