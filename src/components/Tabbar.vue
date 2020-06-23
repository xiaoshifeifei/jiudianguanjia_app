<template>
  <div class="tabbar">
    <van-tabbar
      @change="onChange"
      v-model="active"
      border
      active-color="#146EEB"
      inactive-color="#333">
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.home_active : icon.home"/>
        </template>
      </van-tabbar-item>
		  <van-tabbar-item replace to="/workbench">
        <span>工作台</span>
        <template #icon="props">
          <img :src="props.active ? icon.workbench_active : icon.workbench"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/schedule">
        <span>待办事项</span>
        <template #icon="props">
          <img :src="props.active ? icon.shecdule_active : icon.shecdule"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      icon: {
        home:require("@/assets/images/tabbar/home.png"),
        home_active:require("@/assets/images/tabbar/home_active.png"),
        workbench: require("@/assets/images/tabbar/workbench.png"),
        workbench_active: require("@/assets/images/tabbar/workbench_active.png"),
        shecdule: require("@/assets/images/tabbar/shecdule.png"),
        shecdule_active: require("@/assets/images/tabbar/shecdule_active.png")
      },
      active: 0
    };
  },
  mounted() {
    console.log(this.$route)
    switch (this.$route.fullPath) {
      case "/":
        this.active = 0;
        break;
      case "/home":
        this.active = 0;
        break;
      case "/workbench":
        this.active = 1;
        break;
      case "/schedule":
        this.active = 2;
        break;
      // default:
      //   this.active = 0;
      //   break;
    }
  },
  methods: {
    onChange() {
      this.active;
    }
  }
};
</script>

<style></style>
