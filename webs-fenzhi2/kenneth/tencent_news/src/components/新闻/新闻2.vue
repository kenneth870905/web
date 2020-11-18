<template>
    <lazy-component class="style2">
    <!-- <div class="style2"> -->
        <!-- <div class="content_1"> -->
            <div class="title">{{obj.title}}</div>
        <!-- </div> -->
        <div class="img_box">
            <div v-for="(item, index) in imgList" :key="index">
                <img v-lazy="item">
            </div>
        </div>
        <div class="type">
            <span class="zd" v-show="obj.recommend">置顶</span>
            <span class="ly">{{obj.sourceName}}</span>
            <span class="time">{{obj.time | 时间差}}</span>
        </div>
    <!-- </div> -->
    </lazy-component>
</template>

<script>
export default {
    name:"",
    props:{
        obj:{
            default:()=>{}
        },
    },
    data() {
        return {
            
        }
    },
    filters:{
        时间差(time){
            if(!time){
                return ''
            }
            var diff=new Date().getTime() - new Date(time).getTime();//.getTime();//时间差的毫秒数
            //计算出相差天数
            var days=Math.floor(diff/(24*3600*1000));
            //计算出小时数
            var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000));
            //计算相差分钟数
            var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000));
            //计算相差秒数
            var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000);
            var returnStr = seconds + "秒前";
            if(minutes>0) {
                returnStr = minutes + "分钟前";//+ returnStr;
            }
            if(hours>0) {
                returnStr = hours + "小时前";// + returnStr;
            }
            if(days>0) {
                returnStr = days + "天前" ;//+ returnStr;
            }
            return returnStr;
            
        }
    },
    computed: {
        imgList(){
            return this.obj.cover.split(',') 
        }
    },
}
</script>

<style lang="scss" scoped>
.style2{
    padding: _vw(10) _vw(15);
    border-bottom: 1px solid #eeeeee;
    .title{
        font-size: _vw(18);
    }
    .type{
        font-size: _vw(12);
        color: rgb(130, 140, 155);
        span{
            margin: 0px _vw(10) 0px 0px;
        }
        .zd{
            color: rgb(238, 84, 74);   
        }
    }
    .img_box{
        height: _vw(70);
        display: flex;
        margin: _vw(5) 0px;
        >div{
            flex: 1;
            padding: 0px _vw(3);
        }
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>