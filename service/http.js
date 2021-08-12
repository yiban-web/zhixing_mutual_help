
//const API_URL = "http://localhost:8888"
const API_URL = "https://www.xutyb.cn/cooperation"
//const API_URL = "http://113.142.67.57:80/cooperation"
console.log(API_URL)
uni.setStorageSync('API_URL', API_URL)
export const request = (method, url, data, options) => {

  return new Promise((resolve, reject) => {
    uni.request({
      url:API_URL+url,
      data,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
		'Content-Type': 'text/plain;charset=UTF-8;application/json;multipart/form-data',
		'Cookie':"PHPSESSID="+ uni.getStorageSync("sessionId")
      },
	  timeout:10000,
      success(res) {
		if(res.data.code==0){
			uni.showToast({ title: res.data.errMsg, icon: 'none' })
			resolve({code:0})
		}
		else
          resolve(res.data) 
      },
      fail(err) {
		  console.log("err")
        uni.showToast({ title: '网络异常', icon: 'none' })
        reject("err");
      },
    })
  })
}

const get = (...args) => request('GET', ...args)

const post = (...args) => request('POST', ...args)

export default { get, post}
