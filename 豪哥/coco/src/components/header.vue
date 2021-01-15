<template>
    <div class="header">
        <div class="l">
            <!-- <span class="全选">全选</span> -->
            <ButtonGroup class="btn-1" >
                <Button :type="列表显示 ? 'default' : 'primary'" @click="查看设备(false)">
                    <Tooltip content="预览图" placement="bottom">
                        <Icon type="md-apps" />
                    </Tooltip>
                </Button>
                <Button :type="列表显示 ? 'primary' : 'default'" @click="查看设备(true)">
                    <Tooltip content="列表显示" placement="bottom">
                        <Icon type="md-menu" />
                    </Tooltip>
                </Button>
            </ButtonGroup>
            <!-- <Poptip trigger="hover">
                <Button class="btn-1">
                    移动分组
                    <Icon type="md-swap" />
                </Button>
                <div class="分组列表" slot="content">
                    <div>分组1</div>
                    <div>分组2</div>
                </div>
            </Poptip> -->
            <!-- <Button type="primary" @click="安装应用()" class="btn-1" v-show="$route.path=='/device'">
                <Icon type="logo-android" />
                安装应用
            </Button> -->
            <Button class="btn-1">
                <Icon type="md-cloud-upload" />
                上传文件
            </Button>
            <Button type="primary" class="btn-1" @click="购买()">
                <Icon type="md-add-circle" />
                购买机器
            </Button>
            <Button class="btn-1" @click="$router.push('/borderList')">
                <Icon type="md-list" />
                购买记录
            </Button>
        </div>
        <div class="r">
            <Icon class="icon-1" type="md-search" />
            <Icon class="icon-1" type="md-refresh" />
            <Icon class="icon-1" type="md-cloud-done" />
            <Icon class="icon-1" type="logo-twitch" />
            <Icon class="icon-1" type="md-flower" />
            <Poptip trigger="hover" placement="bottom-end" width="150">
                <div class="touxiang">
                    <img src="static/image/touxiang.png" alt="" srcset="">
                </div>
                <div class="分组列表2" slot="content">
                    <div>修改资料</div>
                    <div>修改密码</div>
                    <div>安全退出</div>
                </div>
            </Poptip>
        </div>
        <!-- 选机弹框 -->
        <gjtk ref="gjtk"/>

    </div>
</template>

<script>
import gjtk from '@/components/选机弹框.vue'
import {mapState} from 'vuex'
export default {
    name: "",
    inject:['安装应用'],
    components:{
        gjtk
    },
    data() {
        return {
            列表显示:true
        }
    },
    computed:{
       ...mapState({
           userInfo:'userInfo',
           分组:"分组"
       })
    },
    methods: {
        购买(){
            if(this.分组.length==0){
                this.$Modal.warning({
                    title: '提示',
                    content: '您还没有分组，请在右侧先添加分组'
                });
                return
            }
            this.$refs.gjtk.显示弹框=true
        },
        查看设备(type){
            this.列表显示 = type
            this.$router.push('/')
        }
    },
    mounted() {
    },
}
</script>


<style lang="scss" scoped>
.header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.l {
    display: flex;
    align-items: center;
    .全选 {
        color: #1890ff;
        cursor: pointer;
        margin: 0px 15px 0px 0px;
    }
    .btn-1{
        margin: 0px 10px 0px 0px;
    }
    .分组列表{
        line-height: 30px;
        div{
            cursor: pointer;
            &:hover{
                color: #1890ff;
            }
        }
    }
}
.r{
    display: flex;
    align-items: center;
    .icon-1{
        cursor: pointer;
        font-size: 20px;
        margin: 0px 0px 0px 15px;
    }
}
.touxiang{
    display: flex;
    align-items: center;
    margin: 0px 0px 0px 15px;
    img{
        width: 30px;
    }
}
.分组列表2{
    text-align: center;
    line-height: 30px;
    div{
        cursor: pointer;
        &:hover{
            color: #2778ff;
        }
    }
}
</style>