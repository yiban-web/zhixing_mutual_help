
import http from './http';

//关于学困生页面接口

export const myCourse = params => http.get('/student/myCourse', params); //我的课程信息展示

export const myEvaluate = params => http.get('/student/myEvaluate', params); //我的评价

export const myInfo = params => http.get('/student/myInfo', params);//我的信息

export const apply = params => http.post('/student/apply', params);//报名

export const submitEvaluate = params => http.post('/student/submitEvaluate', params);//提交评价

export const scanCode = params => http.get('/student/scanCode', params); //签到扫码

export const oneClassEvaluate = params => http.get('/student/oneClassEvaluate', params);