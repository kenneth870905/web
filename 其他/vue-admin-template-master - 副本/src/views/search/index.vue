<template>
    <div class="搜索">
        <div class="bg">
            <!-- <img src="@/assets/bg_top.png" alt srcset /> -->
            <img src="@/assets/photo_2020-12-28_21-29-02.jpg" alt srcset />
        </div>
        <div class="搜索框">
            <div class="text-1">
                In order to make proper selections choose COUNTRY first, after that select STATE, and only then CITY.
                <br />In order to make multiple state selections pressdown CTRL button.
            </div>
            <div class="select">
                <el-select class="select-2" size="small" v-model="cardNumber" multiple filterable allow-create default-first-option placeholder="bin">
                    <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                </el-select>
                <el-button @click="handleFilter" class="btn-1" size="small" icon="el-icon-search"></el-button>
            </div>
        </div>

        <ul class="list" v-loading="fullscreenLoading">
            <li>卡号</li>
            <li v-for="item in list">{{ item.cardNumberXX }}</li>
        </ul>

        <div class="分页">
            <el-pagination @current-change="getpage" layout="prev, pager, next" :total="20"></el-pagination>
        </div>

        <!-- <div class="footer">
            <img src="~@/assets/licq.png" alt="" srcset="">
        </div> -->

        <el-popover placement="left"  width="225" trigger="click">
            <ul class="list2">
                <li>
                    更新通知
                    <img src="~@/assets/t_logo.png" alt="">
                    <el-link type="success" href="https://t.me/cvvhv" target="view_window">https://t.me/cvvhv</el-link>
                </li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：123123</li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：222444</li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：555333</li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：888777</li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：900000</li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：93339</li>
                <li>25在线秒发 <img src="~@/assets/licq.png" alt=""> icq：30088</li>
                <li>在线支持 <img src="~@/assets/licq.png" alt=""> icq：77777</li>
            </ul>
            <div class="联系我们" slot="reference">
                联系
                <br>
                我们
            </div>
        </el-popover>
        
        <!-- <el-row style="text-align: center">
            <el-button type="primary" icon="el-icon-arrow-left" :disabled="listQuery.page == 1" @click="getpage(1)">上一页</el-button>
            <el-button type="primary" @click="getpage(2)" :disabled="listQuery.page == 2">
                下一页
                <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </el-row> -->
        <!-- <el-table :data="list" v-loading="listLoading" border size="mini">
                <el-table-column label="卡号" prop="cardNumber" align="center">
                    <template slot-scope="{ row }">
                        <span>{{ row.cardNumberXX }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="其他" align="center">
                    <template slot-scope="{ row }">
                        <span>{{ row.cardNumberXX }}</span>
                    </template>
                </el-table-column>
        </el-table>-->
    </div>
</template>

<script>
import { searchList } from "@/api/search";

import { parseTime } from "@/utils";

import { getToken } from "@/utils/auth";
import Pagination from "@/components/Pagination";
export default {
    name: "ComplexTable",
    components: { Pagination },
    filters: {
        parseTime(time) {
            return parseTime(time);
        },
    },
    data() {
        return {
            options: [
            // {
            //     value: '选项1',
            //     label: '黄金糕'
            // },
            ],
            cardNumber: [],

            fullscreenLoading: false,
            list: [],
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: "+id",
                Query: {
                    cardNumber: "",
                },
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getpage(val) {
            this.listQuery.page = val;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            this.listQuery.Query.cardNumber = this.cardNumber.join(',')
            searchList(this.listQuery).then((response) => {
                this.list = response.data.items;
                this.total = response.data.total;
                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
            });
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
    },
};
</script>

<style lang="scss" scoped>
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
.搜索 {
    height: 100%;
    background: #101010;
    overflow: auto;
}
.bg {
    height: 300px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.搜索框 {
    width: 1024px;
    margin: 0px auto;
    .text-1 {
        padding: 10px 0px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        line-height: 26px;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.7);
    }
    .select {
        padding: 10px 0px;
        text-align: right;
        ::v-deep input {
            border-radius: 0px;
        }
    }
    .select-2 {
        width: 300px;
    }
    ::v-deep .el-input__suffix {
        display: none;
    }
    .btn-1 {
        border-radius: 0px;
        height: 32px;
        border-left: none;
    }
    ::v-deep .el-tag.el-tag--info{
        color: #000;
    }
}

.list {
    min-height: 500px;
    width: 1024px;
    margin: 0px auto;
    color: #bdbdbd;
    text-align: center;
    // 1px solid #393939
    border: 1px solid #393939;
    li:nth-child(1) {
        color: #ffd822;
    }
    li {
        padding: 10px;
        border-bottom: 1px solid #393939;
    }
    li:nth-child(2n-1) {
        background: #090909;
    }
    ::v-deep .el-loading-mask {
        background-color: rgba($color: #fff, $alpha: 0.3);
    }
}

.分页{
    text-align: center;
    margin: 20px 0px;
    ::v-deep .el-pagination{
        color: #bdbdbd;
    }
    ::v-deep .number.active{
        color: #ffd822;
    }
    ::v-deep .btn-prev,
    ::v-deep .number,
    ::v-deep .btn-next{
        background: none;
        color: #bdbdbd;
    }
}

.footer{
    background: #090909;
    text-align: center;
    padding: 10px;
    img{
        width: 50px;
    }
}

.联系我们{
    position: fixed;
    right: 50px;
    bottom: 50px;
    background: #ffd822;
    width: 50px;
    height: 50px;
    font-size: 14px;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    // animation: identifier 3s linear infinite;
    &::after{
        width: 60px;
        height: 60px;
        border: 1px solid #ffd822;
        position: absolute;
        top: -5px;
        right: -5px;
        content: '';
        border-radius: 100%;
        animation: identifier 1.5s linear infinite;
    }
}
@keyframes identifier {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: scale(1.5);
    }
}

.list2{
    li{
        display: flex;
        padding: 5px 0px;
        align-content: center;
    }
    img{
        margin: 0px 5px;
        width: 20px;
        height: 20px;
    }
}

</style>
