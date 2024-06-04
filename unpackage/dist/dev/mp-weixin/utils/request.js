"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://your-api-base-url.com";
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {
        "Content-Type": "application/json"
      },
      success: (response) => {
        const res = response.data;
        if (res.code === 200) {
          resolve(res);
        } else {
          common_vendor.index.showToast({
            title: res.message || "请求失败",
            icon: "none",
            duration: 2e3
          });
          reject(res);
        }
      },
      fail: (error) => {
        common_vendor.index.showToast({
          title: "网络请求错误",
          icon: "none",
          duration: 2e3
        });
        reject(error);
      }
    });
  });
};
exports.request = request;
