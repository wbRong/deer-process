import request from '@/api/request'

// 登录
export function loginByJson (data) {
  return request({
    url: '/api/u/loginByJson',
    method: 'post',
    data
  })
}

//退出登录
export function logout(){
	return request({
		url:'/api/u/logout'
	})
}

// 发送登录、注册验证码
export function sendCaptcha (data) {
  return request({
    url: '/api/sms/sendRegisterOrLoginCaptcha',
    data
  })
}

// 手机验证登录
export function loginByMobile (data) {
  return request({
    url: '/api/u/loginByMobile',
    method: 'post',
    data
  })
}






