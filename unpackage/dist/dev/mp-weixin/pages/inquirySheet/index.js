"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const _sfc_main = {
  data() {
    return {
      hasPermission: true,
      inquiryList: [
        { id: 1, name: "商品A", price: 100, salePrice: 100, date: "2024-06-03" },
        { id: 2, name: "商品B", price: 200, salePrice: 200, date: "2023-10-02" },
        { id: 3, name: "商品C", price: 300, salePrice: 300, date: "2023-10-02" },
        { id: 4, name: "商品D", price: 400, salePrice: 400, date: "2023-10-03" },
        { id: 5, name: "商品E", price: 500, salePrice: 500, date: "2023-10-03" }
      ],
      selectedDate: ""
    };
  },
  computed: {
    filteredInquiryList() {
      if (!this.selectedDate) {
        return this.inquiryList;
      }
      return this.inquiryList.filter((item) => item.date === this.selectedDate);
    }
  },
  async mounted() {
  },
  methods: {
    async submitInquiry() {
      try {
        const response = await api_user.submitInquiry(this.inquiryList);
        if (response.success) {
          common_vendor.index.showToast({
            title: "提交成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "提交失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "提交失败",
          icon: "none"
        });
        console.error(error);
      }
    },
    filterByDate(event) {
      this.selectedDate = event.detail.value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.hasPermission
  }, $data.hasPermission ? {
    b: common_vendor.t($data.selectedDate || "选择日期查看"),
    c: common_vendor.o((...args) => $options.filterByDate && $options.filterByDate(...args)),
    d: common_vendor.f($options.filteredInquiryList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.price),
        c: item.salePrice,
        d: common_vendor.o(($event) => item.salePrice = $event.detail.value, item.id),
        e: common_vendor.t(item.date),
        f: item.id
      };
    }),
    e: common_vendor.o((...args) => $options.submitInquiry && $options.submitInquiry(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/诗昂/Documents/HBuilderProjects/【公众号】食堂uniapp/pages/inquirySheet/index.vue"]]);
wx.createPage(MiniProgramPage);
