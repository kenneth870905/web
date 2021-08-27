<template>
    <div class="下级会员">
        <div class="title">下级会员</div>
        <div class="table2">
            <el-table :data="list" border size="mini">
                <el-table-column label="昵称" prop="nickName"></el-table-column>
                <el-table-column label="等级" prop="level"></el-table-column>
                <el-table-column label="积分" prop="credit"></el-table-column>
                <el-table-column label="佣金" prop="kickback"></el-table-column>
                <el-table-column label="创建时间" prop="createdAt"></el-table-column>
            </el-table>
        </div>
        <div class="分页" v-show="total> query.size">
            <el-pagination background @current-change="changePage" :page-size="query.size" layout="prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userid:"",
            query:{
                page:1,
                size:10
            },
            list:[],
            total:0
        }
    },
    methods: {
        获取会员(){
            this.$axios.get(`/api/user/${this.userid}/subordinate`,{params:this.query})
            .then(res => {
                if(res.code===0){
                    this.list = res.data
                    this.total = res.total
                }
            })
            .catch(err => {
            })
        },
        changePage(i){
            this.page = i
            this.获取会员()
        }
    },
    mounted() {
        this.userid = this.$route.query.id
        this.获取会员()
    },
}
</script>


<style lang="scss" scoped>
.title {
    padding-bottom: 5px;
    border-bottom: 1px solid #d0d0d0;
    margin: 0px 0px 10px 0px;
}
.下级会员{
    box-shadow: 0px 0px 5px 0px #737373;
    padding: 10px;
    border-radius:5px;
    font-size: 14px;
}

.分页{
    padding: 3px 0px 0px;
    text-align: right;
}
</style>