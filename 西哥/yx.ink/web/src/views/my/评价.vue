<template>
    <div>
        <div class="title-1">我的评价</div>
        <div class="content">
            <ul>
                <li class="item-box" v-for="item in 0">
                    <div class="sp">
                        <div class="img">
                            <img src="https://ph-live.slatic.net/p/7ade15afa2191e8ea781613b08a1bd1a.png" alt srcset />
                        </div>
                        <div class="t1">商品名称商品名称商品名称商品名称</div>
                    </div>
                    <div class="pj">
                        <el-rate value="5" disabled text-color="#ff9900" ></el-rate>
                        <div class="text-1">我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价我的评价</div>
                        <div class="img-list">
                            <img src="https://ph-live.slatic.net/p/7ade15afa2191e8ea781613b08a1bd1a.png" alt srcset v-for="(item, index) in 3" :key="index"/>
                        </div>
                    </div>
                    <div class="time">
                        <div>
                            <span class="del">删除</span>
                        </div>
                        <div>2021-01-01 00:00</div>
                    </div>
                </li>
            </ul>

            <!-- <el-pagination class="pagination" background  :total="50" :page-size="1" layout="prev, pager, next"></el-pagination> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
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
.item-box{
    display: flex;
    background: #fff;
    padding: 10px 15px;
    margin: 0px 0px 10px 0px;
    .sp{
        width: 80px;
        flex-shrink: 0;
        .img{
            height: 80px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .t1{
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #797979;
            margin: 5px 0px 0px;
        }
    }
    .pj{
        flex: 1;
        padding: 0px 50px 0px 30px;
        font-size: 12px;
        .img-list{
            img{
                width: 40px;
                height: 40px;
                margin: 0px 5px 5px 0px;
            }
        }
    }
    .time{
        white-space: nowrap;
        flex-shrink: 0;
        font-size: 12px;
        color: #9a9a9a;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        .del{
            color:#f94a4a;
            cursor: pointer;
            &:hover{
                color: red;
            }
        }
    }
}
.pagination{
    text-align: right;
}
</style>