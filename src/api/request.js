import axios from 'axios';
import { useUserStore } from '@/store/user'

const service = axios.create();

//请求拦截器
service.interceptors.request.use(config => {
	const userStore = useUserStore();
	let token = userStore.token;
	if( token ){
		config.headers['Authorization'] = token;
	}
  return config;
}, error => {
  Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use(response => {
  return response.data;
},error => {
  return Promise.reject(error);
});

export default service;