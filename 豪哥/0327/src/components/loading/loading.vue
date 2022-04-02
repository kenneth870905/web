
<template>
    <transition name="fade">
        <div v-if="show" class="Loading">
            <a-spin />
        </div>
    </transition>
</template>

<script >
import { ref } from "@vue/reactivity";
export default {
    setup(props) {
        let num = 0
        let show = ref(false)
        let open =()=>{
            num++
            show.value = num>0
        }
        let close = ()=>{
            num--
            show.value = num > 0
        }
        return {
            show,
            open,
            close
        }
    }
}
    
</script>

<style lang="scss" scoped>
.Loading{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0px;
    left: 0px;
    background: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>