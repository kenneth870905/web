<template>
    <div class="图标">
        <div class="Charts" ref="xiaomeng"  style="width:100%; height:100%; top=-20px;"></div>
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
          alert(11)
        // console.log(numlist)
        // console.log(keylist)
    },
    methods: {
        echarts() {
            var this_1 = this;
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
                                alert(11)

                                 console.log(value)
                                var max = Math.max(...this_1.x轴数据)
                                if(max == value.value ){
                                 console.log('1111')

                                    return value.value  + "%"
                                }else{
                                    return ''
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
.图标 {
    // position: absolute;
    // left: 0px;
    // top:0px;
    // width: 100%;
    // height: 100%;
    // background:#ffffff;
    // overflow-y:auto;
    // padding-bottom:_vw(44);
    // box-sizing: border-box;

    .Charts_top {
        width: _vw(100);
        height: _vw(77);
    }
}
</style>