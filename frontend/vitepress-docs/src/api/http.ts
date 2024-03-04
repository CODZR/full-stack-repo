import axios from 'axios';
// import { useUserStore } from '../store';
import { Message } from '@vcomp/ui';
// import 'element-plus/theme-chalk/src/loading.scss';
import { tryHideFullScreenLoading, showFullScreenLoading } from '@/utils';
import { jsonToHump, jsonToUnderline } from '@/utils/format';

// const baseURL = String(import.meta.env.VITE_API_DOMAIN);

const requester = axios.create({
  // baseURL: 'https://dzrlab.top/api',
  baseURL: 'http://127.0.0.1:7001/api',
  // baseURL: '/api',
  timeout: 25000, // 设置超时时间
  withCredentials: true, // 允许携带cookie
  headers: { // 解决ie浏览器会自动缓存
    'cache-control': 'no-cache',
  }
}) as any;

// request interceptor
requester.interceptors.request.use(
  config => {
    const { method, url } = config;
    jsonToUnderLineParamsAndData(config);
    // config.headers['Authorization'] = 'Bearer ' + getToken();
    
    showFullScreenLoading();
    return config;
  },
  error => {
    // do something with request error
    tryHideFullScreenLoading();
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
requester.interceptors.response.use(
  /**
   * Determine the request status by custom code
   */
  response => {
    // eslint-disable-next-line no-undef
    tryHideFullScreenLoading();
    const res = response.data;
    if (response.status === 401) {
      Message.error('The token has expired. Please log in again');
      // useUserStore().resetToken().then(() => {
      //   location.reload();
      // });
      // return Promise.reject(new Error('The token has expired. Please log in again'));
    }
    jsonToHump(res);
    return res.data;
  },
  error => {
    // eslint-disable-next-line no-undef
    tryHideFullScreenLoading();
    console.log('http ' + error); // for debug
    Message.error(error.message);
    return Promise.reject(error);
  }
);

export default requester;

const hump2Underline = (str: string) => str.replace(/([A-Z])/g, '_$1').toLowerCase();

function jsonToUnderLineParamsAndData(config: any) {
  let params = config.params;
  if (params && typeof params[Symbol.iterator] === 'function') { // 传入的params为URLSearchParams
    let newParams = '';
    for (const item of params) {
      const newKey = hump2Underline(item[0]);
      newParams += `&${newKey}=${item[1]}`;
    }
    params = new URLSearchParams(newParams); // 去除第一个&
  } else {
    jsonToUnderline(params);
  }
  const data = config.data;
  jsonToUnderline(data);
  config.params = params;
  config.data = data;
}
