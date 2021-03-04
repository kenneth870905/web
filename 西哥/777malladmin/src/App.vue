<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
html,body{
    height: 100%;
    margin: 0px;
}
#app{
    height: 100%;
}
*{
    box-sizing: border-box;
}
.分页{
    text-align: right;
    margin: 10px 0px;
}

ul,li{
    margin: 0px;
    padding: 0px;
    list-style: none;
}

:root {
    --color:#ec0909;
}
</style>
