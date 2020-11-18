<template>
    <div class="评论">
        <van-nav-bar left-text="返回" title="评论详情" left-arrow @click-left="$back" fixed></van-nav-bar>
        
        <xq :obj="原贴"/>
        <h4 class="title_1">全部回复</h4>
        <van-list :offset="50" v-model="评论.loading" :finished="!this.评论.loading && 评论.total!=-1 && 评论.list.length>=评论.total" finished-text="没有更多了" @load="onLoad">
            <xq v-for="(item, index) in 评论.list" :obj="item" :key="index"/>
        </van-list>
        <!-- <xq v-for="(item, index) in 3" :key="index"/> -->

        <div class="输入框">
            <van-field ref="input2" maxlength="500" v-model="回复.text" type="textarea" :placeholder="`回复${待回复.nickname ? 待回复.nickname : 待回复.userName}`" rows="1" autosize />
            <van-button @click="添加评论()" slot="button" type="info" plain>发送</van-button>
        </div>
    </div>
</template>

<script>
const xq =()=>import('@/components/评论/详情1.vue');
export default {
    name: "",
    components:{
        xq
    },
    provide(){
        return{
            点击回复:(obj)=>{
                console.log(obj)
                this.待回复=obj
                // this.回复.revert = revert==this.原评id ? 0 : revert;
                this.$nextTick(()=>{
                    this.$refs.input2.focus();
                })
            }
        }
    },
    data() {
        return {
            原评id:"",
            回复:{
                show:false,
                parentId:"",
                text:"",
                revert:"",
                newId:""
            },
            待回复:{},
            原贴:{},
            评论:{
                query:{
                    pageSize:10,
                    pageIndex:0,
                    newId:'',
                    parentId:""
                },
                list:[],
                total:-1,
                loading:false
            }
        }
    },
    methods: {
        onLoad(){
            console.log('onLoad');
            this.评论.query.pageIndex++;
            this.查询评论();
        },
        查询评论(){
            this.$axios.post('/PingLun/queryAll',this.评论.query).then(x=>{
                this.评论.list = [...this.评论.list , ...x.data.data] ;
                this.评论.total = x.data.total;
                this.评论.loading = false
            }).catch(err=>{})
        },
        添加评论(){
            var kong = /^\s+$/
            if(!this.回复.text || kong.test(this.回复.text)){
                this.$toast('请输入内容');
                return
            }
            this.$toast.loading({mask: true,duration:0})
            this.回复.parentId = this.待回复.parentId ? this.待回复.parentId : this.待回复.id 
            this.回复.newId = this.$route.query.newId
            this.回复.revert = this.待回复.id;
            console.log(this.回复);
            // return
            this.$axios.post('/PingLun/add',this.回复).then(x=>{
                this.$toast.clear();
                if(x.data.code==1){
                    console.log(x)
                    this.评论.list.unshift(x.data.message);
                    this.评论.total++
                    this.$toast('评论成功')
                    this.回复.text=''
                }else{
                    this.$toast('评论失败')
                }
            }).catch(err=>{})
        },
        根据Id查询评论(){
            this.$axios.post('/PingLun/queryById',{id:this.$route.query.rid}).then(x=>{
                this.原贴 = x.data;
                this.待回复 = this.原贴;
            }).catch(err=>{})
        }
    },
    mounted() {
        // this.评论.query.newId = this.$route.query.newsid;
        this.评论.query.parentId = this.$route.query.rid;
        this.原评id = this.$route.query.rid
        // this.obj.newId = this.$route.query.newsid;
        // this.查询评论()
        this.根据Id查询评论();
    },
}
</script>

<style lang="scss" scoped>
.评论{
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 46px 0px _vw(60);
}

.title_1{
    text-align: center;
}

.输入框{
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding: _vw(5);
    display: flex;
    border-top: 1px solid #cccccc;
    box-sizing: border-box;
    background: #e6e6e6;
    .van-button{
        margin: 0px 0px 0px _vw(5);
        white-space: nowrap;
        height: auto;
    }
}
</style>
