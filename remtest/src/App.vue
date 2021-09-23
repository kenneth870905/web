<template>
    <div id="app">
        
        <div class="main__container">
            <div class="header__container">顶部标题1</div>
            <div class="header__container zhanwei"></div>

            <div class="app__container">
                <router-view />
            </div>


            <footer>底部底部底部底部</footer>


            <template v-if="!islogin">
                <div class="footer fixed" >
                    <van-button type="primary">注册登录按钮</van-button>
                </div>
                <div class="footer zhanwei" >
                </div>
            </template>
            
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            islogin: false,
        }
    },
    
}
</script>

<style lang="scss">
html{
    height: 100%;
    -webkit-text-size-adjust: auto;
    -ms-text-size-adjust: auto;
    -moz-text-size-adjust: auto;
    // overflow-x: hidden;
    // overflow-y: auto;
    // -webkit-overflow-scrolling: touch;
    margin: 0;
    padding: 0;
}

body{
    margin: 0;
    padding: 0;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    // overflow-x: hidden;
}
*{
    box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
#app{
    height: 100%;
}

.header__container{
    &.zhanwei{
        position: relative;
        height: 44px;
        background:none;
    }
    position: fixed;
    flex-shrink: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    text-align: center;
    line-height: 44px;
    background: rgba($color: #000000, $alpha: 0.5);
}

.main__container{
    // height: 100vh;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    transition-duration: .3s;
    -webkit-overflow-scrolling: touch;
}

.app__container{
    position: relative;
    flex-grow: 1;
    // height: min-content;
}

footer{
    background: rgba($color: #000000, $alpha: 0.5);
    flex-shrink: 0;
    line-height: 30px;
}
.footer{
    flex-shrink: 0;
    &.fixed{
        z-index: 1;
        position: fixed;
    }
    &.zhanwei{
        height: 64px;
    }
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 0.625rem 0.625rem #fff;
    padding: .625rem 1.375rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
</style>
