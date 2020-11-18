<template>
    <div class="隐私">
        <div class="title">用户隐私策略</div>
        <div class="内容">
            1.为帮助你浏览推荐、发布信息、互动交流、注册认证，我们不会收集你的任何信息;
            <br>
            2.为提供上述服务，我们可能会收集联络方式、位置、通讯录等部分敏感信息，你有权拒绝或撤回授权;
            <br>
            3.未经你同意，我们不会从第三方获取、共享或提供你的信息;
            <br>
            4.你可以访问、更正、删除你的个人信息，我们也将提供注销、投诉的方式。
        </div>
        <div class="footer" @click="关闭隐私策略()">确定</div>
    </div>
</template>

<script>
export default {
    name:"",
    inject:['关闭隐私策略'],
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.隐私{
    width: 70vw;
    height: 60vh;
    display: grid;
    grid-template-rows:_vw(44) auto _vw(44);
    .title{
        text-align: center;
        line-height: _vw(44);
        border-bottom: 1px solid #eeeeee;
    }
    .内容{
        padding: _vw(10);
        font-size: _vw(14);
        line-height: _vw(24);
        overflow: auto;
    }
    .footer{
        border-top: 1px solid #eeeeee;
        text-align: center;
        line-height: _vw(44);
    }
}
</style>
