<template>
    <li class="item" :class="type">
        <div v-if="type=='left'" class="img_box">
            <img src="https://tg-cdn2.gdbzh.com.cn/10cce331-5f0b-42df-a804-3abcbfd5a80f.png" alt="" srcset="">
        </div>
        <div class="cont">
            <p class="time" v-if="type=='left'">
                <span>至尊导师-途哥</span>
                <span> 12:51:10</span>
            </p>
            
            <p class="time mui-text-right" v-if="type=='right'">
                <span> 12:51:10</span>
                <span>至尊导师-途哥</span>
            </p>
            <div class="msg">
                <div class="一键计划">
                    <div class="header_1">
                        <img src="static/image/liaotian/follow-bg.png">
                    </div>
                    <div class="text1">
                        {{content.text}}
<!-- 【系统推荐-精准计划三分pk拾】	

05期 冠军： 10,01,03,08,09 中 
06期 冠军： 09,02,06,05,03 挂 
07期 冠军： 07,08,06,05,10 中 
08期 冠军： 10,02,04,06,07 中 
09期 冠军： 09,04,08,10,03 中 
10期 冠军： 04,02,08,09,06 等

冠军五码计划：依据历史走势为依据，选出一则号码进行预测。未中奖以1/3/9/27/81倍投注，中奖恢复1倍投注。 -->
                    </div>
                    <div class="btn1">一键跟单</div>
                </div>
            </div>
        </div>
        
        <div v-if="type=='right'" class="img_box">
            <img src="https://tg-cdn2.gdbzh.com.cn/10cce331-5f0b-42df-a804-3abcbfd5a80f.png" alt="" srcset="">
        </div>
    </li>
</template>

<script>
export default {
    name: "",
    props:{
        type:'',
        content:{
            default(){
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
.right{
    justify-content: flex-end;
}

.item {
     margin: _vw(20) 0px;
    padding:0px _vw(10) 0px _vw(10);
    display: flex;
    .img_box{
        flex-shrink: 0;
        width: _vw(30);
        height: _vw(30);
        margin: 0px _vw(10) 0px _vw(10);
        img{
            width: 100%;
            height: 100%;
        }
    }
    .time{
        color: #656565;
        font-size: _vw(12);
    }
    
}

.一键计划{
    width: _vw(250);
    .header_1{
        font-size: 0px;
        img{
            width: 100%;
        }
    }
    .text1{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-size: _vw(14);
        white-space: pre-wrap;
        word-break: break-all;
        background-clip: padding-box,border-box;
        background-origin: padding-box,border-box;
        background-image: linear-gradient(0deg,#fff,#fff),linear-gradient(90deg,#a32dd8,#3180fd);
        border: 2px solid transparent;
        padding: _vw(10);
        color: #7d49e4;
    }
    .btn1{
        background-image: linear-gradient(90deg,#a32dd8,#3180fd);
        // linear-gradient(90deg,#a32dd8,#3180fd);
        line-height: _vw(30);
        text-align: center;
        color: #fff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}


</style>


