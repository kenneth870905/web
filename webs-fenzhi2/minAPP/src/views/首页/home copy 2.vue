<template>
    <div class="彩票">
        <div class="固定">
            <div class="title" @click="全部()">全部</div>
            <div class="content_t" v-if="全部内容">全部内容</div>
        </div>
        <van-tabs class="table"   @click="onClick">
            <van-tab v-for="index in 8" :title="'标签 ' + index" >
              <!-- 内容 {{ index }} -->
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return{
            动画:"",
            全部内容:false,
        }
    },
    created(){
    },
    filters:{
      
    },
    computed: {
    },
    methods: {
     全部(){
      this.全部内容=true
     },
     onClick(name, title) {
        console.log(name,title)
     }
     
    },
    mounted() {
       
    },
    watch: {  
     
    },

}
</script>

<style lang="scss" scoped>

.彩票{
    height: 100%;
    background: #ffffff;
    overflow: auto;
    position: absolute;
    width: 100%;
    left:0px;
    top:0px;
  .固定{
        // position: relative;
           position: absolute;
        top:0px; 
        width:100% ;
        // height: _vw(44);
        .title{
            width: _vw(64);
        height: _vw(44);

            background-color: green;
        }
        .content_t{
            width: 100%;
            height: 100%;

            // background: red;
        }
    }
    .table{
        margin-left: _vw(64);
    }
.类型选择{
    width: 100%;
    // background:yellow  !important;
    &.定位{
        position: fixed;
        top:0px;
    }
    
    // position: sticky;
    // top: -1px;
    height: _vw(40);
    display: flex;;
    @include bgcolor;
    font-size: _vw(15);
    color: hsla(0,0%,100%,.85);
    >div:nth-child(1){
        width: _vw(95);
        flex-shrink: 0;
    }
    >div:nth-child(2){
        height: 100%;
        width: 0;
        flex-grow: 1;
    }
    .全部{
        box-shadow: 2px 0px 3px rgba(245, 240, 240, 0.925);

        // box-shadow: 1px 0 3px rgba(0,0,0,.16);
    }
    .item{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        span{
            position: relative;
        }
    }
    .active{
        color: #ffffff;
        font-weight: bold;
        &::after{
            content: "";
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 5px;
            height: 2px;
            background-color: #fff;
            width: 30%;
            margin: auto;
        }
    }
}

.list{
    display: flex !important;
    flex-wrap: wrap !important;
    background: #fff;
    width: 100%;
   li{
        width: 50%;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        padding: _vw(15) 0px _vw(15) _vw(20); 
        box-sizing: border-box;
        .img_box{
            width: _vw(52);
            height: _vw(52);
            flex-shrink: 0;
            margin: 0px _vw(6) 0px 0px;
            &.动画1{
                img{
                    transform: rotateY(360deg);
                }
            }
            img{
                transition: all 0.5s;
                width: 100%;
                height: 100%;
            }
        }
        .内容{
            width: 0;
            flex-grow: 1
        }
        .标题{
            color: #333;
            font-size: _vw(14);
        }
        .开奖间隔{
            color: #999;
            margin: _vw(3) 0px;
            font-size: _vw(12);
        }
        .倒计时{
            font-size: _vw(12);
            line-height: _vw(18);
            @include textcolor;
            span{
                display: inline-block;
            }
            >span:nth-child(2n-1){
                width: _vw(18);
                height: _vw(18);
                border-radius: 4px;
                text-align: center;
                @include bgcolor;
                color: #fff;
            }
            >span:nth-child(2){
                margin: 0px _vw(2);
            }
        }
    }
    >li:nth-child(2n-1){
        border-right: 1px solid #f2f2f2;
    }
}
}

</style>
