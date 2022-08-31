import request from '@/api/request'

//获取一级分类
export function getFirstCategorys () {
  return request({
    url: '/api/course/category/getFirstCategorys',
  })
}

//获取二级分类
export function getSecondCategorys (params) {
  return request({
    url: '/api/course/category/getSecondCategorys',
    params
  })
}

//查询课程标签
export function getTagsList (data) {
  return request({
    url: '/api/course/tags/list',
    method: 'post',
    data
  })
}

//查询课程
export function searchCourse (data) {
  return request({
    url: '/api/course/search',
    method: 'post',
    data
  })
}

//图片轮播
export function getSliders () {
  return request({
    url: '/api/slider/getSliders',
  })
}

//查询最新课程
export function mostNewCourse (data) {
  return request({
    url: '/api/course/mostNew',
    method: 'post',
    data
  })
}

//footer配置
export function getSetting () {
  return request({
    url: '/api/setting/get',
  })
}

//课程详情
export function getCourseDetail (params) {
  return request({
    url: '/api/course/getDetail',
    params
  })
}


// 创建临时token
export function createToken () {
  return request({
    url: '/api/token/createToken',
  })
}

// 获取用户信息
export function getInfo (params) {
  return request({
    url: '/api/member/getInfo',
    params
  })
}

//检查是否有权限
export function courseCheckAuth (params) {
  return request({
    url: '/api/course/checkAuth',
    params
  })
}

//下载课程资料
export function downloadAttachment (params) {
  return request({
    url: '/api/course/downloadAttachment',
    params,
    responseType: 'blob',
  })
}

// 播放课程
export function player (params) {
  return request({
    url: '/api/player/play',
    params,
  })
}

// 记录播放历史
export function recordHistory (data) {
  return request({
    url: '/api/course/history/recordHistory',
    method: 'post',
    data,
  })
}

// 视频最后一次记录
export function getLastHistoryByChapterId (params) {
  return request({
    url: '/api/course/history/getLastHistoryByChapterId',
    params,
  })
}


//获取购物车商品
export function getShopCarList () {
  return request({
    url: '/api/shopcar/getShopCarList',
  })
}

//删除购物车
export function deleteShopCar (params, token) {
  return request({
    url: '/api/shopcar/deleteShopCar',
    params,
    headers: { token }
  })
}

//批量删除购物车
export function deleteShopCars ( ids ,token ) {
  return request({
    url: '/api/shopcar/deleteShopCars',
    data:ids,
    method: 'post',
    headers: { token }
  })
}

//添加购物车
export function addShopCar (data, token) {
  return request({
    url: '/api/shopcar/addShopCar',
    method: 'post',
    data,
    headers: { token }
  })
}

//去结算
export function settlement (data) {
  return request({
    url: '/api/order/settlement',
    method: 'post',
    data,
  })
}

//支付宝结算
export function alipayOrder (data) {
  return request({
    url: '/api/pay/alipay/createOrder',
    method: 'post',
    data,
  })
}

//查询支付宝，支付订单状态
export function queryAlipay (params) {
  return request({
    url: '/api/pay/alipay/queryOrder',
    params,
  })
}