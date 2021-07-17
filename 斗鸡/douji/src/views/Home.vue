<template>
    <el-carousel trigger="click" class="banner">
        <el-carousel-item >
            <img src="static/image/home-banner-1.jpg" alt="" srcset="">
        </el-carousel-item>
        <el-carousel-item >
            <img src="static/image/home-banner-2.jpg" alt="" srcset="">
        </el-carousel-item>
    </el-carousel>
    <div class="box-1">
        <div class="w1200">
            <div class="title">
                通知:
            </div>
            <marquee>滚动文字滚动文字滚动文字滚动文字</marquee>
            <div></div>
        </div>
    </div>

    <div class="box-2 w1200">
        <div>
            <img src="static/image/sv-2.png" alt="">
        </div>
        <div>
            <img src="static/image/digmaan-2.png" alt="">
        </div>
    </div>

    <div class="box-3">
        <div>
            <img src="static/image/home-1.png" alt="">
            <div class="t1">REWARD SHOP</div>
            <div class="t2">COLLECT POINT AND</div>
            <div class="t2">CLAIM YOUR REWARD</div>
        </div>
        <div>
            <img src="static/image/home-2.png" alt="">
            <div class="t1">MEMBER VIP</div>
            <div class="t2">GROW UP WITH US AND</div>
            <div class="t2">GET MORE WITH US</div>
        </div>
        <div>
            <img src="static/image/home-3.png" alt="">
            <div class="t1">CLAW MINI GAME</div>
            <div class="t2">FUN PLAY AND</div>
            <div class="t2">WIN WIN WIN WITH US</div>
        </div>
    </div>

</template>

<script>

export default {
    // props:{
    //     Language:String
    // },
    setup(props) {
        console.log(props)
    }
}
</script>


<style lang="scss" scoped>
.banner{
    height: ( 100vw / 1920) * 550;
    /deep/ .el-carousel__container{
        height: 100%;
    }
}
.box-1{
    background: var(--color);
    line-height: 40px;
    >div{
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
        &::after,
        &::before{
            content: '';
            width: 100px;
            height: 100px;
            position: absolute;
            
        }
        &::before{
            top: -50px;
            left: -20px;
            z-index: 1;
            transform: rotate( 45deg );
            background: var(--color);
        }
        &::after{
            top: -10px;
            right: -30px;
            z-index: 1;
            transform: rotate( 45deg );
            background: var(--color);
        }
    }
    .title{
        white-space: nowrap;
        flex-shrink: 0;
        color:#fff;
        position: relative;
        z-index: 1;
    }
    marquee{
        background: #fff;
    }
}
.box-2{
    margin: 50px auto 0px;
    display: flex;
    div{
        width: 50%;
        position: relative;
    }
    div:nth-child(2) img{
        position: absolute;
        right: 0px;
        top: 0px;
    }
    img{
        width: 107%;
        cursor: pointer;
        transition: all 0.3s;
        &:hover{
            transform: scale(1.05);
        }
    }
}

.box-3{
    width: 1200px;
    margin: 30px auto;
    display: flex;
    padding: 50px 0px;
    background: #c8af96;
    border-radius: 10px;
    text-align: center;
    >div{
        width: calc(100% / 3);
    }
    .t1{
        margin: 15px;
        font-size: 24px;
        color: #9f010c;
        font-weight: bold;
    }
    .t2{
        color: #fff;
    }
}
</style>