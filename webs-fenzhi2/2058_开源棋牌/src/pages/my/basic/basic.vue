<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">个人信息</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="mui-table-view list">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right item" @click="$router.push('/xiugaitx')">
                        <i class="fa fa-user-circle-o"></i>
                        <label style="margin-left:10px;">头像</label>
                        <div class="内容" :class="{'提示':!Person.ImgId}">
                            <span v-if="!Person.ImgId">未设置</span>
                            <img class="头像" v-if="Person.ImgId" :src="config.img_url+'image/touxiang/'+Person.ImgId" alt="" srcset="">
                        </div>
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right item" @click="$router.push('/xiugainame')">
                        <i class="fa fa-list-ul"></i>
                        <label style="margin-left:10px;">昵称</label>
                        <div class="内容" :class="{'提示':!Person.Nickname}">
                            {{Person.Nickname ? Person.Nickname :'未设置'}}
                        </div>
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right item" @click="$router.push('/xiugaiqq')">
                        <i class="fa fa-qq"></i>
                        <label style="margin-left:10px;">QQ</label>
                        <div class="内容" :class="{'提示':!Person.QQ}">
                            {{Person.QQ ? Person.QQ : '未设置'}}
                        </div>
                    </a>
                </li>
            </ul>
        
        </div>
    </div>
</template>

<script>
import { api_修改qq } from "@/api/个人资料.js";
// import btn from '@/components/btn.vue'
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name:"",
    components:{
        // btn
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            config:'config',
            Person:x=>x.个人资料.Person 
        })
    },
    methods: {
        ...mapMutations({
            // 加载中:"加载中"
        }),
        ...mapActions({
            getPersonInfo:'个人资料/getPersonInfo'
        }),
        async 初始化(){
            // this.加载中('true')
            await this.getPersonInfo()
            // this.加载中(false)
        }
    },
    mounted() {
        this.初始化();
    },
}
</script>

<style lang="scss" scoped>
.mui-content>.mui-table-view:first-child{
    margin-top: 0;
}
.list {
    font-size: _vw(14);
    .item {
        display: flex;
        align-items: center;
        i{
            font-size: _vw(24);
            margin: 0px _vw(10) 0px 0px;
            flex-shrink: 0;
        }
        label {
            width: _vw(70);
            flex-shrink: 0;
        }
        .内容{
            flex-grow: 1;
            text-align: right;
            padding-right: 20px;
            .头像{
                width: 30px;
                height: 30px;
                object-fit: cover;
                border-radius: 100%;
            }
        }
        .提示 {
            color: #9c9c9c;
        }
        input {
            height: 100%;
            margin: 0px;
            padding: 0px;
            border: none;
        }
        input::-webkit-input-placeholder {
            color: #9c9c9c;
        }
        input::-moz-placeholder {
            color: #9c9c9c;
        }
        input::-moz-placeholder {
            color: #9c9c9c;
        }
        input::-ms-input-placeholder {
            color: #9c9c9c;
        }
    }
}

.icon头像{
    color: #13a2e8;
}
.icon昵称{
    color: #0d46ef;
}
.iconQQ{
    color: red;
}
.提示1 {
    padding: _vw(20) _vw(15);
    font-size: _vw(14);
    color: #e45252;
}
</style>