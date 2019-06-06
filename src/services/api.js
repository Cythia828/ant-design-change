// import { stringify } from 'qs';
import request from '@/utils/request';


// 获取导航菜单
export async function queryNavigation() {
  return request('/log/api/v2/role/list_navigation');
}

// 获取当前用户
export async function queryCurrentUser() {
  return request('/log/api/v2/user/current');
}

// 获取所有用户
export async function queryUsers(params) {
  return request('/log/api/v2/app/userList', {
    method: 'POST',
    data: params,
  });
}
// 获取tag列表
export async function getTagList(params){
  return request(`/log/api/v2/host/tag/tree${params}`, {
    method: 'GET'
  });
}
// 获取驱动类型列表
export async function fetchDriverList(params){
  return request(`/log/api/v2/agent/driver/list?targetOs=${params}`,{
    method: "GET",
  })
}