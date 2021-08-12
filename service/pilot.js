import http from './http';

//关于领航员页面的接口

export const signQRCode = params => http.get('/helper/signQRCode', params); //获取二维码

export const createRecord = params => http.post('/helper/createRecord', params);//提交

export const postRemind = params => http.get('/helper/postRemind', params);//发送评价提醒

export const postMessage = params => http.post('/helper/postMessage', params); //发布帮扶信息

export const pilotData = params => http.get('/helper/pilotData', params);

export const lookMyHelpCourse = params => http.get('/helper/lookMyHelpCourse', params); // 查看我的帮扶课程

export const startCount = params => http.get('/helper/startCount', params); 

export const endCount = params => http.get('/helper/endCount', params); 

export const ApplyResult = (params) => http.post('/helper/applyResult',params);//申请领航员页面-查看数据

export const rankingList = (params) => http.post('/helper/rankingList',params);//申请领航员页面-查看数据

export const applyFor = (params) => http.post('/helper/applyFor',params);//申请领航员页面-提交注册数据

export const lookMyclassData = (params) => http.post('/helper/lookMyclassData',params);

export const leaveClassApi = params => http.post('/helper/leaveClass',params);//离开课程