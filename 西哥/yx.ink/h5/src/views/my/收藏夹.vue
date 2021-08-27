<template>
    <div class="content">
        <van-nav-bar fixed title="收藏夹" left-arrow @click-left="$back()" />

        <van-swipe-cell v-for="(item, index) in list" :key="index">
            <div class="item" @click="$router.push('/products?id='+item.goodsId)">
                <div class="img">
                    <img :src="$img_url+item.cover" alt srcset />
                </div>
                <div>
                    <div>{{item.title}}</div>
                    <div class="jiage">
                        ₱
                        <span>{{item.price | setMoney}}</span>
                    </div>
                </div>
            </div>
            <template #right>
                <van-button @click="取消收藏(item,index)" square type="danger" text="取消收藏" class="delete-button" />
            </template>
        </van-swipe-cell>

        <load :loading="loading" :total="total" :length="list.length" :reachBottom="reachBottom" />
    </div>
</template>

<script>
import load from '@/components/load.vue'
import { setMoney } from "@/assets/自定义函数.js";
export default {
    components: {
        load
    },
    data() {
        return {
            query: {
                page: 1,
                size: 10
            },
            list: [],
            total: -1,
            loading: false
        }
    },
    filters: {
        setMoney
    },
    methods: {
        reachBottom() {
            this.查询收藏()
        },
        查询收藏() {
            if (this.loading || (this.total != -1 && this.total <= this.list.length)) {
                return
            }
            this.loading = true
            this.$axios.post('/Favorite/getList', this.query).then(res => {
                if (res.code == 1) {
                    this.list = [...this.list, ...res.data.data]
                    this.total = res.data.total
                } else {
                    this.total = 0
                }
                this.loading = false
            }).catch(err => {
                this.total = 0 
                this.loading = false
            })
        },
        取消收藏(item,index) {
            this.$dialog.confirm({
                title: '提示',
                message: '确定取消收藏？',
            }).then(() => {
                this.$axios.post('/Favorite/save',{goodsId:item.goodsId}).then(res => {
                    if(res.code==1){
                        this.$toast('取消成功')
                        this.list.splice(index,1)
                        this.total--
                    }else{
                        this.$total('取消失败')
                    }
                }).catch(err => {
                    this.$toast('系统错误，请联系客服')
                })
            }).catch(() => {});
        }
    },
    mounted() {
        this.查询收藏()
    },
}
</script>

<style lang="scss" scoped>
.content {
    padding: 46px 0px 0px;
}
.delete-button {
    height: 100%;
}
.item {
    display: flex;
    padding: 10px 15px;
    background: #fff;
    margin: 10px 0px 0px;
    .img {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        background: #eee;
        margin: 0px 10px 0px 0px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .jiage {
        color: rgb(255, 80, 0);
        font-size: 12px;
        margin: 10px 0px 0px;
        span {
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>