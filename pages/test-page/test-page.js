// pages/test-page/test-page.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  //跳转
  getTestForm: function(e) {
    // let status = checkLogin();
    // if (!status) {
    //   wx.navigateTo({
    //     url: '/pages/test-form/index',
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // } else {
    wx.navigateTo({
      url: '/pages/test-form/index',
    })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.currentRouter = this.route
    console.log(app.globalData.currentRouter)
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

  },
})