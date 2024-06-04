"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      appid: "wx3306e665383896f2",
      //公众平台测试号
      appsecret: "8dafe865cf3751c779f45a5f0b91547b",
      title: "",
      openid: "",
      unionid: "",
      code: "",
      res: "",
      access_token: ""
    };
  },
  onLoad() {
    const code = this.getUrlCode("code");
    console.log("code:", code);
    if (code) {
      this.code = code;
      this.res = "取到的CODE:" + code;
    }
  },
  methods: {
    navigateToPage() {
      common_vendor.index.navigateTo({
        url: "/pages/inquirySheet/index"
      });
    },
    //网页的取openid
    weblogin: function() {
    },
    weblogin_userinfo: function() {
    },
    weblogin2: function() {
      var that = this;
      if (this.code == "") {
        this.res = "请先通过第一步取得code";
      } else {
        var url = "http://wxweb.niunan.net/api/wx/getopenid?code=" + this.code;
        common_vendor.index.request({
          url,
          method: "GET",
          success: (res) => {
            if (res.statusCode == 200) {
              that.res = JSON.stringify(res.data);
              that.openid = res.data.data.openid;
              that.access_token = res.data.data.access_token;
            }
          }
        });
      }
    },
    weblogin3: function() {
      var that = this;
      if (that.openid == "" && that.access_token == "") {
        that.res = "openid或者access_token为空";
      } else {
        var url = "http://wxweb.niunan.net/api/wx/getuserinfo?openid=" + that.openid + "&access_token=" + that.access_token;
        common_vendor.index.request({
          url,
          method: "GET",
          success: (res) => {
            if (res.statusCode == 200) {
              that.res = JSON.stringify(res.data);
            }
          }
        });
      }
    },
    // 截取code
    getUrlCode(name) {
      return decodeURIComponent((new RegExp("[?|&]" + name + "=([^&;]+?)(&|#|;|$)").exec(location.href) || [
        ,
        ""
      ])[1].replace(/\+/g, "%20")) || null;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: common_vendor.o((...args) => $options.navigateToPage && $options.navigateToPage(...args)),
    c: common_vendor.t($data.res),
    d: common_vendor.t($data.openid),
    e: common_vendor.t($data.unionid)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/诗昂/Documents/HBuilderProjects/【公众号】食堂uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
