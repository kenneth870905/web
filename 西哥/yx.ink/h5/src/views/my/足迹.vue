<template>
    <div class="content">
        <van-nav-bar fixed title="足迹" left-arrow @click-left="$back()" right-text="清空" @click-right="onClickRight" />
        <section v-for="(item, index) in list" :key="index">
            <div class="tittle" v-if="!list[index-1] || list[index-1].newTime!=item.newTime">{{item.newTime}}</div>
            <div class="sp">
                <div class="img-1" @click="$router.push(`/products?id=${item.goodsId}`)">
                    <img :src="$img_url+item.cover" alt />
                </div>
                <div class="r">
                    <div class="ttitle-1" @click="$router.push(`/products?id=${item.id}`)">{{item.title}}</div>
                    <div class="f">
                        <span class="qian">₱ {{item.price | setMoney}}</span>
                        <van-icon class="delete" name="delete-o" @click="删除(item,index)" />
                    </div>
                </div>
            </div>
        </section>
        <load :loading="loading" :total="total" :length="list.length" :reachBottom="到底" />
    </div>
</template>

<script>
import load from '@/components/load.vue'
import { setMoney } from "@/assets/自定义函数.js";
import moment from 'moment'
export default {
    components: {
        load
    },
    data() {
        return {
            query: {
                page: 0,
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
        onClickRight() {
            this.$dialog.confirm({
                title: '提示',
                message: '确定清空所有记录吗？',
            }).then(() => {
                this.$axios.post('/Footprint/delete','')
                .then(res => {
                    if(res.code==1){
                        this.$toast('删除成功')
                        this.total = 0
                        this.list = []
                        this.query.page=0
                    }else{
                        this.$toast('删除失败')
                    }
                })
                .catch(err => {
                    this.$toast('系统错误，请联系客服')
                })
            }).catch(() => {
            });
        },
        删除(item, index) {
            this.$dialog.confirm({
                title: '提示',
                message: '确定删除这条记录吗？',
            }).then(() => {
                this.$axios.post('/Footprint/delete',{goodsId:item.goodsId})
                .then(res => {
                    if(res.code==1){
                        this.$toast('删除成功')
                        this.total--
                        this.list.splice(index,1)
                    }else{
                        this.$toast('删除失败')
                    }
                })
                .catch(err => {
                    this.$toast('系统错误，请联系客服')
                })
            }).catch(() => {
            });
        },
        到底() {
            this.查询足迹()
        },
        查询足迹() {
            if (this.loading || (this.total != -1 && this.total <= this.list.length)) {
                return
            }
            this.query.page++
            this.loading = true
            this.$axios.post('/Footprint/getList', this.query).then(res => {
                if (res.code == 1) {
                    let data = res.data.data
                    data.forEach(x => {
                        //判断是不是今天
                        if (moment(x.creationTime).isSame(new Date(), 'd')) {
                            x.newTime = "今天"
                        } else if (moment(x.creationTime).isSame(new Date(), 'y')) {
                            //判断是不是今年
                            x.newTime = moment().format('MM月DD日')
                        } else {
                            x.newTime = moment().format('YYYY年MM月DD日')
                        }
                    });
                    this.list = [...this.list, ...data]
                    this.total = res.data.total
                } else {
                    this.total = 0
                }
                this.loading = false
            }).catch(err => {
                this.total = 0
                this.log = false
            })
        }
    },
    mounted() {
        this.查询足迹()
    },
}
</script>

<style lang="scss" scoped>
.content {
    padding: 46px 0px 0px;
}
.tittle {
    font-size: 30px;
    background: #fff;
    display: flex;
    align-items: baseline;
    padding: 15px 0px 5px 30px;
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: #dcdcdc;
    }
}
.sp {
    background: #fff;
    display: flex;
    padding: 10px 10px;
    .img-1 {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        margin-right: 15px;
        background: #eee;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .r {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
    }
    .ttitle-1 {
        word-break: break-all;
    }
    .f {
        border-bottom: 1px solid #dcdcdc;
        padding: 0px 0px 10px;
        display: flex;
        justify-content: space-between;
    }
    .qian {
        color: #ff5000;
    }
    .delete {
        color: rgba($color: #000000, $alpha: 0.6);
    }
}
</style>