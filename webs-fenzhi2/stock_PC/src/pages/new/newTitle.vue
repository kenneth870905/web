<template>
    <div>
        <ul>
            <li @click="$router.push('/about/new?id='+item)" :key="item.id" v-for="item in 3">
                第{{ item }}条新闻，欢迎来到chines
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            // item:"国家统计局：4月中国采购经理指数延续扩张走势1",
            // item:"5月起 这些新规将影响你的生活"
        }
    },
}
</script>

<style lang="scss" scoped>

</style>

