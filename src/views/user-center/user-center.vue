<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="van-icon van-icon-arrow-left"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Switches from "@/components/Switches/Switches";
import Scroll from "@/components/Scroll/Scroll";
import SongList from "@/components/song-list/song-list";
import NoResult from "@/components/no-result/no-result";
import Song from "@/assets/js/song";
import { mapGetters, mapActions } from "vuex";
import { playlistMixin } from"@/assets/js/mixin";

export default {
  mixins: [playlistMixin],
  data() {
    return {
      currentIndex: 0,
      switches: [
        {name: "我的收藏"},
        {name: "最近播放"}
      ]
    };
  },
  computed: {
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length;
      } else {
        return !this.playHistory.length;
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return "暂无收藏歌曲";
      } else {
        return "你还没有听过歌曲";
      }
    },
    ...mapGetters([
      "favoriteList",
      "playHistory"
    ])
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "120px" : "";
      this.$refs.listWrapper.style.bottom = bottom;
      this.$refs.favoriteList && this.$refs.favoriteList.refresh();
      this.$refs.playList && this.$refs.playList.refresh();
    },
    switchItem(index) {
      this.currentIndex =index;
    },
    selectSong(song) {
      this.insertSong(new Song(song));
    },
    back() {
      this.$router.back();
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      if (list.length === 0) {
        return;
      }
      list = list.map((song) => {
        return new Song(song);
      });
      this.randomPlay({
        list
      });
    },
    ...mapActions([
      "insertSong",
      "randomPlay"
    ])
  },
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult
  }
};
</script>

<style lang="less">
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: @color-background;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .back {
    position: absolute;
    top: 6px;
    left: 10px;
    z-index: 50;
    .van-icon {
      padding: 21px 16px;
      font-size: 30px;font-weight: bold;
      color: #fff;
    }
  }
  .switches-wrapper {
    display: flex;
    align-items: center;
    background: @color-theme;
    height: 88px;
  }
  .play-btn {
    box-sizing: border-box;
    width: 270px;
    padding: 14px 0;
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
    border: 2px solid @color-text-ll;
    color: @color-text-ll;
    border-radius: 200px;
    font-size: 0;
    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 12px;
      font-size: @font-size-medium-x;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: @font-size-small;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 220px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 40px 60px;
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>