<template>
  <transition name="slide">
    <div class="search">
      <div class="search-box-wrapper">
        <i class="van-icon van-icon-arrow-left" @click="back"></i>
        <search-box ref="searchBox" @query="onQueryChange"></search-box>
      </div>
      <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
        <scroll class="shortcut" ref="shortcut" :data="shortcut">
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li @click="addQuery(item.k)" class="item" v-for="(item, index) in hotKey" :key="index">
                  <span>{{item.k}}</span>
                </li>
              </ul>
            </div>
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span class="clear" @click="showConfirm">
                  <i class="icon-clear"></i>
                </span>
              </h1>
              <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
            </div>
          </div>
        </scroll>
      </div>
      <div ref="searchResult" class="search-result" v-show="query">
        <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
      </div>
      <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import SearchBox from "@/components/search-box/search-box";
import { getHotKey } from "@/api/search";
import { ERR_OK } from "@/api/config";
import Suggest from "@/components/Suggest/Suggest";
import SearchList from "@/components/search-list/search-list";
import { mapActions, mapGetters } from "vuex";
import Confirm from "@/components/Confirm/Confirm";
import Scroll from "@/components/Scroll/Scroll";
import { playlistMixin } from "@/assets/js/mixin";

export default {
  mixins: [playlistMixin],
  created() {
    this._getHotKey();
  },
  data() {
    return {
      hotKey: [],
      query: ""
    };
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory);
    },
    ...mapGetters(["searchHistory"])
  },
  methods: {
    back() {
      this.$router.back();
      this.$refs.searchBox.clear();
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "120px" : "";

      this.$refs.shortcutWrapper.style.bottom = bottom;
      this.$refs.shortcut.refresh();

      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.suggest.refresh();
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    onQueryChange(query) {
      this.query = query;
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    ...mapActions([
      "saveSearchHistory",
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh();
        }, 20);
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }
};
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: @color-background;
  .search-box-wrapper {
    padding: 20px 80px 20px 86px;
    background: @color-theme;
    .van-icon {
      position: absolute;
      left: 10px;
      top: 6px;
      padding: 21px 16px;
      font-size: 30px;
      font-weight: bold;
      color: #fff;
    }
  }
  .shortcut-wrapper {
    position: fixed;
    top: 90px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        padding-top: 50px;
        margin: 0 40px 40px 40px;
        .title {
          margin-bottom: 40px;
          font-size: @font-size-medium;
          color: @color-text-ll;
        }
        .item {
          display: inline-block;
          padding: 10px 20px;
          margin: 0 40px 20px 0;
          border-radius: 12px;
          background: @color-dialog-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 40px;
        .title {
          display: flex;
          align-items: center;
          height: 80px;
          font-size: @font-size-medium;
          color: @color-text-ll;
          .text {
            flex: 1;
          }
          .clear {
            .extend-click;
            .icon-clear {
              font-size: @font-size-medium;
              color: @color-text-d;
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 130px;
    bottom: 0;
  }
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
    // transform: translate3d(50%, 0, 0);
    // opacity: 0;
  }
}
</style>
