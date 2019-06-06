import request from '@/utils/request';
// 获取agent
export async function getAgent(params) {
    return request('/log/api/v2/host/page', {
      method: 'POST',
      data: params,
    });
  }