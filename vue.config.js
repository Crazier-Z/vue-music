const axios = require("axios");
module.exports = {
  devServer: {
    before(app) {
      app.get("/api/getDiscList", function(req, res) {
        var url =
          "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg";
        axios
          .get(url, {
            headers: {
              referer: "https://c.y.qq.com/",
              host: "c.y.qq.com"
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }),
        app.get("/api/lyric", function(req, res) {
          var url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
          axios
            .get(url, {
              headers: {
                referer: "https://c.y.qq.com/",
                host: "c.y.qq.com"
              },
              params: req.query
            })
            .then(response => {
              res.json(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }),
        app.get("/api/getSongList", function(req, res) {
          var url =
            "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg";
          axios
            .get(url, {
              headers: {
                referer: "https://c.y.qq.com/",
                host: "c.y.qq.com"
              },
              params: req.query
            })
            .then(response => {
              res.json(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }),
        app.get("/api/getSearch", function(req, res) {
          var url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";
          axios
            .get(url, {
              headers: {
                referer: "https://c.y.qq.com/m/index.html",
                host: "c.y.qq.com"
              },
              params: req.query
            })
            .then(response => {
              res.json(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        });
    }
  },
  chainWebpack: config => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  }
};

const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/style/variable.less"),
        path.resolve(__dirname, "./src/assets/style/mixin.less")
      ]
    });
}
