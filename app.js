1 //app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        let that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId、
        var code = res.code;
        that.globalData.js_code = code;
        wx.setStorageSync('js_code', code)
        //登录请求回来之后,读取res的header的cookie
        //这里的sessionid随便写的,就是个唯一标识
        let header = {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("sessionid")//读取cookie
        };
        wx.request({
          url: 'http://1.117.110.210:80/login/',
          data: {
            code: code
          },
          method: 'post',
          header: header,
          success(res) {
            that.globalData.openid = res.data.data.openid;
            wx.setStorageSync('openid', res.data.data.openid)
            if (res.statusCode === 200) {
              // 已登录且绑定了学生个人信息 TODO：获取学生个人信息并更新数据
              const {
                name,
                stu_id: stuId,
                stu_class: stuClass,
                grade,
                college,
                phone_number: phoneNumber,
                user_id: userId
              } = res.data.data
              const user = {
                userId,
                name,
                stuId,
                stuClass,
                grade,
                college,
                phoneNumber,
              }
              wx.setStorageSync('user', user)

            } else if (res.statusCode === 403) {
              // 已登录 TODO但未绑定个人信息，TODO：跳转到更新学生个人信息页
              wx.navigateTo({
                url: '/pages/user-info/index',
                success: function (res) {},
                fail: function (res) {},
                complete: function (res) {},
              })
            }
          }
        })
        // var appId = "wx4c06dc3e6fbc9a38"
        // var secret = ""
        // console.log(code)
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        //   data: {},
        //   header: {
        //     'content-type': 'json'
        //   },
        //   success: function(res) {
        //     var openid = res //返回openid
        //     console.log('openid为' + openid);
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    currentRouter: null,
    userInfo: null,
    user: null,
    studentId: null,
    js_code: null,
    globalBGColor: '#0BDDB8 ',
    bgRed: 11,
    bgGreen: 221,
    bgBlue: 185,
  }
})