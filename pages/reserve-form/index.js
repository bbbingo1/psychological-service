// pages/reserve-form/index.js
import {
  reserveTeacher,
  sendMessage
} from '../../api/http'

Page({
  data: {
    teacher_info: {},
    textareaBValue: ''
  },

  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },

  reserve() {
    const openid = wx.getStorageSync("openid") //读取openid
    const form = {
      openid,
      teacher_id: this.data.teacher_info.teacher_id,
    }
    reserveTeacher(form).then(res => {
      wx.showToast({
        title: '预约成功',
        duration: 2000
      })
    }).catch(err => {
      wx.showToast({
        title: err.message || '请求失败',
        icon: 'none',
        duration: 2000
      })
    })
  },


  submitMessage() {
    if (this.data.textareaBValue !== '') {
      const openid = wx.getStorageSync("openid") //读取openid
      const form = {
        openid,
        teacher_id: this.data.teacher_info.teacher_id,
        message: this.data.textareaBValue
      }
      sendMessage(form).then(res => {
        wx.showToast({
          title: '留言成功',
          duration: 2000
        })
      }).catch(err => {
        wx.showToast({
          title: err.message || '请求失败',
          icon: 'none',
          duration: 2000
        })
      })
    } else {
      wx.showToast({
        title: '请填写留言内容',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onLoad: function (options) {
    console.log(options.teacher_info)
    //页面跳转
    if (options && options.teacher_info) {
      const teacher_info = JSON.parse(options.teacher_info)
      if (teacher_info.duty_time) {
        teacher_info.duty_time = teacher_info.duty_time.slice(0, 19)
      }
      this.setData({
        teacher_info
      });
    }
  }
})