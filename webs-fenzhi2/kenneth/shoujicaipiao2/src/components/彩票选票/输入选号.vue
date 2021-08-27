<template>
    <div class="输入选号">
        <textarea></textarea>
        <div class="提示">
        每一注号码之间请用一个换行[Enter]、一个逗号[,] 或者 分号[;] 隔开（输入的号码会自动排序并去除不合格号码）。
        </div>
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
.输入选号{
    padding: _vw(10);
}
textarea{
    height: _vw(126);
    font-size: _vw(14);
}
.提示{
    font-size: _vw(14);
    color: #8c8787;
}
</style>
