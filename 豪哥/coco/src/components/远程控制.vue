<template>
    <div>
        <Modal v-model="show" :width="width" class="远程" @on-cancel="destroy" :mask-closable="false">
            <p slot="header" class="title">
                云机Id:{{equipment.deviceId}}
                <span>到期:{{equipment.dueTime}}</span>
            </p>
            <div class="video-box" ref="videoBox" :style="{height:height}"></div>
            <p slot="footer" class="footer">
                <span @click="操作(1)">主页</span>
                <span @click="操作(2)">返回</span>
                <span @click="操作(3)">旋转</span>
                <span @click="操作(4)">多任务</span>
                <span @click="截屏()">截屏</span>
                <span @click="音量(1)">音量+</span>
                <span @click="音量(0)">音量-</span>
            </p>
        </Modal>
        <Modal v-model="显示截图" title="截图详情" :width="300" class="截图" :mask-closable="false">
            <div class="img-box">
                <img :src="截图base64" alt="" srcset="">
            </div>
            <div slot="footer">
                <Button @click="显示截图=false">取消</Button>
                <Button type="primary" @click="下载图片()">下载图片</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    
    data() {
        return {
            equipment: {},
            show: false,
            width: 288,
            height: '512px',
            player: '',
            显示截图: false,
            截图base64:""
            // {ip:"",domainname:"",port:"",tokens:""}
        }
    },
    methods: {
        init(item) {
            this.equipment = item
            this.show = true
            this.$Spin.show();
            this.$axios.get(`/api/device/${this.equipment.id}/remote`, '').then(res => {
                if (res.data.code !== 0) {
                    this.错误(res.data.message)
                    this.$Spin.hide();
                    return
                }
                this.player = LongeneClient.createAppPlayer(this.$refs.videoBox, {
                    mediaType: "video",
                    orientation: "portrait",
                    keyboard: true
                })
                if (!this.player) { console.log('AppPlayer创建失败！'); }
                let tokens = res.data.data.tokens
                let domainname = res.data.data.ip
                // let ip = '218.108.52.59'
                let ip = res.data.data.ip
                let port = res.data.data.port
                this.player.open({
                    token: tokens,
                    domain: domainname,
                    ip: ip,
                    port: port
                });
                this.player.on('error', (error) => {
                    console.log('发生错误: ' + error.code + ' ' + error.message);
                    this.错误('发生错误: ' + error.code + ' ' + error.message)
                });
                this.$Spin.hide();
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$Spin.hide();
            })

        },
        destroy() {
            try {
                this.player.destroy()
            } catch (error) { }
            this.player = ''
            console.log('销毁')
        },
        操作(i) {
            // 主页
            if (i == 1) this.player.emitHome();
            // 操作
            if (i == 2) this.player.emitBack();
            //旋转屏幕
            if (i == 3) {
                var orientation = this.player.orientation;
                if (orientation == "portrait") {
                    this.width = 512
                    this.height = '288px'
                    this.$nextTick(() => {
                        this.player.updateInterface();
                        // 改变定位方向为竖屏   
                        this.player.orientation = "landscape";
                    })
                } else {
                    this.width = 288
                    this.height = '512px'
                    this.$nextTick(() => {
                        this.player.updateInterface();
                        // 改变定位方向为竖屏   
                        this.player.orientation = "portrait";
                    })
                }
            }
            // 多任务
            if (i == 4) {
                this.player.openRecent();
            }
        },
        截屏() {
            // let hostip = '10.0.92.248'
            // this.$axios.post("server!getsnapshot?hostip=" + hostip,'').then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.error(err); 
            // })
            this.$axios.get(`/api/device/${this.equipment.id}/snapshot`, '')
                .then(res => {
                    console.log(res)
                    if (res.data.code === 0) {
                        this.显示截图 = true
                        this.截图base64 =  'data:image/jpg;base64,' + res.data.data
                        // let img = new Image();
                        // img.src = 'data:image/jpg;base64,' + res.data.data
                        // let newWin = window.open("", "_blank");
                        // newWin.document.write(img.outerHTML);
                        // newWin.document.close()
                        // window.open(url)
                    } else {
                        this.错误(res.data.message)
                    }
                })
                .catch(err => {
                    this.错误('系统错误，稍后再试')
                })
        },
        下载图片() { //下载base64图片
            var content = this.截图base64
            var fileName = new Date().getTime()
            var base64ToBlob = function (code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;
                let uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {
                    type: contentType
                });
            };
            let aLink = document.createElement('a');
            let blob = base64ToBlob(content); //new Blob([content]);
            let evt = document.createEvent("htmlEvents");
            evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
        },
        音量(mode) {
            let id = this.equipment.id
            this.$axios.post("userWeb!clickvolumnbtn?id=" + id + "&volume=" + mode, '')
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
}
</script>

<style lang="scss" scoped>
.远程 {
    /deep/ .ivu-modal-body {
        padding: 0px;
    }
    /deep/ .ivu-modal-footer {
        padding: 12px 10px 12px 10px;
    }
}
.title {
    font-size: 12px;
    span {
        color: red;
    }
}
.video-box {
    height: 512px;
}
.footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    span {
        cursor: pointer;
        &:hover {
            color: red;
        }
    }
}
.截图 {
    .img-box {
        height: 300px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>