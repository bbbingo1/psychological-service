let app = getApp()

Page({

  data: {
    userInfo: {},
    version: 'v1.0.0',
    copyright: 'PickledFish_Tuji101',
    show: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = this.data.userInfo;
    let user = wx.getStorageSync('user')
    Object.assign(item, user || {})
    this.setData({
      background_color: app.globalData.globalBGColor,
      bgRed: app.globalData.bgRed,
      bgGreen: app.globalData.bgGreen,
      bgBlue: app.globalData.bgBlue,
      userInfo: item
    })
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo.nickName) {
      this.setData({
        userInfo: Object.assign({}, this.data.userInfo, userInfo)
      })
    } else {
      // 查看是否授权
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: res => {
                this.setData({
                  userInfo: Object.assign({}, this.data.userInfo, res.userInfo)
                })
              }
            })
          }
        }
      })
      console.log(this.data.userInfo)
    }
  },

  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo)
    let userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo
    })
  },
  //跳转
  getOrder: function (e) {
    wx.navigateTo({
      url: '/pages/order-list/index?type=' + e.currentTarget.dataset.type,
    })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    app.globalData.currentRouter = this.route
    setTimeout(function () {
      that.setData({
        show: 1
      })
    }, 200)
  },
  onHide: function () {
    let that = this
    this.setData({
      show: 0
    })
  }
})