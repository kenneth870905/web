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
                <Icon type="md-cube" />
                云机同步
            </Button>
        </div>
    </div>
</template>

<script>
export default {
    inject:[],
    data() {
        return {
            query:{
                page:1,
                size:10
            }
        }
    },
    methods: {
        获取设备(){
            console.log('获取新数据')
            this.$axios.get(`/api/device`,{params:this.query})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted() {
        this.获取设备()
    },
}
</script>

<style lang="scss" scoped>
.header{
    padding: 10px ;
    background: #fff;
    button{
        margin: 0px 5px 0px 0px;
    }
}
.批量操作{
    line-height: 38px;
    li{
        cursor: pointer;
        &:hover{
            color: #1890ff;
        }
    }
    li:not(:last-child){
        border-bottom: 1px solid #eee;
    }
}
</style>