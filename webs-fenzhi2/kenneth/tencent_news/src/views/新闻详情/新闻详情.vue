<template>
    <div class="新闻详情">
        <van-nav-bar left-text="返回" left-arrow @click-left="$back"></van-nav-bar>
        <div class="title_1">{{news.title}}</div>
        <div class="title_2">
            <div class="text_1">
                <span @click="查看来源()" class="来源">
                    {{news.sourceObj.name}}
                </span>
                <span>{{news.time | f_t}}</span>
            </div>

            <div class="关注" v-show="!关注" v-if="news.sourceObj.url" @click="设置关注()">
                <van-icon name="plus" />
                关注
            </div>
            <div class="已关注" v-show="关注" v-if="news.sourceObj.url" @click="设置关注()">
                <van-icon name="success" />
                已关注
            </div>
            <div class="搜藏" @click="添加删除()">
                <van-icon v-show="!收藏" name="star-o" />
                <van-icon v-show="收藏" name="star" />
            </div>
        </div>
        <div v-html="news.content" :class="{展开:展开全文}" class="content"></div>
        <div class="展开提示" @click="展开全文=true" v-show="!展开全文">
            <span>展开全文</span>
            <van-icon name="arrow-down" />
        </div>
        <div class="title_3">
            热门评论
        </div>

        <pl v-for="(item, index) in 热门.list" :key="index" :obj='item' />
        <div v-if="热门.list.length==0" class="暂无评论">暂无评论</div>
        <div class="title_3">
            最新评论
        </div>
        <van-list :offset="50" v-model="全部.loading" :finished="!this.全部.loading && 全部.total!=-1 && 全部.list.length>=全部.total" finished-text="没有更多了" @load="onLoad">
            <pl v-for="(item, index) in 全部.list" :key="index" :obj="item" />
        </van-list>

        <div class="footer 输入框">
            <van-field v-model="评论内容" maxlength="500" type="textarea" placeholder="请输入留言" rows="1" autosize />
            <van-button @click="添加评论()" slot="button" size="small" type="info" plain>发送</van-button>
        </div>

    </div>
</template>

<script>
import moment from "moment";
import pl from '@/components/评论/新闻评论.vue';
export default {
    name: "",
    components: {
        pl
    },
    provide() {
        return {
            显示回复框: () => {
                console.log(123456)
            }
        }
    },
    data() {
        return {
            评论内容: "",
            展开全文: false,
            news: {
                sourceObj: {}
            },
            收藏: false,
            关注: false,
            热门: {
                query: {
                    pageSize: 10,
                    pageIndex: 0,
                    newId: '',
                    parentId: "",
                    order: 'huiFuCount'
                },
                list: [],
                total:-1
            },
            全部: {
                query: {
                    pageSize: 10,
                    pageIndex: 0,
                    newId: '',
                    parentId: "",
                    order: ''
                },
                list: [],
                loading: false,
                total: -1
            }
        }
    },
    filters: {
        f_t(t) {
            if (!t) return
            return moment(t).format('MM-D H:mm');
        }
    },
    methods: {
        查看来源() {
            if (this.news.url) {
                this.$router.push(`/cbs?id=${this.news.sourceObj.id}`)
            }
        },
        async 获取新闻详情() {
            this.$toast.loading({ mask: true, duration: 0 })
            let x = await this.$axios.post('/news/getNewsById', { 'id': this.$route.query.id });
            this.$toast.clear();
            this.news = x.data;
            this.查询是否关注()
        },
        查询收藏() {
            return this.$axios.post('/ShouCang/query', { newsId: this.$route.query.id }).then(x => {
                this.收藏 = x.data.code == 1
            }).catch(err => { })
        },
        async 添加删除() {
            this.$toast.loading({ mask: true, duration: 0 })
            try {
                var r = await this.$axios.post('/ShouCang/index', { newsId: this.$route.query.id })
            } catch (error) {
                this.$toast.clear();
                this.$toast('系统错误')
                return
            }
            this.$toast.clear();
            if (r.data.code == 1) {
                await this.查询收藏();
            } else {
                this.$toast(r.data.message)
            }
        },
        async 查询是否关注() {
            this.$toast.loading({ mask: true, duration: 0 })
            try {
                var r = await this.$axios.post('/GuanZhu/queryOne', { 'sourceId': this.news.source })
            } catch (error) {
                this.$toast.clear();
                return
            }
            this.关注 = r.data.code == 1
            this.$toast.clear();
        },
        设置关注() {
            this.$toast.loading({ mask: true, duration: 0 })
            this.$axios.post('/GuanZhu/index', { 'sourceId': this.news.source }).then(x => {
                this.查询是否关注()
            }).catch(err => {
                this.$toast('系统错误稍后再试')
                this.$toast.clear();
            })
        },
        查询热门评论() {
            this.热门.query.newId = this.$route.query.id
            this.$axios.post('/PingLun/queryAll', this.热门.query).then(x => {
                this.热门.list = x.data.data;
                this.热门.total = x.data.total;
            }).catch(err => { })
        },
        添加评论() {
            var kong = /^\s+$/
            if (!this.评论内容 || kong.test(this.评论内容)) {
                this.$toast('请输入内容');
                return
            }
            let obj = {
                newId: this.$route.query.id,
                parentId: "",
                text: this.评论内容,
                revert: ""   //回复了哪条评论
            }
            this.$toast.loading({ mask: true, duration: 0 })
            this.$axios.post('/PingLun/add', obj).then(x => {
                this.$toast.clear();
                if (x.data.code == 1) {
                    this.$toast('评论成功')
                    this.评论内容 = '';
                    // this.通过id查询评论(x.data.message);
                    this.全部.list.unshift(x.data.message)
                    this.全部.total++
                } else {
                    this.$toast('评论失败');
                }
            }).catch(err => { });
        },
        // 通过id查询评论(id) {
        //     this.$axios.post('/PingLun/queryById', { id: id }).then(x => {
        //         console.log(x)
        //         this.全部.list.unshift(x.data)
        //     }).catch(err => {
        //         console.log(err)
        //     })
        // },
        onLoad(){
            console.log('获取评论');
            this.获取全部评论()
        },
        获取全部评论(){
            this.全部.query.newId = this.$route.query.id
            this.$axios.post('/PingLun/queryAll', this.全部.query).then(x => {
                if(x.data.code){
                    this.total = 0
                }else{
                    this.全部.list = [...this.全部.list , ...x.data.data];
                    this.全部.total = x.data.total;
                }
                this.全部.loading = false
            }).catch(err => { })
        },
    },
    mounted() {
        this.获取新闻详情();
        this.查询收藏();
        this.查询热门评论()
    },
}
</script>

<style lang="scss" scoped>
.新闻详情 {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-bottom: _vw(60);
}
.title_1 {
    font-size: _vw(22);
    padding: _vw(15);
}
.title_2 {
    display: flex;
    align-items: center;
    padding: 0px _vw(15);
    font-size: _vw(12);
    .text_1 {
        flex: 1;
    }
    .来源 {
        color: rgb(76, 126, 255);
        margin: 0px _vw(10) 0px 0px;
    }
    .time {
        color: rgb(130, 140, 155);
    }
    .搜藏 {
        text-align: center;
        font-size: _vw(16);
        .van-icon-star {
            color: #537bff;
        }
    }
    .关注,
    .已关注 {
        line-height: _vw(22);
        border-radius: _vw(22);
        padding: 0px _vw(5);
        margin: 0px _vw(10) 0px 0px;
    }
    .关注 {
        background: rgb(76, 126, 255);
        color: #ffffff;
    }
    .已关注 {
        background: rgb(237, 242, 250);
    }
}
.content {
    padding: _vw(15);
    border-bottom: 10px solid #f7f8fa;
    height: 60%;
    overflow: hidden;
    &.展开 {
        height: auto;
        overflow: auto;
    }
    /deep/ img {
        max-width: 100%;
    }
    /deep/ .sizer {
        display: none;
    }
}
.展开提示 {
    text-align: center;
    color: rgb(80, 118, 245);
    background: linear-gradient(0deg, #ffffff, #ffffff9c);
    margin-top: -30px;
    padding: 20px 0px 0px;
    position: relative;
    z-index: 1;
}

.title_3 {
    font-size: _vw(20);
    font-weight: bold;
    margin: _vw(25) 0px _vw(10);
    border-left: 10px solid #4c7eff;
    padding: 0px 0px 0px _vw(10);
}
.暂无评论 {
    padding: _vw(20) 0px;
    font-size: _vw(14);
    text-align: center;
}

.footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    padding: _vw(5) _vw(10);
    border-top: 1px solid #cccccc;
    .van-cell {
        background: #edf2fa;
        margin: 0px _vw(10) 0px 0px;
    }
    .van-button {
        height: auto;
        line-height: auto;
    }
    .回复 {
        width: 50px;
        flex-shrink: 0;
        position: relative;
        text-align: center;
        .number {
            position: absolute;
            left: 50%;
            top: -5px;
            color: #ffffff;
            background: #537bff;
            font-size: _vw(12);
            line-height: _vw(14);
            border-radius: _vw(14);
            padding: 0px _vw(2);
        }
        .van-icon {
            font-size: _vw(26);
        }
    }
}
</style>
