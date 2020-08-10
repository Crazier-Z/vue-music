<template>
  <div id="app">
    <van-nav-bar title="Cloud Music">
      <van-icon @click="toUser" name="wap-nav" slot="left" />
      <van-icon @click="search" name="search" slot="right" />
    </van-nav-bar>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Tab from "@/components/Tab/Tab";
import Player from "@/components/Player/Player";

export default {
  components: {
    Tab,
    Player
  },
  methods: {
    search() {
      this.$router.push({
        path: "/search"
      });
    },
    toUser() {
      this.$router.push({
        path: "/user"
      });
    }
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
