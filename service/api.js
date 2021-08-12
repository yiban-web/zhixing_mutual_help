
import http from './http';

export const getApi = (params) => http.get(`/aaa?data=$(params.data)`, params);

export const postApi = params => http.post('/bbb', params);

export const login = params => http.get(`/oauth/authorize?code=$(params.code)+&mini_app_name=cooperation`, params); //登录接口

export const testApi = params => http.get(`/cooperation`, params); //登录接口

export const showUserData  = params => http.post(`/student/showUserData`, {
		userType:params.userType,
		college:params.college||[],
		subject:params.subject||[],
		name:params.name||"" ,
		page:params.page
	}) //根据用户选择展示的用户信息

export const getUserType = params => http.get('/getUserType', params); //获取身份码







