// utils/request.js
const BASE_URL = 'https://your-api-base-url.com'; // 替换为你的API基础URL

const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {
        'Content-Type': 'application/json',
      },
      success: (response) => {
        const res = response.data;
        if (res.code === 200) {
          resolve(res);
        } else {
          uni.showToast({
            title: res.message || '请求失败',
            icon: 'none',
            duration: 2000,
          });
          reject(res);
        }
      },
      fail: (error) => {
        uni.showToast({
          title: '网络请求错误',
          icon: 'none',
          duration: 2000,
        });
        reject(error);
      },
    });
  });
};

export default request;
