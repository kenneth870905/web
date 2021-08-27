<template>
<div class="img_box"  @click="bigImg">
   
   　　　　 <div class="img">
   　　　　　　 <img :src="imgSrc">
   　　　　 </div>
</div>
  
</template>
<script>
export default {
    props: ['imgSrc'],//接受图片地址
    methods: {
        bigImg() {
            // 发送事件
            this.$emit('clickit')
        }
    }
}
</script>
<style lang="scss" scoped>
.img_box{
    position: absolute;
    left:0;
    top:0px;
    z-index:999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    height: 100%;
      .img{
            margin:0px auto;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left:0;
            top:0px;
            img{
              margin:0px auto;
               max-height: 100%;
               max-width: 100%;
                  display: block;
                  position: absolute;
                  left: 0;
                  right: 0;
                  margin: auto;
                  z-index: 1000;
         }
    
  }




}
</style>

