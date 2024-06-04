// service/api.js
import request from '@/utils/request';

export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'GET',
  });
}

export function getUserPermissions() {
  return request({
    url: '/api/user/permissions',
    method: 'GET',
  });
}

export function submitInquiry(data) {
  return request({
    url: '/api/inquiry/submit',
    method: 'POST',
    data
  });
}