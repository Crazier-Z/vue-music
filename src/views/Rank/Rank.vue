<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTopList } from "@/api/rank";
import { ERR_OK } from "@/api/config";
import Scroll from "@/components/Scroll/Scroll";
import Loading from "@/components/Loading/Loading";
import { playlistMixin } from "@/assets/js/mixin";
import { mapMutations } from "vuex";

export default {
  mixins: [playlistMixin],
  created() {
    this._getTopList();
  },
  data() {
    return {
      topList: []
    };
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length ? "120px" : "";
      this.$refs.rank.style.bottom = bottom;
      this.$refs.toplist.refresh();
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      });
      this.setTopList(item);
    },
    _getTopList() {
      getTopList().then(res => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList;
        }
      });
    },
    ...mapMutations({
      setTopList: "SET_TOP_LIST"
    })
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style lang="less" scoped>
.rank {
  position: fixed;
  width: 100%;
  top: 176px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 40px;
      padding-top: 40px;
      height: 200px;
      &:last-child {
        padding-bottom: 40px;
      }
      .icon {
        flex: 0 0 200px;
        width: 200px;
        height: 200px;
        img {
          width: @img-size-large;
        }
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 40px;
        height: 200px;
        overflow: hidden;
        background: @color-dialog-background;
        color: @color-text-d;
        font-size: @font-size-small;
        .song {
          .no-wrap;
          line-height: 52px;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
