<template>
    <div>
        <el-form class="form" size="mini">
            <h1>
                {{name}}({{gid}}) 游戏配置
            </h1>
            <el-form-item label="名称">
                <el-input v-model="配置.name"/>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="配置.gameType" @change="changeType()" placeholder="" style="width: 100%;">
                    <el-option v-for="(item,key,index) in list" :label="gameType[key]" :value="key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="赔率">
                <template>
                    <div class="el-input peilv">
                        <div class="header">数字</div>
                        <div class="list">
                            <el-button type="" v-for="(item,key,index) in 默认配置.m1">
                                {{index}}
                                <el-input class="input-1" v-model="配置.method.m1[key]" :placeholder="默认配置.m1[key]"/>
                            </el-button>
                        </div>
                        <div class="header">颜色</div>
                        <div class="list">
                            <el-button type="" v-for="(item2,key,index) in 默认配置.m2">
                                {{color[key]}}({{key}})
                                <el-input class="input-1" v-model="配置.method.m2[key]" :placeholder="默认配置.m2[key]"/>
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-form-item>
            <el-button type="warning" size="small" style="width: 100%;" @click="save()">保存</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gid:"",
            state:"",
            
            color:{
                r:"红",
                g:'绿',
                v:"紫",
                rv:'红紫',
                gv:'绿紫'
            },
            gameType:{
                100:'红绿紫'
            },
            list:{},
            name:"",
            // 默认配置
            默认配置:{},
            //已设置的配置
            配置:{
                gameType:"",
                method:{
                    m1:{},
                    m2:{}
                },
                name:'',
                state:""
            },
        }
    },
    methods:{
        获取配置(){
            let o = {
                action:'loadconfig',
                gid:this.gid
            }
            Promise.all([
                this.$axios.post('GameManage', {action:'gametype',gid:this.gid}),
                this.$axios.post('GameManage',o)
            ]).then(all=>{
                console.log(all)
                let list = all[0].data
                    for (const key in list) {
                        list[key]['m1'] = Object.assign({},list[key]['m1'])
                    }
                this.list = all[0].data
                let 配置 = all[1].data
                    配置.method = 配置.method ? 配置.method : {}
                    配置.method.m1 = 配置.method.m1 ? 配置.method.m1 : {},
                    配置.method.m2 = 配置.method.m2 ? 配置.method.m2 : {}
                this.配置 = 配置
                this.默认配置 = this.list[this.配置.gameType]
            })
        },
        
        changeType(){
            console.log(this.list[this.配置.gameType])
            this.默认配置 = this.list[this.配置.gameType]
        },
        save(){
            let o = {
                action:"saveconfig",
                gid:this.gid,
                config:{
                    gameType:this.配置.gameType,
                    name:this.配置.name,
                    state:this.state,
                    // method:{
                        // m1:{},
                        // m2:{}
                    // }
                }
            }
            let m1 = {}
            for (const key in this.配置.method.m1) {
                if(this.配置.method.m1[key]){
                    m1[key] = this.配置.method.m1[key]
                }
            }
            let m2 = {}
            for (const key in this.配置.method.m2) {
                if(this.配置.method.m2[key]){
                    m2[key] = this.配置.method.m2[key]
                }
            }
            if(Object.keys(m1).length!=0 || Object.keys(m2).length!=0 ){
                o.config.method = {}
                if(Object.keys(m1).length!=0){
                    o.config.method.m1 = m1 
                }
                if(Object.keys(m2).length!=0){
                    o.config.method.m2 = m2
                }
            }
            this.$axios.post('GameManage', o ).then(res => {
                if (res.result) {
                    this.正确(res.msg)
                }else{
                    this.错误(res.msg)
                }
            }).catch(err => {
                this.错误('连接错误，稍后再试')
            })
        },
        
    },
    mounted(){
        this.gid = this.$route.query.gid
        this.state = this.$route.query.state
        this.name = this.$route.query.name
        this.获取配置()
        // console.log(this.$route.query.gid)

    }
}
</script>

<style lang="scss" scoped>
.form{
    width: 600px;
    border: 1px solid #eee;
    margin: 20px auto;
    padding: 0px 10px 10px;
}

.table2{
    width: 100%;
    th,td{
        text-align: center;
    }
    th{
        border: 1px solid #eee;
    }
    td{
        border: 1px solid #eee;
    }
}

.peilv{
    border: 1px solid #eee;
    padding: 0px 0px 0px 15px;
    margin: 0px 0px 0px 20px;
    width: auto;
    .list{
        flex-wrap: wrap;
        display: flex;
        .el-button{
            margin: 5px 10px 5px 0px;
        }
        .input-1{
            width: 80px;
            text-align: center;
            margin: 0px 0px 0px 10px;
            color: #000;
            /deep/ input{
                color: red;
                text-align: center;
            }
        }
    }
}
</style>