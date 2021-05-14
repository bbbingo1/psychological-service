import {
  updateUserInfo
} from '../../api/http'
// pages/user-info/index.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    stuId: null,
    stuClass: null,
    grade: null,
    college: null,
    phoneNumber: null,
    checked: false
  },
  //表单更改
  adInputChange: function (e) {
    this.setData({
      [e.currentTarget.dataset.obj]: e.detail.value,
    })
    console.log(this.data)
  },

  //更新信息
  signIn() {
    const {
      name,
      stuId,
      stuClass,
      grade,
      college,
      phoneNumber,
    } = this.data
    if (name && stuId && stuClass && grade && college && phoneNumber) {
      const openid = wx.getStorageSync("openid") //读取openid
      const form = {
        openid,
        name,
        stu_id: stuId,
        stu_class: stuClass,
        grade,
        college,
        phone_number: phoneNumber,
      }
      updateUserInfo(form).then(res => {
        console.log(res)
        const user = {
          name,
          stuId,
          stuClass,
          college,
          grade,
          phoneNumber
        }
        wx.setStorageSync('user', user)
        wx.showToast({
          title: '更新成功',
          duration: 500,
          success() {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          }
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
        title: '输入错误',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})