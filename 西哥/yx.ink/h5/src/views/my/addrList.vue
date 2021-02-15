<template>
    <div class="addList">
        <van-nav-bar fixed title="收货地址" left-arrow @click-left="$back()"></van-nav-bar>

        <div class="address-list">
            <div class="add-btn" @click="$router.push('/address')">
                <div class="address-list-add-text">
                    <van-icon name="plus" />添加收货地址
                </div>
            </div>
            <ul class="address-list-body">
                <li v-for="item in list" class="address-item">
                    <van-icon name="location" class="left-icon"/>
                    <div class="info" @click="选中地址(item)">
                        <div class="user">{{item.name}} <van-tag v-if="item.type==1" type="primary">默认地址</van-tag></div>
                        <div class="phone">{{item.contact}}</div>
                        <div class="detail">
                            <span>{{item.province}}</span>
                            {{item.address}}
                        </div>
                    </div>
                    <div class="action">
                        <span @click="$router.push('/address?id='+item.id)">编辑</span>
                    </div>
                </li>
            </ul>
        </div>
        
        <van-empty description="空空如也" v-if="!loading && list.length==0"/>

    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            list:[],
            loading:true
        }
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        查询地址(){
            this.$toast.loading({ message: '加载中...', forbidClick: true});
            this.$axios.post('/Address/getAddress','').then(res => {
                this.list = res.data
                this.$toast.clear();
                this.loading=false
            }).catch(err => {
                this.loading=false
                this.$toast.clear();
            })
        },
        选中地址(item){
            if(this.$route.query.back){
                this.setValue(['选中收货地址',item])
                history.back()
            }
        }
    },
    mounted() {
        this.查询地址()
    },
}
</script>

<style lang="scss" scoped>
.addList {
    padding: 46px 0px 0px 0px;
}
.address-list {
    background: #fff;
}
.add-btn {
    margin: 8px 12px 0px;
    padding: 16px 20px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    .address-list-add-text {
        height: 72px;
        line-height: 72px;
        text-align: center;
        font-size: 16px;
        background: rgba(0, 148, 182, 0.02);
        border: 1px dashed #0094b6;
        border-radius: 6px;
        color: #0094b6;
        font-weight: bold;
    }
}
.address-item{
    border-bottom: 1px solid #e0e0e0;
    margin: 0 12px;
    padding: 20px 0;
    display: flex;
    .left-icon{
        color: #0094b6;
        flex-shrink: 0;
    }
    .info{
        padding: 0px 5px;
        flex: 1;
        .user{
            color: #333;
            font-size: 14px;
            margin-bottom: 6px;
        }
        .phone{
            color: #333;
            font-size: 14px;
            margin-bottom: 6px;
        }
        .detail{
            margin-top: 2px;
            line-height: 18px;
            font-size: 14px;
            word-break:break-all;
            span{
                margin: 0px 10px 0px 0px;
                color: rgba($color: #000000, $alpha: 0.6);
            }
        }
    }
    .action{
        font-size: 12px;
        color: #0094b6;
        flex-shrink: 0;
    }
}

</style>