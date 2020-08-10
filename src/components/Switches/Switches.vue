<template>
  <ul class="switches">
    <li class="switch-item"
        v-for="(item, index) in switches"
        :key="item.id"
        :class="{'active': currentIndex === index}"
        @click="switchItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit("switch", index)
    }
  }
}
</script>

<style lang="less">
  .switches {
    display: flex;
    align-items: center;
    width: 480px;
    margin: 0 auto;
    .switch-item {
      flex: 1;
      padding: 16px;
      margin: 0 40px;
      text-align: center;
      font-size: @font-size-medium;
      color: @color-background-l;
      border-bottom: 4px solid @color-theme;
      &.active {
        border-bottom: 4px solid @color-background-l;
        color: #fff;
      }
    }
  }
</style>
