<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">信息公告</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div>
                <div class="mui-card" v-for="(item,index) in list" :key="index" @click="getContent(item)">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="标题">
                                <i class="icon iconfont icon-mingxi"></i>
                                <span>{{item.Title}}</span>
                            </div>
                            <div class="时间">{{item.Createtime}}</div>
                        </div>
                    </div>
                    <div class="mui-card-content-inner 内容" v-if="item.Content && item.Show" >
                        <div v-if="!item.Content.Img" v-html="item.Content.Content"></div>
                        <div v-else class="img_1">
                            <img :src="item.Content.Img" alt="" srcset="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { api_获取公告列表, api_公告详情 } from "@/api/公告接口.js";
import { mapMutations } from 'vuex';

export default {
    name: "",
    data() {
        return {
            list: []
        }
    },
    methods: {
        ...mapMutations({
            加载中: "加载中"
        }),
        getContent(item) {
            if (item.Show) {
                item.Show = !item.Show;
            } else {
                if (item.Content) {
                    item.Show = true;
                } else {
                    this.加载中(true)
                    api_公告详情({ Id: item.Id }).then(x => {
                        this.$set(item, 'Content', x.data);
                        this.$set(item, 'Show', true);
                        this.加载中(false)
                    }).catch(err => {
                        this.加载中(false)
                    })
                }
            }
        }
    },
    mounted() {
        api_获取公告列表().then(x => {
            this.list = x.data;
        }).catch(er => { })

    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ffffff;

}
.mui-card-content-inner {
    padding: _vw(10);
    .标题{
        font-size: _vw(16);
        color: #333;
        line-height: _vw(30);
        display: flex;
        align-items: center;
        i{
            margin: 0px 5px 0px 0px;
        }
    }
    .时间{
        color: #999;
        font-size: _vw(14);
    }
}
.mui-card {
    margin: _vw(5);
    box-shadow:-1px 2px 10px rgba(0,0,0,.1);
}

.内容{
    border-top: 1px solid #eeeeee;
    .img_1{
        img{
            width: 100%;
        }
    }
}
</style>
