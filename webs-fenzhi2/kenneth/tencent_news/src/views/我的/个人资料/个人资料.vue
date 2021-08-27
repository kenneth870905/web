<template>
    <div>
        <van-nav-bar class="蓝色" title="个人资料" left-arrow @click-left="$back"></van-nav-bar>
        <ul class="list">
            <li @click="修改头像.show=true">
                <label>头像：</label>
                <div class="头像">
                    <van-icon name="manager" v-if="!userinfo.photoBlobUrl" />
                    <img :src="`http://10.10.27.150/tp6test/public/user/getPhoto?token=${token}&v=${n}`" alt="">
                </div>
                <van-icon class="icon_1" name="edit" />
            </li>
            <li>
                <label>账号：</label>
                <div>{{userinfo.userName}}</div>
            </li>
            <li @click="点击昵称()">
                <label>昵称：</label>
                <!-- <div :class="{'灰色':!userinfo.nickname}">{{userinfo.nickname ? userinfo.nickname : '昵称未设置'}}</div> -->
                <div class="昵称">
                    <div :class="{'灰色':!userinfo.nickname}">{{userinfo.nickname ? userinfo.nickname : '昵称未设置'}}</div>
                    <van-icon class="icon_1" name="edit" />
                </div>
            </li>
        </ul>

        <van-popup class="昵称修改" v-model="修改昵称.show" round :close-on-click-overlay="false" @opened="opened">
            <div class="title">昵称修改</div>
            <van-field ref="input_1" input-align="center" v-model="修改昵称.nickname" placeholder="请输入昵称" />
            <div class="btn_list">
                <span @click="修改昵称.show=false">取消</span>
                <span @click="保存nickname()">确定</span>
            </div>
        </van-popup>

        <van-popup class="昵称头像" v-model="修改头像.show" round :close-on-click-overlay="false" @opened="opened_1">
            <div class="img_1" ref="img_1">
                <img :src="修改头像.img_base64" alt="" srcset="">
            </div>
            <van-button class="bolck" plain size="small" @click="更换图片()" type="primary">选择图片</van-button>
            <div class="btn_1">
                <van-button @click="修改头像.show=false" plain size="small" type="default">取消</van-button>
                <van-button @click="确定()" plain size="small" type="warning">确定</van-button>
            </div>
        </van-popup>

        <input type="file" ref="file" accept="image/*" @change="change($event)">

    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css'
import qs from 'qs'
export default {
    name: "",
    data() {
        return {
            修改昵称: {
                show: false,
                nickname: ""
            },
            修改头像: {
                show: false,
                img_base64: "",
                cropper: "",
                blob: ""
            },
            n: new Date()
        }
    },
    computed: {
        ...mapState({
            userinfo: x => x.user.userinfo,
            token: x => x.user.token
        }),
        userPhoto() {
            if (this.userinfo.photo) {
                return this.userinfo.photo
            } else if (this.userinfo.photoBlob) {
                try {
                    var str = URL.createObjectURL(this.userinfo.photoBlob);
                    return str
                } catch (error) {
                    return ''
                }
            } else {
                return ''
            }
        },
    },
    methods: {
        ...mapActions({
            获取user: "user/获取user"
        }),
        点击昵称() {
            this.修改昵称.nickname = this.userinfo.nickname;
            this.修改昵称.show = true;
        },
        opened() {
            this.$nextTick(this.$refs.input_1.focus())
        },
        保存nickname() {
            this.$toast.loading({ mask: true, duration: 0 })
            this.$axios.post('/User/Update', { nickname: this.修改昵称.nickname }).then(x => {
                if (x.data.code == 1) {
                    this.$toast('修改成功')
                    this.修改昵称.show = false;
                    this.获取user()
                } else {
                    this.$toast(x.data.message)
                }
            }).catch(err => {
                console.log(err)
                this.$toast('系统错误稍后再试')
            })
        },
        opened_1() {
            this.$toast.loading({ mask: true, duration: 0 })
            if (!this.修改头像.cropper) {
                this.修改头像.cropper = new Cropper(this.$refs.img_1.querySelector('.img_1>img'), {
                    viewMode: 2,
                    aspectRatio: 1 / 1,
                    autoCrop: true,
                    dragMode: 'move',
                    // guides:false,     //在裁剪框上方显示虚线
                    // center:false,    //在裁剪框上方显示中心指示器。
                    // highlight:false,    //在裁剪框上方显示白色模式（突出显示裁剪框）
                    // background:false,   //显示容器的网格背景。
                })
            }
            this.更换图片()
            this.$toast.clear();
        },
        更换图片() {
            this.$refs.file.value = ''
            this.$refs.file.click();
        },
        async change(e) {
            var this_1 = this;
            let file = e.target.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(file);
            await new Promise((resolve, reject) => {
                reader.onload = (result) => {
                    this.修改头像.img_base64 = result.target.result;
                    resolve()
                }
            });
            this.initCropper()
        },
        initCropper() {
            this.修改头像.cropper.replace(this.修改头像.img_base64)
        },
        async 确定() {
            if (!this.修改头像.img_base64) {
                this.$toast('请选择图片');
                return
            }
            await new Promise((resolve, reject) => {
                this.修改头像.cropper.getCroppedCanvas().toBlob((blob) => {
                    this.修改头像.blob = blob;
                    var str = URL.createObjectURL(blob);
                    // this.修改头像.blob = str;
                    // this.cropper.destroy()
                    this.修改头像.show = false
                    resolve()
                })
            })
            this.$toast.loading({ mask: true, duration: 0 })
            let f = new FormData()
            f.append('blob', this.修改头像.blob)
            this.$axios.post('/User/Update', f, { headers: { 'Content-Type': 'multipart/form-data' } }).then(x => {
                if (x.data.code == 1) {
                    this.$toast('修改成功')
                    this.n = new Date();
                    this.修改头像.show = false;
                    this.获取user()
                } else {
                    this.$toast(x.data.message)
                }
            }).catch(err => {
                this.$toast('系统错误稍后再试')
            })
        }
    },
    mounted() {
        // this.cropper = new Cropper(this.$refs.img_1.querySelector('.img_1>img'),{
        //     viewMode: 2,    
        //     aspectRatio: 1/1,
        //     autoCrop:true
        // })
    },
    deactivated() {
        
    },
}
</script>

<style lang="scss" scoped>
input[type='file']{
    display: none;
}
.list {
    padding: 0px _vw(10);
    li {
        padding: _vw(10) 0px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        align-items: center;
    }
    label {
        width: _vw(50);
        flex-shrink: 0;
    }
    .icon_1 {
        margin: 0px 0px 0px _vw(10);
        color: red;
    }
    .头像 {
        width: _vw(60);
        height: _vw(60);
        border-radius: 100%;
        background: #cccccc;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: _vw(40);
            color: #ffffff;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .昵称 {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .灰色 {
        color: #9c9c9c;
    }
}

.昵称修改 {
    width: 80%;
    text-align: center;
    .title {
        line-height: _vw(44);
        // border-bottom: 1px solid #eeeeee;
    }
    .btn_list {
        display: flex;
        line-height: _vw(44);
        span {
            width: 50%;
        }
        span:nth-child(2) {
            border-left: 1px solid #eeeeee;
            color: #3497fb;
        }
    }
}

.昵称头像 {
    // width: 80%;
    padding: _vw(15) _vw(15);
    button {
        margin: _vw(10) 0px 0px;
    }
    .bolck {
        width: 100%;
    }
    .btn_1 {
        display: flex;
        justify-content: space-between;
        button {
            width: 48%;
        }
    }
    /deep/ .cropper-view-box {
        border-radius: 100%;
    }
}
.img_1 {
    width: _vw(250);
    height: _vw(250);
    margin: auto;
    background: #eeeeee;
    > img {
        width: 100%;
        height: 100%;
    }
}
</style>
