<template>
    <div>
        <div class="header">
            <Poptip trigger="hover" placement="bottom-start">
                <Button size="small">
                    <Icon type="md-apps" />批量操作
                </Button>
                <ul class="批量操作" slot="content">
                    <li>重启云机</li>
                    <li>返回桌面</li>
                    <li>启动应用</li>
                    <li>关闭应用</li>
                    <li>恢复出厂设置</li>
                </ul>
            </Poptip>
            <Button size="small">
                <Icon type="md-cube" />云机同步
            </Button>
            <Button size="small" @click="安装应用()" class="btn-1">
                <Icon type="logo-android" />
                安装应用
            </Button>
        </div>

        <Table class="table" border :columns="columns" :data="list" :loading="loading">
            <template slot-scope="{row}" slot="setId">{{row.setId | filterName}}</template>
            <template slot-scope="{ row, index }" slot="caozuo">
                <Button type="primary" size="small" style="margin-right: 5px" @click="续费(row)">续费</Button>
                <Button type="error" size="small" @click="远程地址(row)">远程控制</Button>
            </template>
        </Table>

        <Page v-show="total" class="分页" :total="total" :page-size="query.size" @on-change="changePage" />
        
        <!-- 远程控制 -->
        <yckz ref="yckz"/>
    </div>
</template>

<script>
import yckz from '@/components/远程控制.vue'
export default {
    inject:['安装应用'],
    components:{
        yckz
    },
    data() {
        return {
            query: {
                page: 1,
                size: 10,
                setName:""
            },
            list: [],
            total: 0,
            loading: true,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'deviceId',
                    key: 'deviceId'
                },
                {
                    title: 'setId',
                    slot: 'setId'
                },
                {
                    title: '到期时间',
                    key: 'dueTime'
                },
                {
                    title: '操作',
                    width: 200,
                    align: 'center',
                    slot: 'caozuo'
                }
            ],
            player: "",
            设备:{},
        }
    },
    filters: {
        filterName(setId) {
            var 机型list = [
                {
                    name: "荣耀30天",
                    setId: 230,
                    价格: 230
                }, {
                    name: "荣耀15天",
                    setId: 46,
                    价格: 46
                }, {
                    name: "荣耀7天",
                    setId: 13,
                    价格: 13
                }
            ]
            return 机型list.find(x => x.setId == setId) ? 机型list.find(x => x.setId == setId).name : '未知机型'
        }
    },
    methods: {
        获取设备() {
            this.loading = true
            this.$axios.get(`/api/device`, { params: this.query })
                .then(res => {
                    if (res.data.code === 0) {
                        this.total = res.data.total
                        this.list = res.data.data
                    }
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                })
        },
        changePage(i) {
            this.query.page = i
            this.获取设备()
        },
        续费(item) {
            this.$Modal.confirm({
                title:"提示",
                content:`确定给deviceId:${item.deviceId}手机续费吗？`,
                onOk:()=>{
                    this.$Spin.show();
                    this.$axios.post(`/api/device/${item.id}/renew`,'')
                    .then(res => {
                        if(res.data.code===0){
                            this.正确('续费成功')
                            this.获取设备()
                        }else{
                            this.正确(res.data.message)
                        }
                        this.$Spin.hide();
                    })
                    .catch(err => {
                        console.error(err);
                        this.错误('系统错误，稍后再试') 
                        this.$Spin.hide();
                    })
                }
            })
        },
        远程地址(item) {
            this.$refs.yckz.init(item)
        }
    },
    mounted() {
        console.log(this.$route)
        this.query.setName = this.$route.query.name
        this.获取设备()
    },
}
</script>

<style lang="scss" scoped>
.header {
    padding: 0px 0px 10px;
    background: #fff;
    button {
        margin: 0px 5px 0px 0px;
    }
}
.批量操作 {
    line-height: 38px;
    li {
        cursor: pointer;
        &:hover {
            color: #1890ff;
        }
    }
    li:not(:last-child) {
        border-bottom: 1px solid #eee;
    }
}
.table {
    margin: 15px 0px 0px;
    min-height: 300px;
}
.分页 {
    margin: 15px 0px;
    text-align: right;
}

#video {
    width: 300px;
    height: 667px;
    border: 1px solid #eeeeee;
}
</style>