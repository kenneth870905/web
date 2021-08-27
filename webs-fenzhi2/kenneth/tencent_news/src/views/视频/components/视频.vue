<template>
    <div class="视频">
         

        <div class="box_1">
            <div class="title">秒变追星现场！火箭军受阅官兵归队 刚下车就被群众包围求合影</div>
            <!-- muted -->
            <!-- <video controls  autoplay="autoplay" src="https://r2---sn-p2jvo8xgbx-hoae.googlevideo.com/videoplayback?expire=1570450739&ei=09iaXbHFHcilqAGL8r6wCg&ip=116.93.11.231&id=o-AJXkIiKtWbrYv4sSmLdUSENlSEi7UckPQIL2p4t6_UgN&itag=18&source=youtube&requiressl=yes&mm=31%2C29&mn=sn-p2jvo8xgbx-hoae%2Csn-i3b7kn7d&ms=au%2Crdu&mv=m&mvi=1&pl=24&gcr=ph&initcwndbps=297500&mime=video%2Fmp4&gir=yes&clen=15852352&ratebypass=yes&dur=231.549&lmt=1570348175744262&mt=1570429059&fvip=2&fexp=23842630&c=MWEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHylml4wRgIhAMgxDk_V1oOP9rp5pVbuSUHlWcJvFGraGAORnKvy2zfAAiEAyb1NnQ1GNAg2VxqGhAsAFRSJopbMToRHdwFoCOQ20hM%3D&sig=ALgxI2wwRQIgU7kV_fOvMybYOz2P3rZmcAyD2ng3fUYWwFF_BYApLHgCIQDxOjR4LTi6SK7b7kjaZ3gtW5SdsJzgZde5pYxzK9OWLA%3D%3D&cpn=muvF4bgzMAiWuAi6&cver=2.20191003.06.02&ptk=youtube_single&oid=yZJtHRi2SvzOOKZfbA-GRA&ptchn=dI8evszfZvyAl2UVCypkTA&pltype=content"></video> -->
            <div class="bg">
                <img src="https://puui.qpic.cn/qqvideo_ori/0/z3005ufc9yw_496_280/0" alt="" srcset="">
            </div>
            <img class="btn_1" src="static/image/xw_icon_video_play.svg" alt="">
            <div class="time">00:45</div>
        </div>
        <div class="footer">
            <img class="img_1" src="https://inews.gtimg.com/newsapp_ls/0/643884783_200200/0" alt="">
            <span class="title_1">凌晨资讯站</span>
            <span class="type">军事</span>
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
.视频{
    position: relative;
    margin: _vw(12) _vw(15);
    border-bottom: 1px solid #eeeeee;
    .box_1{
        height: _vw(195);
        position: relative;
    }
    .title{
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
        padding: _vw(6) _vw(12);
        color: #ffffff;
        background: linear-gradient(rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 100%);
    }
    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .bg{
        position: absolute;
        top: 0px;
        left:0px;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .btn_1{
        position: absolute;
        width: _vw(48);
        height: _vw(48);
        background: rgba(0, 0, 0, 0.3);
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        border-radius: 100%;
    }
    .time{
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        line-height: _vw(18);
        font-size: _vw(12);
        right: _vw(10);
        bottom: _vw(10);
        padding: 0px _vw(10);
        border-radius: _vw(18);
    }
    .footer{
        display: flex;
        align-items: center;
        padding: _vw(8) 0px;
        .img_1{
            width: _vw(24);
            height: _vw(24);
            margin: 0px _vw(10) 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title_1{
            font-size: _vw(14);
            margin: 0px _vw(10) 0px 0px;
        }
        .type{
            font-size: _vw(12);
            line-height: _vw(18);
            border-radius: _vw(18);
            background: rgb(237, 242, 250);
            color: rgb(130, 140, 155);
            display: block;
            padding: 0px _vw(10);
        }
    }
}
</style>
