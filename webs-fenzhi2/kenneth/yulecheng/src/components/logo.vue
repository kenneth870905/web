<template>
    <div id="drawing">

    </div>
</template>

<script>
import SVG from 'svg.js'
export default {
    name: '',
    data() {
        return {

        }
    },
    mounted() {
        // var draw = SVG('drawing').size(300, 60);
        var width=200
        var height=60
        var draw = SVG('drawing').size(width, height);
        var image = draw.image('image/logo/login.png').size(120 / width * 100*0.8 + '%', 39 / height * 100*0.8 + '%')
            image.move('100%', 10/height*100+'%')
            // image.move(105 / width*100+'%' , 10/height*100+'%')
        function 移动1() {
            image.animate(500).move( 105 / width*100+'%' , 10/height*100+'%' ).after(function (pos, eased) {
                setTimeout(() => {
                    移动2()
                }, 3000)
            }, false)
        }
        function 移动2() {
            image.move('100%', 10/height*100+'%')
            移动1()
        }
        移动1()

        var image2 = draw.image('image/logo/login2.png').move(45 / width * 100 + '%', 0).size(57 / width * 100 + '%', 36 / 60 * 100 + '%')
        // var 白条 = draw.rect(5 / width * 100 + '%', 40 / height * 100 + '%').fill('rgba(255,255,255,0.7)').move('37%', 10)
        // 白条.attr('transform', 'rotate(10)').attr('transform-origin', 'center')
        // 白条.animate(1000).move('100%', -30).loop(true, true)
        var image3 = draw.image('image/logo/login3.png').move(0, 35 / height *100+'%' ).size(104 / width * 100 + '%', 23 / height * 100 + '%')
        var image4 = draw.image('image/logo/login4.png').move(102/width*100+'%', 45/height*100+'%').size(139 / width * 100* 0.7 + '%', 22 / height * 100*0.7 + '%')

        // var 白条2 = draw.rect(5 / 300 * 100 + '%', 20 / 60 * 100 + '%').fill('rgba(255,255,255,0.8)').move('37%', '60%')
            // 白条2.animate(1500).move('100%', '60%').loop(true, true)
        var 闪光 = draw.image('image/logo/login5.png').size(53 / width * 100 + '%', 60 / height * 100 + '%').move(30/width*100+'%', '0%')
            // 闪光.attr('transform-origin',53 / width * 100 + '%' )
            // 闪光.animate(1000, '<>').transform({ scale: 0.2 }).loop(true, true);
            闪光.animate(1000, '<>').opacity(0.1).loop(true, true);
            
        var 闪光2 = draw.image('image/logo/login5.png').size(53 / width * 100 + '%', 60 / height * 100 + '%').move('35%', '-3%')
            // 闪光2.animate(3000, '<>').transform({ scale: 0.2 }).loop(true, true);
            闪光2.animate(3000, '<>').opacity(0.2).loop(true, true);

    }
}
</script>

<style lang="scss" scoped>
#drawing {
    width: 100%;
    height: 100%;
    padding: 5px 0px ;
    box-sizing: border-box;
    /deep/ svg{
        // width: 100%;
        width: auto;
        height: 100%;
        
    }
}

</style>
