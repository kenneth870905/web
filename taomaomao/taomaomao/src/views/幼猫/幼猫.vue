<template>
    <div>
        <navigation />

        <topSwiper />

        <kittenType :tid="typeId" />

        <ul class="list-1">
            <li v-for="item in kitten.data">
                <a :href="'#/KittenDetails?id='+item.id">
                    <span><img :src="`${$api_url}/tmm/public/storage/${item.cover}`"></span>
                    <div class="c_14">
                        <h2>英短蓝猫001号</h2>
                        <h3>
                            <p>性别：弟弟&nbsp;&nbsp;&nbsp;&nbsp;年龄：2-4个月</p>
                            <p>毛色：金色&nbsp;&nbsp;&nbsp;&nbsp;毛长：短毛</p>
                            <p>疫苗：三联&nbsp;&nbsp;&nbsp;&nbsp;芯片：带芯片\平安保险</p>
                        </h3>
                    </div>
                </a>
            </li>
        </ul>

        <div class="LaoCMS-page" v-show="kitten.last_page>1">
            <a href="javascript:;" @click="changePage(1)" v-show="kitten.current_page!=1">第一页</a>
            <a href="javascript:;" @click="changePage(kitten.current_page-1)" v-show="kitten.current_page!=1">上一页</a>
            <a href="javascript:;">{{kitten.current_page}}</a>
            <a href="javascript:;" @click="changePage(kitten.current_page+1)" v-show="kitten.current_page<kitten.last_page">下一页</a>
            <a href="javascript:;" @click="changePage(kitten.last_page)" v-show="kitten.current_page<kitten.last_page">最末页</a>
        </div>

        <footer1 />
    </div>
</template>

<script>
import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import kittenType from './components/猫咪类别.vue'
import footer1 from '@/components/footer.vue'
export default {
    name: "",
    components: {
        navigation,
        topSwiper,
        kittenType,
        footer1
    },
    data() {
        return {
            kitten: {
                current_page: 1,    //当前页
                data: [],
                last_page: 1,       //最后一页
                per_page: 8,        //每页条数
                total: 0            //总数
            }
        }
    },
    computed: {
        typeId() {
            return this.$route.params.id
        }
    },
    methods: {
        getKitten() {
            var obj = {
                typeId: this.typeId,
                pageSize: this.kitten.per_page,
                pageIndex: this.kitten.current_page
            }
            this.$axios.post('Kitten/selectKitten', obj).then(res => {
                if (res.data.code == 1)
                    this.kitten = res.data.data
            }).catch(err => { })
        },
        changePage(index) {
            this.kitten.current_page = index
            this.getKitten()
        },
    },
    mounted() {
        this.getKitten()
    },
    watch: {
        '$route'() {
            console.log('路由发生改变')
            this.kitten = {
                current_page: 1,    //当前页
                data: [],
                last_page: 1,       //最后一页
                per_page: 4,        //每页条数
                total: 0            //总数
            }
            this.getKitten()
        }
    },
}
</script>


<style lang="scss" scoped>
.list-1 {
    padding: 0 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: center;
    a {
        display: block;
        position: relative;
        color: #fff;
    }
    li {
        width: 47vw;
        margin: 15px 0px;
    }
    span {
        display: block;
        width: 47vw;
        height: 47vw;
    }
    img {
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }
    .c_14 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background: rgba(225, 168, 91, 0.7);
        display: none;
    }
    h2 {
        margin-top: 30px;
        font-size: 14px;
    }
    h3 {
        line-height: 16px;
        font-size: 12px;
        -webkit-line-clamp: 2;
    }
    p {
        margin: 0px;
    }
}

.LaoCMS-page {
    padding: 14px 0 10px;
    font-size: 13px;
    text-align: center;
    a {
        height: 25px;
        margin-left: 6px;
        padding: 0 8px;
        border: 1px solid #d3d3d3;
        text-align: center;
        color: #767676;
        display: inline-block;
        line-height: 24px;
    }
}
</style>
