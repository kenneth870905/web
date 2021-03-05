<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <div class="title1">
            {{router.meta.name}}
        </div>
        <el-button size="small" @click="退出()" type="warning" class="btn1">退出</el-button>
        <div class="头像">
            <img :src="user.headPortrait ? user.headPortrait : 'static/image/头像.png'" >
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters, mapMutations } from "vuex";
// import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
    components: {
        // Breadcrumb,
        Hamburger
    },
    computed: {
        ...mapGetters(["sidebar", "avatar"]),
        router(){
            return this.$route
        },
        ...mapState({
            user:x=>x.user2.user
        })
        
    },
    methods: {
        ...mapMutations({
            设置state:"user2/设置state"
        }),
        退出(){
            this.$axios.post('/huobi/public/index.php/user/goOut').then(x=>{
                this.设置state(['user',{}])
                this.设置state(['token',''])
                this.$router.push('/login')
            }).catch(err=>{
                this.设置state(['user',{}])
                this.设置state(['token',''])
                this.$router.push('/login')
            })
        },
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }
    },
    mounted() {
        
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
.title1{
    float: left;
    line-height: 50px;
    margin: 0px 0px 0px 15px;
}
.头像{
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin: 5px 10px 0px;
    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
}
.btn1{
    float:right;
    margin: 9px 10px 0px;
}
</style>
