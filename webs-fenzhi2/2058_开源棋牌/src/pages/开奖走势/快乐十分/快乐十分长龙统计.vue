<template>
    <ul class="list">
        <li v-for="(item, index) in 15" :key="index">
            <div class="mui-card">
                <div class="mui-card-content">
                    亚军：小 4期
                </div>
            </div>
        </li>
    </ul>
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
.list{
    display: flex;
    flex-wrap: wrap;
    >li{
        width: calc(100% / 3);
    }
    .mui-card-content{
        height: _vw(46);
        text-align: center;
        line-height: _vw(46);
        color: #3a3a3a;
    }
}
</style>
