<template>
  <view class="container">
    <view v-if="hasPermission">
      <picker mode="date" @change="filterByDate">
        <view class="date-picker">
          <text>{{ selectedDate || '选择日期查看' }}</text>
        </view>
      </picker>
      <view class="inquiry-item" v-for="item in filteredInquiryList" :key="item.id">
        <view class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-price">价格: ¥{{ item.price }}</text>
        </view>
        <view class="item-edit">
          <input class="item-input" type="number" v-model="item.salePrice" placeholder="修改售卖价格"/>
          <text class="item-date">{{ item.date }}</text>
        </view>
      </view>
      <button class="submit-button" @click="submitInquiry">提交审核</button>
    </view>
    <view v-else>
      <text class="no-permission">您没有权限查看询价单</text>
    </view>
  </view>
</template>

<script>
import { getUserInfo, getUserPermissions, submitInquiry } from '@/api/user.js';

export default {
  data() {
    return {
      hasPermission: true,
      inquiryList: [
        { id: 1, name: '商品A', price: 100, salePrice: 100, date: '2024-06-03' },
        { id: 2, name: '商品B', price: 200, salePrice: 200, date: '2023-10-02' },
        { id: 3, name: '商品C', price: 300, salePrice: 300, date: '2023-10-02' },
        { id: 4, name: '商品D', price: 400, salePrice: 400, date: '2023-10-03' },
        { id: 5, name: '商品E', price: 500, salePrice: 500, date: '2023-10-03' },
      ],
      selectedDate: ''
    };
  },
  computed: {
    filteredInquiryList() {
      if (!this.selectedDate) {
        return this.inquiryList;
      }
      return this.inquiryList.filter(item => item.date === this.selectedDate);
    }
  },
  async mounted() {
    try {
      // const userInfo = await getUserInfo();
      // const permissions = await getUserPermissions();
      // this.hasPermission = permissions.includes('view_inquiry');
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async submitInquiry() {
      try {
        const response = await submitInquiry(this.inquiryList);
        if (response.success) {
          uni.showToast({
            title: '提交成功',
            icon: 'success'
          });
        } else {
          uni.showToast({
            title: '提交失败',
            icon: 'none'
          });
        }
      } catch (error) {
        uni.showToast({
          title: '提交失败',
          icon: 'none'
        });
        console.error(error);
      }
    },
    filterByDate(event) {
      this.selectedDate = event.detail.value;
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}
.inquiry-item {
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.item-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.item-name {
  font-weight: bold;
  font-size: 18px;
}
.item-price {
  color: #28a745;
  font-size: 16px;
}
.item-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-input {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
.item-date {
  color: #6c757d;
  font-size: 14px;
}
.submit-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #ffffff;
  text-align: center;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  margin-top: 20px;
}
.no-permission {
  color: #dc3545;
  text-align: center;
  font-size: 16px;
}.date-picker {
  margin-bottom: 20px;
}
.inquiry-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
.item-info {
  display: flex;
  justify-content: space-between;
}
.item-edit {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.submit-button {
  margin-top: 20px;
}
.no-permission {
  text-align: center;
  color: red;
}
</style>
