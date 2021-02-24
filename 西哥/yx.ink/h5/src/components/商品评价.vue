<template>
    <div class="评价">
        <div class="sp" v-if="item.sp && ismy" @click="$router.push(`/products?id=${item.sp.id}`)">
            <div class="img">
                <img :src="$img_url+item.sp.cover" alt="" srcset="">
            </div>
            <div>{{item.sp.title}}</div>
        </div>
        <div class="title-1">
            <span>
                <span v-if="!ismy && item.nickName">{{item.nickName | name}}</span>
                <span v-if="!ismy && !item.nickName">{{item.userName | name}}</span>
                <span v-if="!ismy"> - </span>
                {{item.creationTime}}
            </span>
            <van-rate :value="item.number" size="14px" color="#ffd21e" />
        </div>
        <div class="text-1">{{item.text}}</div>
        <div class="imgList">
            <img @click="查看大图(index)" v-for="(item2,index) in item.image" :src="$img_url+item2" alt srcset />
        </div>
        <ul class="回复">
            <li v-for="item2 in item.huifu">
                <span>{{item.type==1 ? '卖家回复' : '买家回复'}}：</span>
                {{item2.text}}
            </li>
        </ul>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
    props: {
        ismy:{
            default:false  //查看自己的
        },
        item: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {

        }
    },
    filters: {
        name(name) {
            if (!name) return name
            return name.substring(0, 4) + '***'
        }
    },
    methods: {
        查看大图(index){
            let list = []
            this.item.image.forEach(item => {
                list.push(this.$img_url+item)
            });
            ImagePreview({
                images:list,
                startPosition: index,
            });
        }
    },
}
</script>

<style lang="scss" scoped>

.评价 {
    border-bottom: 1px solid #e7e8ec;
    padding: 0px 15px;
    background: #fff;
}
.sp{
    padding: 10px 0px;
    display: flex;
    border-bottom: 1px solid #eee;
    .img{
        width: 80px;
        height: 80px;
        margin: 0px 10px 0px 0px;
        background: #eee;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
.title-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    height: 36px;
    color: rgba($color: #000000, $alpha: 0.7);
}
.text-1 {
    font-size: 14px;
    color: #191919;
    white-space: pre-wrap;
    word-break: break-all;
}
.imgList {
    margin: 5px 0px 0px 0px;
    img {
        width: 40px;
        height: 40px;
        border: 1px solid #eee;
        object-fit: contain;
        margin: 0px 5px 5px 0px;
    }
}
.回复 {
    li {
        background: #f6f6f6;
        font-size: 14px;
        padding: 5px 10px;
        color: #bd7f00;
        margin: 5px 0px;
        span {
            color: #aaa;
        }
    }
}
</style>