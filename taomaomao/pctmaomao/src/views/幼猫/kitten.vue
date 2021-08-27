<template>
    <div class="w1200">
        <kittenType :tid="id"/>

        <ul class="list">
            <li v-for="item in kitten.data" @click="$router.push('/kittenDetails?i='+item.id)">
                <img :src="$img_url+item.cover" alt="" srcset="">
                <div class="d2">
                    <div class="n1">{{item.name}}</div>
                    <div class="d3">
                        <span>性别：{{item.sex}}</span>
                        <span>年龄：{{item.age}}</span>
                    </div>
                    <div class="d3">
                        <span>毛色：{{item.color}}</span>
                        <span>毛长：{{item.hair}}</span>
                    </div>
                    <div class="d3">
                        <span>疫苗：{{item.vaccine}}</span>
                        <span>芯片：{{item.chip}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <el-pagination v-if="kitten.last_page>1" class="pages" @current-change="currentChange" :current-page="kitten.current_page" background :page-size="kitten.per_page" layout="prev, pager, next" :total="kitten.total"></el-pagination>
    </div>
</template>

<script>
import kittenType from './components/幼猫类型.vue'
export default {
    name: "",
    components: {
        kittenType
    },
    data() {
        return {
            kitten:{
                current_page: 1,        //当前页
                data: [],               
                last_page: 1,           //最后页数
                per_page: 6,            //每页条数
                total: 1                //总页数
            }
        }
    },
    computed: {
        id(){
            return this.$route.query.t
        }
    },
    methods:{
        getKitten(){
            var q = {
                pageIndex: this.kitten.current_page,
                pageSize: this.kitten.per_page,
                typeId: this.id
            }
            this.$axios.post('/tmm/public/index.php/Kitten/selectKitten',q)
            .then(res => {
                if(res.data.code==1)
                this.kitten = res.data.data
            })
            .catch(err => {
            })
        },
        currentChange(index){
            this.kitten.current_page = index
            this.getKitten()
        },
        init(){
            this.kitten={
                current_page: 1,        //当前页
                data: [],               
                last_page: 1,           //最后页数
                per_page: 6,            //每页条数
                total: 1                //总页数
            }
            this.getKitten()
        }
    },
    mounted(){
        this.getKitten()
    },
    watch: {
        id(){
            this.init()
        }
    },
}
</script>

<style lang="scss" scoped>
.list {
    margin: 0px 0px 30px;
    display: flex;
    min-height: 500px;
    flex-wrap: wrap;
    li {
        width: 360px;
        height: 360px;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
        margin-top: 60px;
    }
    li:nth-child(3n-1) {
        margin-right: (1200px - 360px * 3) / 2;
        margin-left: (1200px - 360px * 3) / 2;
    }
    li:hover {
        .d2 {
            transform: scale(1);
            opacity: 1;
        }
    }
    .d2 {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(225, 168, 91, 0.7);
        color: #fff;
        transition: all 0.5s;
        transform: scale(0);
        opacity: 0;
        .n1 {
            font-size: 20px;
            color: #fff;
            margin: 55px 0px 17px;
        }
        .d3 {
            font-size: 14px;
            color: #fff;
            line-height: 27px;
        }
    }
}
.pages{
    margin: 20px auto 50px;
    text-align: center;
}
</style>
