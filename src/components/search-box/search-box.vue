<template>
  <div class="search-box">
    <input ref="query" class="box" v-model="query" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-close"></i>
  </div>
</template>

<script>
import { debounce } from "@/assets/js/util";

export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    clear() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    },
    blur() {
      this.$refs.query.blur();
    }
  },
  created() {
    this.$watch("query", debounce((newQuery) => {
      this.$emit("query", newQuery);
    }, 200));
  }
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(235, 235, 235);
  .box {
    flex: 1;
    line-height: 50px;
    background: @color-theme;
    color: #fff;
    font-size: @font-size-medium;
    border: none;
    outline: medium;
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .icon-close {
    position: absolute;
    right: 24px;
    font-size: @font-size-medium;
    color: rgba(255, 255, 255, 0.8);
    border: none;
  }
}
</style>
