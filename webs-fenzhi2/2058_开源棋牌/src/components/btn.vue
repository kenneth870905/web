<template>
    <div class="Btn">
        <button :style="styles" :type="type">{{value}}</button>
    </div>
</template>

<script>
// @click.native
// 如果想在外面使用点击事件
export default {
    name: "",
    props: {
        value: {
            default: "确定"
        },
        type: {
            default: "button" // submit 或者 button 之类的
        },
        styles: {
            default: ""
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>

.Btn {
    text-align: center;
    // width: fit-content;
    margin: _vw(20) auto _vw(20);
    button {
        max-width: 100%;
        width: _vw(300);
        height: _vw(40);
        color: rgba(255, 255, 255, 1);
        @include bgcolor;
        border-radius: _vw(40);
        font-size: _vw(14);
        padding: 0px 0px 0px 2px;
        box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
        border: none;
        letter-spacing: 2px;
    }
}
</style>
