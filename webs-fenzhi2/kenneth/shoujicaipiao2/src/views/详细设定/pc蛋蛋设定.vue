<template>
    <section class="warrp" style="">
        <div class="a-list">
            <div>PC蛋蛋-豹子</div>
            <div>1000000.00</div>
            <div>1000000.00</div>
            
        </div>
        <div class="a-list">
            <div>PC蛋蛋-特码包三</div>
            <div>1000000.00</div>
            <div>1000000.00</div>
            
        </div>
        <div class="a-list">
            <div>PC蛋蛋-特码</div>
            <div>1000000.00</div>
            <div>1000000.00</div>
            
        </div>
        <div class="a-list">
            <div>PC蛋蛋-混合</div>
            <div>1000000.00</div>
            <div>1000000.00</div>
            
        </div>
        <div class="a-list">
            <div>PC蛋蛋-波色</div>
            <div>1000000.00</div>
            <div>1000000.00</div>
            
        </div>
    </section>
</template>

<script>
export default {
    name: "",
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
.warrp{
    .a-list{
        border-bottom: 1px solid #efeff4;
        display: flex;
        line-height: _vw(38);
        font-size: _vw(12);
        text-align: center;
        white-space: nowrap;
        div{
            width: calc(100% / 3);
        }
    }
}
</style>
