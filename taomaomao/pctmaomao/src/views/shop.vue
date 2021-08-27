<template>
    <ul class="w1200 shop_list">
        <li v-for="item in shop">
            <div class="l" @click="$router.push('/shopDetails?id='+item.id)">
                <img :src="$img_url+item.cover" alt="" srcset="">
            </div>
            <div class="r">
                <div class="t1">{{item.shopName}}</div>
                <div class="intro">{{item.intro}}</div>
                <div class="lx">{{item.contact}}</div>
                <div class="dz">{{item.address}}</div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            shop:[]
        }
    },
    methods:{
        getShop(){
            // http://127.0.0.1
            this.$axios.post('/tmm/public/index.php/shop/getList',{pageSize:100,pageIndex:1})
            .then(res => {
                this.shop = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    mounted() {
        this.getShop()
    },
}
</script>

<style lang="scss" scoped>
.shop_list{
    margin-top: 75px;
    margin-bottom: 20px;
    li{
        display: flex;
        background: #f6f6f6;
        padding: 10px;
        margin: 0px 0px 20px;
    }
    .l{
        flex-shrink: 0;
        width: 530px;
        height: 530px/16*9;
        margin: 0px 45px 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .r{
        width: 0;
        flex:1;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .t1{
            height: 50px;
            font-size: 30px;
            color: #333;
            line-height: 50px;
        }
        .intro{
            // width: 100%;
            height: 90px;
            // margin: 20px 0;
            font-size: 13px;
            padding: 0px 20px 0px 0px;
            color: #999;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .lx{
            height: 30px;
            // margin: 10px 0;
            padding-left: 20px;
            background: url('~@/assets/images/icon_tel.png') left center no-repeat;
            font-size: 18px;
            color: #666;
            line-height: 30px;
        }
        .dz{
            height: 30px;
            // margin: 10px 0;
            padding-left: 20px;
            background: url("~@/assets/images/icon_map.png") left center no-repeat;
            font-size: 13px;
            color: #666;
            line-height: 30px;
        }
    }
}
</style>