<template>
    <footer>
        <ul>
            <li @click="$router.push('/infoDetail/sv388')">SV388</li>
            <li @click="$router.push('/infoDetail/digmaan')">DIGMAAN</li>
            <li @click="$router.push('/aboutUs')">关于我们</li>
            <li @click="$router.push('/rule')">规则与条款</li>
            <li @click="$router.push('/responsible')">有节制博彩</li>
            <li @click="$router.push('/policy')">隐私政策</li>
            <li @click="$router.push('/alliance')">联属伙伴</li>
            <li @click="$router.push('/contactUs')">联系我们</li>
        </ul>
        <div class="Copyright">Copyright @ 2021 Lucky CockFighting All Right Reserved.</div>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
footer{
    background: var(--color);
    color: #fff;
    padding: 15px 0px ;
    position: sticky;
    top: 100%;
}
ul{
    text-align: center;
    li{
        display: inline-block;
        font-size: 14px;
        padding: 3px 10px;
    }
}
.Copyright{
    font-size: 12px;
    text-align: center;
    margin: 20px 0px 0px;
    color: rgba($color: #fff, $alpha: 0.8);
    
}
</style>