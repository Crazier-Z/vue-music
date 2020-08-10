<template>
    <scroll class="suggest" 
            :data="result" 
            :pullup="pullup"
            :beforeScroll="beforeScroll" 
            @scrollToEnd="searchMore"
            @beforeScroll="listScroll"
            ref="suggest"
    >
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
          <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
import { getSearch } from "@/api/search";
import { ERR_OK } from "@/api/config";
import { createSong } from "@/assets/js/song";
import Scroll from "@/components/Scroll/Scroll";
import Loading from "@/components/Loading/Loading";
import Singer from "@/assets/js/singer";
import { mapMutations, mapActions } from "vuex";
import NoResult from "@/components/no-result/no-result";
import { getSongVkey } from "@/api/singer";

const TYPE_SINGER = "singer";
const perpage = 20;

export default {
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      beforeScroll: true,
      hasMore: true
    };
  },
  methods: {
    search() {
      this.page = 1;
      this.hasMore = true;
      this.$refs.suggest.scrollTo(0, 0);
      getSearch(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data);
          this._checkMore(res.data);
        }
      });
    },
    searchMore() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data));
          this._checkMore(res.data);
        }
      });
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`;
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        });
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }
      this.$emit("select");
    },
    refresh() {
      this.$refs.suggest.refresh();
    },
    listScroll() {
      this.$emit("listScroll");
    },
    _checkMore(data) {
      const song = data.song;
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false;
      }
    },
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
          // getSongVkey(musicData.songmid).then(res => {
          //   if (res.code === ERR_OK) {
          //     const vkey = res.data.items[0].vkey;
          //     ret.push(createSong(musicData, vkey));
          //   }
          // })
        }
      });
      return ret;
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions([
      "insertSong"
    ])
  },
  watch: {
    query() {
      this.search();
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
};
</script>

<style lang="less">
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 60px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 40px;
    }
    .icon {
      flex: 0 0 60px;
      width: 60px;
      [class^="icon-"] {
        font-size: @font-size-medium;
        color: @color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: @font-size-medium;
      color: @color-text-d;
      overflow: hidden;
      .text {
        .no-wrap;
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
