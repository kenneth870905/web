<template>
    <div class="banner">
        <img src="static/image/doujiBanner.jpg" alt srcset />
    </div>
    <div class="box-1">
        <div class="w1200">
            <div class="title">通知:</div>
            <marquee>滚动文字滚动文字滚动文字滚动文字</marquee>
            <div></div>
        </div>
    </div>
    <div class="w1200">
        <div class="title-1">联系我们</div>
    </div>

    <div class="content"></div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.banner {
    font-size: 0px;
    img {
        width: 100%;
    }
}
.title-1 {
    font-size: 40px;
    text-transform: uppercase;
    color: var(--color);
    margin: 40px 0px 20px;
}

.box-1 {
    background: var(--color);
    line-height: 40px;
    > div {
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
        &::after,
        &::before {
            content: "";
            width: 100px;
            height: 100px;
            position: absolute;
        }
        &::before {
            top: -50px;
            left: -20px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
        &::after {
            top: -10px;
            right: -30px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
    }
    .title {
        white-space: nowrap;
        flex-shrink: 0;
        color: #fff;
        position: relative;
        z-index: 1;
    }
    marquee {
        background: #fff;
    }
}
</style>