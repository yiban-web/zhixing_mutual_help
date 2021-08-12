import http from './http';

export const adLookUserList = params => http.post('/admin/adLookUserList', params); //查看领航员/学困生

export const adLookUserData = params => http.post('/admin/adLookUserData', params); //查看某一个领航员或学困生信息

export const adLookApply = params => http.post('/admin/adLookApply', params);//查看领航员申请

export const lookManager = params => http.post('/admin/lookManager', params);//查看管理员

export const adMyData = params => http.get('/admin/adMyData', params); //管理员个人信息

export const adAuditApply = (params) => http.post('/admin/adAuditApply',params);//管理员决议领航员申请是否通过-

export const addStu = (params) => http.post('/admin/addStu',params);//管理员导入学困生信息

export const lookClassData = (params) => http.post('/admin/lookClassData',params) //根据classId，userId获取内容

export const searchImportPoilt = (params) => http.post('/admin/searchImport',params);//模糊搜索领航员

export const importPoilt = (params) => http.post('/admin/importFriend',params);//管理员导入领航员