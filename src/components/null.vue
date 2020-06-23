<template>
	<div class="null">
		<img src="../assets/images/background/null_2.png" class="null-pic" v-if="picType == 2">
		<img src="../assets/images/background/null.png" class="null-pic" v-else>
		<div class="tip">{{tip}}</div>
	</div>
</template>

<script>
	export default{
		props:["tip","picType"]
	}
</script>

<style scoped="scoped">
	.null-pic{
		width: 189px;
		height: 157px;
		margin: 142px auto 0;
		display: block;
	}
	.tip{
		color: #999;
		font-size: 16px;
		text-align: center;
		margin-top: 24px;
	}
</style>
