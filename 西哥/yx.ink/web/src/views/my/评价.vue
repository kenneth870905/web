<template>
    <div>
        <div class="title-1">我的评价</div>
        <div class="content">
            <ul>
                <li class="item-box" v-for="item in list">
                    <div class="sp">
                        <div class="img">
                            <img v-if="item.sp" :src="$img_url+item.sp.cover" alt srcset />
                        </div>
                        <div class="t1">{{item.sp ? item.sp.title : '商品信息异常'}}</div>
                    </div>
                    <div class="pj">
                        <el-rate :value="item.number" disabled text-color="#ff9900"></el-rate>
                        <div class="text-1">{{item.text}}</div>
                        <div class="img-list">
                            <el-image fit="contain" class="img-1" :src="$img_url+item2" :preview-src-list="srcList(item.image)" v-for="(item2, index2) in item.image"></el-image>
                            <!-- <img :src="$img_url+item2" :preview-src-list="srcList(item.image)" alt srcset v-for="(item2, index2) in item.image" :key="index2" /> -->
                        </div>
                    </div>
                    <div class="time">
                        <div>
                            <!-- <span class="del">删除</span> -->
                        </div>
                        <div>2021-01-01 00:00</div>
                    </div>
                </li>
            </ul>

            <el-pagination class="pagination" v-if="total>0" @current-change="fenye" :total="total" :page-size="query.size" :current-page="query.page" layout="prev, pager, next" background></el-pagination>
            <nodata v-if="total==0" />
        </div>
    </div>
</template>

<script>
import nodata from '@/components/nodata.vue'
import { mapState } from 'vuex'
export default {
    components: {
        nodata
    },
    data() {
        return {
            query: {
                page: 1,
                size: 10,
                userId: ""
            },
            total: -1,
            list: []
        }
    },
    computed: {
        ...mapState({
            userInfo: "userInfo"
        }),
    },
    methods: {
        srcList(list) {
            let l = []
            list.forEach(item => {
                l.push(this.$img_url + item)
            });
            return l
        },
        fenye(i) {
            this.query.page = i
            this.查询评价()
        },
        查询评价() {
            this.$Loading(1)
            this.$axios.post('/Translation/getByGoodsId', this.query).then(res => {
                this.$Loading()
                if (res.code == 1) {
                    this.list = res.data.data
                    this.total = res.data.total
                } else {
                    this.total = 0
                }
            }).catch(err => {
                this.$Loading()
                this.total = 0
            })
        }
    },
    mounted() {
        this.query.userId = this.userInfo.id
        this.查询评价()
    },
}
</script>

<style lang="scss" scoped>
.title-1 {
    line-height: 60px;
    font-size: 22px;
}
.content {
    // background: #fff;
}
.item-box {
    display: flex;
    background: #fff;
    padding: 10px 15px;
    margin: 0px 0px 10px 0px;
    .sp {
        width: 80px;
        flex-shrink: 0;
        .img {
            height: 80px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .t1 {
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #797979;
            margin: 5px 0px 0px;
        }
    }
    .pj {
        flex: 1;
        padding: 0px 50px 0px 30px;
        font-size: 12px;
        .img-list {
            margin: 10px 0px 0px 0px;
            .img-1{
                background: #eee;
                width: 40px;
                height: 40px;
                margin: 0px 5px 5px 0px;
            }
            img {
                width: 40px;
                height: 40px;
                margin: 0px 5px 5px 0px;
            }
        }
    }
    .time {
        white-space: nowrap;
        flex-shrink: 0;
        font-size: 12px;
        color: #9a9a9a;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        .del {
            color: #f94a4a;
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
    }
}
.pagination {
    text-align: right;
}
</style>