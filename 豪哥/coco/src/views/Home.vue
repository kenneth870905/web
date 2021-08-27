<template>
    <Layout class="home">
        <Sider class="Left" style="width:230px;max-width: 230px;flex: 0 0 230px;">
            <left />
        </Sider>
        <Layout>
            <Header class="Header">
                <header2/>
            </Header>
            <Content>
                <router-view ref="routerView"></router-view>
                <!-- <div v-for="item in 100">{{item}}</div> -->
            </Content>
            <!-- <Footer>Footer</Footer> -->
        </Layout>
        
        <!-- 安装应用 -->
        <azyy ref="azyy" />
        <!-- 充值弹框 -->
        <cz ref="cz"/>
    </Layout>
</template>

<script>
import left from "@/components/左侧.vue"
import header2 from "@/components/header.vue"
import azyy from '@/components/安装应用.vue'
import cz from '@/components/充值弹框.vue'
import { mapActions } from 'vuex'

export default {
    name: 'Home',
    provide(){
        return{
            获取设备列表:()=>{
                if(this.$route.path=='/device'){
                    this.$refs.routerView.获取设备()
                }
            },
            安装应用:(setName)=>{
                this.$refs.azyy.init(setName)
            },
            显示充值:(type)=>{
                this.$refs.cz.充值弹框 = type
            }
        }
    },
    components:{
        left,
        header2,
        azyy,
        cz
    },
    data() {
        return {
            云机类型:1
        }
    },
    methods: {
        ...mapActions({
            获取分组:'获取分组',
            获取机型:"获取机型",
            统计:"统计",
            获取入款账户:"获取入款账户"
        })
    },
    mounted() {
        this.获取分组()
        this.获取机型()
        this.统计()
        this.获取入款账户()
    },
}
</script>

<style lang="scss" scoped>
.home{
    height: 100%;
}
.ivu-layout{
    position: relative;
}
.Header{
    background: #fff;
    height: 50px;
    line-height: inherit;
    padding: 0px 15px;
    position: sticky;
    top: 0px;
    z-index: 5;
}
.Left{
    background: #001529;
    color: #fff;
    width: 580px;
}

.ivu-layout-content{
    padding: 15px 15px 0px;
    >div{
        background: #fff;
        min-height: 100%;
        padding: 10px;
    }
}


</style>
