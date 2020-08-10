<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song,index) in songs" class="item">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit("select", item, index);
    },
    getDesc(song) {
      return `${song.singer}·${song.album}`;
    },
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return "text";
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1;
      }
    }
  }
};
</script>

<style lang="less">
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 128px;
    font-size: @font-size-medium;
    .rank {
      flex: 0 0 50px;
      width: 50px;
      margin-right: 60px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 50px;
        height: 48px;
        background-size: 50px 48px;
        &.icon0 {
          .bg-image("first");
        }
        &.icon1 {
          .bg-image("second");
        }
        &.icon2 {
          .bg-image("third");
        }
      }
      .text {
        color: @color-text-ll;
        font-size: @font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 40px;
      overflow: hidden;
      .name {
        .no-wrap;
        color: @color-text-d;
      }
      .desc {
        .no-wrap;
        margin-top: 8px;
        color: @color-text-dd;
      }
    }
  }
}
</style>
