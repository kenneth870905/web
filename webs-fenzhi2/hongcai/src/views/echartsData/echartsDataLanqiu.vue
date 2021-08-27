<template>
    <div class="图标">
        <!-- {{Objdata}} -->
        <div class="Charts" ref="xiaomeng"  style="width:100%; height:100%; "></div>
    </div>
</template>
<script>
import echarts from "echarts"
export default {
    props: {
        Objdata:{
            default:()=>[]
        }
    },
    data() {
        return {
            是否登录: false,
            chart: "",
            x轴数据: [],
            y轴数据: [],
        }
    },
    mounted() {
        //  console.log(this.Objdata)
        var numlist = []
        var keylist = []
        for (let key in this.Objdata) {
              var daranum=parseInt(this.Objdata[key])
            numlist.push(daranum)
            var list = '近' + key
            keylist.push(list)
        }
        this.x轴数据 = numlist.reverse()
        // this.x轴数据 = [0,5,2,1]
        this.y轴数据 = keylist.reverse()
        // console.log('echartsData')

        this.echarts()
    },
    created() {
        // console.log(numlist)
        // console.log(keylist)
    },
    methods: {
        echarts() {
            var this_1 = this;
            let list=[];

            //初始化容器，拿到echarts实例
            var myChart = echarts.init(this.$refs.xiaomeng);
            var option = {
                 grid:{
                        left:10,
                        top:30,
                        bottom:30,
                        right:10
                    },
                  
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        // data: ['近7', '近5', '近3', '近2'],
                        data:this.y轴数据
                    },
                    yAxis: {
                        min:function(value){
                            return value.min-20
                        },
                        max:function(value){
                            return value.max+20
                        },
                        show:false,
                        // scale: true,
                        type: 'value',
                        axisLine: {       //y轴
                            show: false
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    series: [{
                       
                        data: this.x轴数据,
                        type: 'line',
                        label:{
                            show:true,
                            formatter:function(value){
                                var max = Math.max(...this_1.x轴数据)
                                if(max == value.value ){
                                     list.push(value.value)
                                    if(list.length>=2){
                                         return ""
                                    }
                                    return value.value +'%'
                                }else{
                                    return ""
                                }
                            }
                        },
                       
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: "red" },
                                    { offset: 0.5, color: "pink" },
                                    { offset: 1, color: "pink" }
                                ])
                            }
                        },
                    }]
                };
            myChart.setOption(option);
        },
    },
}
</script>

<style lang="scss" scoped>
 canvas{
         
            top:_vw(-20) !important;
        }
.图标 {
      width: 90% !important;
      margin:0px auto;
            height: 100%!important;
    .Charts{
          width: 100% !important;
            height: 100%!important;
        canvas{
            // width: 100% !important;
            // height: 100%!important;
            top:_vw(-20) !important;
        }
   
    }

   
}
</style>