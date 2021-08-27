<template>
    <div>
        <div class="title-1">{{userInfo.name}}</div>
        <ul class="云机状态">
            <!-- <li @click="云机类型=1" :class="{active:云机类型==1}"> -->
            <li @click="$router.push('/statistics')" :class="{active:$route.fullPath=='/statistics'}">
                <div>云机总数</div>
                <div>{{统计.totalDeviceCount}}</div>
            </li>
            <!-- <li @click="云机类型=2" :class="{active:云机类型==2}">
                <div>故障数</div>
                <div>--</div>
            </li> -->
            <!-- <li @click="云机类型=3" :class="{active:云机类型==3}"> -->
            <li @click="$router.push('/statistics?t=2')" :class="{active:$route.fullPath=='/statistics?t=2'}">
                <div>即将到期</div>
                <div>{{统计.threeDaysDueDeviceCount}}</div>
            </li>
        </ul>

        <div class="input-1">
            <Input placeholder="新建分组" v-model="name">
                <Icon @click="添加分组()" slot="append" type="md-add" />
            </Input>
        </div>

        <ul class="分组">
            <li v-for="item in 分组" :class="{active:$route.fullPath=='/device?name='+item.name}">
                <!-- <Input type="text" @on-keyup.enter="保存()" v-show="item.xiugai" /> -->
                <span @click="$router.push(`/device?name=${item.name}`)" class="name" v-show="!item.xiugai">{{item.name}}</span>
                <div v-show="!item.xiugai">
                    <!-- <Icon class="icon-1" @click="item.xiugai=true" type="ios-create-outline" /> -->
                    <Poptip confirm class="" title="确定删除?" @on-ok="ok(item)" >
                        <Icon class="icon-1" type="ios-close-circle-outline" />
                    </Poptip>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: "",
    data() {
        return {
            云机类型: 1,
            name:"",
        }
    },
    computed:{
        ...mapState({
            分组:"分组" ,
            userInfo:'userInfo',
            统计:'统计'
        })
    },
    methods: {
        ...mapActions({
            获取分组:"获取分组"
        }),
        添加分组() {
            if(!this.name){
                this.错误('请输入分组名称')
                return
            }
            this.$axios.post(`/api/deviceset`,{name:this.name}).then(res => {
                console.log(res)
                if(res.data.code===0){
                    this.获取分组()
                }else{
                    this.错误(res.data.message)
                }
            }).catch(err => {
                this.错误('系统错误，稍后再试')
            })
        },
        保存() {
            console.log('保存')
        },
        ok(item){
            this.$axios.delete(`/api/deviceset/${item.id}`,'').then(res => {
                console.log(res)
                if(res.data.code===0){
                    this.正确('删除成功')
                    this.获取分组()
                }else{
                    this.错误(res.data.message)
                }
            }).catch(err => {
                console.log(err)
                this.错误('系统错误，稍后再试')
            })
        },
    },
    mounted() {
        console.log(this.$route)
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
        width: calc(100% / 2);
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
            background: #1890ff;
            color: #fff;
            .icon-1 {
                display: inline-block;
            }
        }
    }
    li.active {
        background: #1890ff;
        color: #fff;
    }
    .name{
        line-height: 40px;
        flex: 1;
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