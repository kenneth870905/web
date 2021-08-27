<template>
    <div>
        <navigation />
        <topSwiper />

        <ul class="ul_5">
            <li v-for="(item,index) in shop" :key="index">
                <a class="img" :href="'#/shopDetails?id='+item.id">
                    <img :src="`${$api_url}/tmm/public/storage/${item.cover}`" alt="">
                </a>
                <div class="text">
                    <div class="name">{{item.shopName}}</div>
                    <!-- <div class="desc hidden-xs hidden-sm">“淘喵喵”是沪上知名的撸猫馆/猫咖，
                        目前在上海，“淘喵喵”拥有 2 家宠物店和 1 家猫咖。
                        宠物店以销售猫咪活体为主，猫咪的周边用品为辅。名猫咖啡馆（以下简称“猫咖”）
                        提供与猫咪互动的体验服务为主，猫咪活体销售为辅，兼营轻餐饮服务。
                        两者之间形成了良好的业务联动：宠物店为猫咖挑选理想的店猫；猫咖为宠物店提供了活体销售的机会。</div> -->
                    <div class="tel">{{item.contact}}</div>
                    <div class="address">{{item.address}}</div>
                </div>
            </li>
        </ul>
        <br>
        
        <footer1 />
    </div>
</template>

<script>

import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import footer1 from '@/components/footer.vue'
export default {
    components: {
        navigation,
        topSwiper,
        footer1
    },
    name: "",
    data() {
        return {
            shop:[]
        }
    },
    methods:{
        getShop(){
            this.$axios.post('Shop/getList',{'pageSize':100}).then(res => {
                this.shop = res.data.data
            }).catch(err => {})
        },
    },
    mounted(){
        this.getShop()
    }
}
</script>

<style lang="scss" scoped>
.ul_5{
    margin: 40px 5px 0px;
    li{
        margin: 10px 0; 
        background: #f6f6f6;
        position: relative;
        display: flex;
        padding: 10px 0px 10px 5px;
        justify-content: space-between;
    }
    .img{
        display: block;
        width: 40%;
        flex-shrink: 0;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .text{
        width: 56%;
    }
    .name{
        height: 35px;
        font-size: 15px;
        color: #333;
        line-height: 35px;
    }
    .tel{
        height: 25px;
        margin: 0;
        font-size: 12px;
        color: #666;
        line-height: 25px;
        padding: 0px 0px 0px 20px;
        background: url(~@/assets/images/icon_tel.png) left center no-repeat;
    }
    .address{
        height: 25px;
        margin: 0;
        font-size: 12px;
        padding: 0px 0px 0px 20px;
        line-height: 25px;
        color: #666;
        background: url(~@/assets/images/icon_map.png) left center no-repeat;
    }
}
</style>
