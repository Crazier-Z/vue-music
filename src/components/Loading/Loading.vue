<template>
    <div class="loading">
        <img width="48" height="48" src="./loading.gif">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入"
    }
  }
};
</script>

<style lang="less">
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 40px;
    font-size: @font-size-small;
    color: @color-theme-d;
  }
}
</style>
