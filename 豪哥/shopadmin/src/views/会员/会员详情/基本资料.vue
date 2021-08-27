<template>
    <div class="基本信息 item2">
        <div class="title">基本信息</div>
        <div class="img_1">
            <img :src="user.avatarUrl" alt="" srcset="">
        </div>
        <div class="item3">id：{{userid}}</div>
        <div class="item3">昵称：{{user.nickName}}</div>
        
        <div class="item3">
            <span>等级：</span>
            <span v-show="!修改等级">{{user.level}}</span>
            <input v-show="修改等级" v-model="新等级" placeholder="" />
            <span v-show="修改等级"  @click="保存等级()" class="保存">保存</span>
            <span @click="点击修改等级()" class="修改">{{修改等级 ? '取消' : "修改"}}</span>
        </div>
        <div class="item3">
            <span>积分：</span>
            <span v-show="!修改积分">{{user.credit}}</span>
            <input v-show="修改积分" v-model="新积分" placeholder="" />
            <span v-show="修改积分" @click="保存积分()" class="保存">保存</span>
            <span @click="点击修改积分()" class="修改">{{修改积分 ? '取消' : "修改"}}</span>
        </div>
        <div class="item3">佣金：{{user.kickback}}</div>
        <div class="item3">创建：{{user.createdAt}}</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "",
    data() {
        return {
            userid: "",
            user: {},
            修改积分: false,
            新积分: '',
            修改等级: false,
            新等级: ''
        }
    },
    computed: {
        ...mapState({
            loginInfo: 'loginInfo'
        })
    },
    methods: {
        goBack() {
            history.back()
        },
        获取基本信息() {
            this.$axios.get(`/api/user/${this.userid}`).then(res => {
                if (res.code === 0)
                    this.user = res.data
            })
        },
        点击修改积分() {
            this.修改积分 = !this.修改积分
            this.新积分 = this.user.credit
        },
        点击修改等级() {
            if (!this.修改等级) {
                this.修改等级 = true
                this.新等级 = this.user.level
            } else {
                this.修改等级 = false
            }
        },
        保存积分() {
            this.修改积分 = false
            this.$axios.post(`/api/user/${this.userid}/credit`, { "credit": parseInt(this.新积分) }).then(res => {
                if (res.code === 0) {
                    this.$message({ showClose: true, message: '保存成功', type: 'success' });
                    this.获取基本信息()
                }else{
                    this.$message({ showClose: true, message: res.message, type: 'error' });
                }
            }).catch(err => {
                this.$message({ showClose: true, message: '系统错误，请联系管理员', type: 'error' });
            })
        },
        保存等级(){
            this.修改等级 = false
            var user = Object.assign({},this.user)
            delete user.createdAt
            delete user.deletedAt
            delete user.updatedAt
                user.level = parseInt(this.新等级) 
            this.$axios.put(`/api/user/${this.userid}`,user)
            .then(res => {
                if (res.code === 0) {
                    this.$message({ showClose: true, message: '保存成功', type: 'success' });
                    this.获取基本信息()
                }else{
                    this.$message({ showClose: true, message: res.message, type: 'error' });
                }
            })
            .catch(err => {
                this.$message({ showClose: true, message: '系统错误，请联系管理员', type: 'error' });
            })
        }
    },
    mounted() {
        this.userid = this.$route.query.id
        this.获取基本信息()
    },
}
</script>

<style lang="scss" scoped>
.title {
    padding-bottom: 5px;
    border-bottom: 1px solid #d0d0d0;
    margin: 0px 0px 10px 0px;
}
.基本信息 {
    box-shadow: 0px 0px 5px 0px #737373;
    padding: 10px;
    border-radius:5px;
    font-size: 14px;
    .img_1 {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 1px solid #eeeeee;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .item3 {
        margin: 10px 0px;
        display: flex;
    }
    .修改 {
        color: #66b1ff;
        margin: 0px 0px 0px 15px;
        cursor: pointer;
    }
    .保存 {
        color: red;
        margin: 0px 0px 0px 15px;
        cursor: pointer;
    }
    input {
        border: none;
        border-bottom: 1px solid #000;
        padding: 0px 5px;
        color: red;
        &:focus {
            outline: none;
        }
    }
}
.表格 {
    min-height: 50px;
}
</style>

