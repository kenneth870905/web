<template>
    <div>
        <ul>
          <h1>我是资讯中心页面</h1>
            <li @click="$router.push('/about/new?id='+item)" :key="item.id" v-for="item in 3">
                这是资讯信息第一条{{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
        }
    },
}
</script>

<style lang="scss" scoped>

</style>

