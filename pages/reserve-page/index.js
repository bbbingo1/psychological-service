// pages/reserve-page/index.js
import {
  getTeacherList
} from '../../api/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
    // [{
    //   teacher_id: 1,
    //   name: '老师1',
    //   direction: null,
    //   phone_number: null,
    //   room: null,
    //   duty_time: null
    // }],
  },
  onLoad: function (options) {
    const openid = wx.getStorageSync("openid") //读取openid
    const form = {
      openid,
    }
    getTeacherList(form).then(res => {
      this.setData({
        dataList: res.data.teacher_list
      })
    }).catch(err => {
      wx.showToast({
        title: err.message || '请求失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  //跳转
  getForm: function (e) {
    const item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/reserve-form/index?teacher_info=' + item,
    })
  },
})