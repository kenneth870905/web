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
                <div class="img_box1">
                    <img :src="content.img" @click="查看大图()" alt="" srcset="">
                </div>
            </div>
        </div>
        
        <div v-if="type=='right'" class="img_box">
            <img src="https://tg-cdn2.gdbzh.com.cn/10cce331-5f0b-42df-a804-3abcbfd5a80f.png" alt="" srcset="">
        </div>
    </li>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
    name: "",
    props:{
        type:{
            default:'left'
        },
        imgurl:"",
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
    methods: {
        查看大图(){
            ImagePreview({
                images:[this.imgurl],
                'show-index':false
            });
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
    .msg{}
}

.img_box1{
    img{
        max-width: _vw(250);
        max-height: _vw(300);
    }
}


</style>


