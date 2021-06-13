<template>
	<ul class="list">
		<li @click="$router.push('/infoDetail/sv388')">SV388</li>
		<li @click="$router.push('/infoDetail/digmaan')">DIGMAAN</li>
		<li @click="$router.push('/aboutUs')">关于我们</li>
		<li @click="$router.push('/rule')">规则与条款</li>
		<li @click="$router.push('/responsible')">有节制博彩</li>
		<li @click="$router.push('/policy')">隐私政策</li>
		<li @click="$router.push('/alliance')">联属伙伴</li>
		<!-- <li  @click="$router.push('/contactUs')">联系我们</li> -->
	</ul>
    <div class="f2">
		Copyright @ 2021 Lucky CockFighting All Right Reserved.
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss" scoped>
.list{
	background: var(--color);
	display:flex;
	justify-content: center;
	padding: 30px 0px 0px;
	color: #fff;
	font-size: 14px;
	li{
		padding: 0px 10px;
		cursor: pointer;
	}
}
.f2{
	background: var(--color);
	padding: 20px 0px 10px ;
	color: #fff;
	font-size: 14px;
	text-align: center;
}
</style>

