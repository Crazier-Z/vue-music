import Vue from "vue";
import Router from "vue-router";
import Recommend from "@/views/Recommend/Recommend";
import Rank from "@/views/Rank/Rank";
import Singer from "@/views/Singer/Singer";
import Search from "@/views/Search/Search";
import SingerDetail from "@/views/singer-detail/singer-detail";
import Disc from "@/views/Disc/Disc";
import TopList from "@/views/top-list/top-list";
import UserCenter from "@/views/user-center/user-center";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      name: "recommend",
      component: Recommend,
      children: [
        {
          path: ":id",
          component: Disc
        }
      ]
    },
    {
      path: "/rank",
      name: "rank",
      component: Rank,
      children: [
        {
          path: ":id",
          component: TopList
        }
      ]
    },
    {
      path: "/singer",
      name: "singer",
      component: Singer,
      children: [
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      children: [
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: "/user",
      name: "user",
      component: UserCenter
    }
  ]
});
