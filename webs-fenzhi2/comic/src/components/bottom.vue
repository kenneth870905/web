<template>
<div>
    <div class="bottombg">
        <i class="npc-3"> </i>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style>
.bottombg {
    position: fixed;
    width: 100%;
    background-image: url("/images/bottomBg.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center bottom;
    bottom: 0;
}

.npc-3 {
    display: inline-block;
    text-indent: -2500rem;
    font-size: 0;
    width: 3.75rem;
    height: 3.325rem;
    background: url("/images/sc_img_index.png") no-repeat 0rem 0rem;
    background-size: 8.925rem 5.275rem;
    width: 3.75rem;
    height: 3.325rem;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
    left: 2.75rem;
    vertical-align: bottom;
}
</style>
