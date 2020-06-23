<template>
	<div>
		<div class="gps-full gps-fix" v-if="visible">
			<van-loading
				class="fix_loading"
				type="spinner"
				vertical
				color="#1989fa"
				text-size="12px"
				size="24px"
			>{{text}}</van-loading>
		</div>
	</div>
</template>

<script>
export default {
  name: "tuiLoading",
  props: {
    text: {
      type: String,
      default: "正在加载...",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.fix_loading {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
/* .fix_loading {
  background: #ccc;
} */
</style>
