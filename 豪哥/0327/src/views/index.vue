<template>
    <a-layout>
        <a-layout-sider>
            <div class="nav-header-1">当前：{{user.name}}</div>
            <a-menu mode="inline" theme="dark" v-model:selectedKeys="openKeys" @click="clickMenu">
                <a-menu-item key="/">
                    <template #icon>
                        <ordered-list-outlined />
                    </template>
                    用户管理
                </a-menu-item>
                <a-menu-item key="/contentList">
                    <template #icon>
                        <ordered-list-outlined />
                    </template>
                    内容管理
                </a-menu-item>
                <a-menu-item key="/changePassword">
                    <template #icon>
                        <ordered-list-outlined />
                    </template>
                    密码设置
                </a-menu-item>
                <!-- <a-sub-menu title="子菜单" key="4">
                    <a-menu-item key="4-1">菜单2</a-menu-item>
                    <a-menu-item key="4-2">菜单2</a-menu-item>
                </a-sub-menu>-->
            </a-menu>
            <div class="nav-out-btn" @click="goOut()">退出</div>
        </a-layout-sider>
        <a-layout>
            <a-layout-header></a-layout-header>
            <!-- <div class="openlist">
                <a-tag closable color="#108ee9">哈哈</a-tag>
                <a-button type="primary" size="small">哈哈</a-button>
            </div> -->
            <a-layout-content>
                <a-breadcrumb>
                    <a-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
                        <a href="javascript:;" @click="$router.push(item.path)">{{item.name}}</a>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <!-- <a-breadcrumb :routes="routers">
                    <template #itemRender="{ route, params, routes, paths }">
                        <span >{{route.name}}</span>
                    </template>
                </a-breadcrumb> -->
                <div class="routerView">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <!-- <a-layout-footer></a-layout-footer> -->
        </a-layout>
    </a-layout>
</template>

<script>
import { ref } from '@vue/reactivity'
import { OrderedListOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core';
export default {
    components: {
        OrderedListOutlined
    },
    setup(props) {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        let user = computed(()=>store.state.user.userInfo) 
        let routers = route.matched

        let openKeys = ref([route.path])
        let clickMenu = ({ item, key, keyPath }) => {
            router.push(key)
        }
        let goOut = ()=>{
            store.commit('user/setUserInfo',{})
            router.push('/login')
        }
        return {
            openKeys,
            routers,
            user,

            clickMenu,
            goOut
        }
    }
}
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
::v-deep .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    .ant-menu {
        flex-grow: 1;
    }
}
.nav-header-1 {
    height: 64px;
    line-height: 64px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    border-bottom: 1px solid #032c52;
}
.ant-layout {
    height: 100%;
}
.nav-out-btn {
    color: #fff;
    line-height: 40px;
    text-align: center;
    background: red;
    cursor: pointer;
}

.routerView {
    padding: 10px;
}

.ant-layout {
    overflow: auto;
}
.ant-layout-header {
    position: sticky;
    z-index: 1;
    top: 0px;
}
.openlist {
    position: sticky;
    top: 64px;
    z-index: 1;
    border-bottom: 1px solid #b1b1b1;
    padding: 5px 10px;
    background: #fff;
    span {
        cursor: pointer;
    }
}
.ant-breadcrumb{
    padding: 5px 10px;
}

</style>


