<template>
    <div class="tab">
        <router-link class="tab-item" tag="div" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link class="tab-item" tag="div" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link class="tab-item" tag="div" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.tab {
  display: flex;
  height: 88px;
  line-height: 88px;
  font-size: @font-size-medium;
  background-color: @color-theme;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: @color-background-ll;
    }
    &.router-link-active .tab-link {
      color: @color-background-l;
      border-bottom: 4px solid @color-background-l;
    }
  }
}
</style>
