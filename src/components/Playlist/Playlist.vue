<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContent" :data="sequenceList" class="list-content">
          <transition-group name="list" tag="ul">
            <li ref="listItem" class="item" v-for="(item, index) in sequenceList" :key="item.id"  @click="selectItem(item, index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";
import { playMode } from "@/assets/js/config";
import Scroll from "@/components/Scroll/Scroll";
import Confirm from "@/components/Confirm/Confirm";
import { playerMixin } from "@/assets/js/mixin";

export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false
    };
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence ? "顺序播放" : this.mode===playMode.random ? "随机播放" : "单曲循环";
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return "icon-play";
      }
      return "";
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(song => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(song => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
    },
    deleteOne(item) {
      this.deleteSong(item);
      if (!this.playlist.length) {
        this.hide();
      }
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    confirmClear() {
      this.deleteSongList();
      this.hide();
    },
    ...mapActions(["deleteSong","deleteSongList"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      this.scrollToCurrent(newSong);
    }
  },
  components: {
    Scroll,
    Confirm
  }
};
</script>

<style lang="less" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: @color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @color-background;
    border-radius: 16px;
    .list-header {
      position: relative;
      padding: 40px 60px 20px 40px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 20px;
          font-size: 60px;
          color: @color-text-ll;
        }
        .text {
          flex: 1;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
        .clear {
          .extend-click;
          .icon-clear {
            font-size: @font-size-medium;
            color: @color-text-ll;
          }
        }
      }
    }
    .list-content {
      max-height: 640px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 80px;
        padding: 0 60px 0 40px;
        overflow: hidden;
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
        .current {
          flex: 0 0 40px;
          width: 40px;
          font-size: @font-size-small;
          color: @color-theme;
        }
        .text {
          flex: 1;
          .no-wrap;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
        .like {
          .extend-click;
          margin-right: 30px;
          font-size: @font-size-small;
          color: @color-theme;
          .icon-favorite {
            color: @color-sub-theme;
          }
        }
        .delete {
          .extend-click;
          font-size: @font-size-small;
          color: @color-theme;
        }
      }
    }
    .list-close {
      text-align: center;
      line-height: 100px;
      background: @color-background;
      font-size: @font-size-medium-x;
      color: @color-text-d;
    }
  }
}
</style>