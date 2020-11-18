<template>
    <div>
        <van-nav-bar title="关注" left-arrow @click-left="$back"></van-nav-bar>
        <div class="Main">
            <div class="title">关注的人</div>

            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <ul class="list">
                    <li v-for="(item, index) in list" :key="index">
                        <!-- $router.push(`/cbs?id=${item.id}`) -->
                        <div class="logo" @click="$router.push(`/cbs?id=${item.id}`)">
                            <img v-if="item.logo" :src="item.logo" />
                        </div>
                        <div class="content" @click="$router.push(`/cbs?id=${item.id}`)">
                            <div class="title_1">{{item.name}}</div>
                            <div class="text">{{item.introduce}}</div>
                        </div>
                        <div class="已关注" @click="取消关注(item,index)">
                            <van-icon name="success" />
                            已关注
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            loading: false,
            query: {
                pageIndex: 0,
                pageSize: 10
            },
            list: [],
            total: -1,
        }
    },
    computed: {
        finished() {
            return !this.loading && this.list.length >= this.total && this.total!=-1;
        }
    },
    methods: {
        onLoad(){
            this.loading = true
            this.query.pageIndex++;
            this.获取关注()
        },
        async 获取关注(){
            let r = await this.$axios.post('/GuanZhu/queryAll', this.query)
            this.list = [...this.list, ...r.data.data];
            this.total = r.data.total;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        async 取消关注(item,index){
            let r =  await this.$dialog.confirm({ title: '提示', message: '确定取消关注？'}).then(() => true).catch(() => false);
            if(!r) return
            this.$toast.loading({mask: true,duration:0})
            try {
                var r1 = await this.$axios.post('/GuanZhu/index',{sourceId:item.id})            
            } catch (error) {
                this.$toast('系统错误，稍后再试')
                return
            }
            this.$toast.clear();
            if(r1.data.code==1){
                this.$toast('设置成功')
                this.list.splice(index,1);
                this.total--
            }else{
                this.$toast(x.data.message)
            }
            
            
            console.log('取消关注')
        },
    },
}
</script>

<style lang="scss" scoped>
.title {
    margin: _vw(24) 0px _vw(10);
    font-size: _vw(20);
    border-left: _vw(10) solid #5278f8;
    padding: 0px 0px 0px _vw(10);
}

.已关注{
    line-height: _vw(22);
    border-radius: _vw(22);
    padding: 0px _vw(5);
    font-size: _vw(12);
}
.已关注{
    background: rgb(237, 242, 250);
}

.list{
    padding:0px _vw(10);
    >li{
        padding: _vw(10) 0px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
    }
    .logo{
        flex-shrink: 0;
        width: _vw(42);
        height: _vw(42);
        margin: 0px _vw(10) 0px 0px;
        background: #e0e0e0;
        border-radius: 100%;
        img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
    .content{
        width: 0;
        flex-grow: 1;
        div{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .text{
            font-size: _vw(14);
            color: rgb(130, 140, 155);
            margin: _vw(10) 0px 0px;
        }
    }
    .已关注{
        flex-shrink: 0;
    }
}
</style>
