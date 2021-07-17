<template>
    <div class="banner">
        <img src="static/image/doujiBanner.jpg" alt="" srcset="">
    </div>

    <div class="box-1">
        <div class="w1200">
            <div class="title">
                通知:
            </div>
            <marquee>滚动文字滚动文字滚动文字滚动文字</marquee>
            <div></div>
        </div>
    </div>

    <ul class="list">
        <li>
            <div>
                <img class="img-1" src="static/image/sv.png" alt="" srcset="">
            </div>
            <div>SV388</div>
            <i class="el-icon-video-play"></i>
        </li>
        <li>
            <div>
                <img class="img-1" src="static/image/digmaan.png" alt="" srcset="">
            </div>
            <div>DIGMAAN</div>
            <i class="el-icon-video-play"></i>
        </li>
    </ul>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.banner{
    font-size: 0px;
    img{
        width: 100%;
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

.list{
    width: 1200px;
    display: flex;
    justify-content: space-evenly;
    margin: 50px auto;
    text-align: center;
    li{
        background: #c8af96;
        cursor: pointer;
        width: 350px;
        height: 210px;
        border-radius: 20px;
        padding: 15px 0px 0px;
        color: var(--color);
        font-weight: bold;
        font-size: 24px;
        position: relative;
        overflow: hidden;
        &:hover{
            .el-icon-video-play{
                opacity: 1;
                &::before{
                    margin-top: 0px;
                }
            }
        }
    }
    .img-1{
        height: 154px;
    }
    .el-icon-video-play{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba($color: #000000, $alpha: 0.5);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 80px;
        transition: all 0.3s;
        opacity: 0;
        &::before{
            margin-top: 50px;
            transition: all 0.3s;
        }
    }
}
</style>