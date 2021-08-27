<template>
    <div id="app">
        <header1 />

        <router-view class="view"></router-view>

        <footer1 />
    </div>
</template>

<script>
import header1 from '@/components/header.vue';
import footer1 from '@/components/footer.vue';
export default {
    name: "",
    components: { header1, footer1 },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss">
html,
body {
    margin: 0px;
    font-size: 14px;
    overflow: auto;
}
.w1200 {
    width: 1200px;
    margin: 0px auto;
}
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
* {
    box-sizing: border-box;
}

.view {
    padding: 120px 0px 0px;
}
</style>
