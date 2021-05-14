// pages/order-list/index.js
import {
  getQuestionRecord,
  getMessageRecord,
  getTeacherRecord
} from '../../api/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    relation_id: 1, //发请求用：1:卖出;2:发布;3:喜欢
    statusType: ["预约记录", "测试记录", "留言记录"],
    winHeight: "", //窗口高度
    scrollLeft: 0, //tab标题的滚动条位置
    lowerThreshold: '30rpx',
    hideBottom: true,
    orderList: []
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.index;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  //获取页面数据：预约记录
  getRevert(form) {
    getTeacherRecord(form).then(res => {
      let item = this.data.orderList;
      item[0] = res.data.reserve_list;
      item[0].forEach(i => {
        i.status = '待回复'
        if (i.reserve_status === 1) {
          i.status = '已接受'
        } else if (i.reserve_status === 2) {
          i.status = '已拒绝'
        }
      })
      this.setData({
        orderList: item,
      })
    }).catch(err => {
      wx.showToast({
        title: err.message || '请求失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  //获取页面数据：测试记录
  getQuestion(form) {
    getQuestionRecord(form).then(res => {
      let item = this.data.orderList;
      item[1] = res.data.testing_list;
      this.setData({
        orderList: item,
      })
    }).catch(err => {
      wx.showToast({
        title: err.message || '请求失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  //获取页面数据：留言记录
  getMessage(form) {
    getMessageRecord(form).then(res => {
      let item = this.data.orderList;
      item[2] = res.data.message_list;
      this.setData({
        orderList: item,
      })
    }).catch(err => {
      wx.showToast({
        title: err.message || '请求失败',
        icon: 'none',
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    //页面跳转
    if (options && options.type) {
      this.setData({
        currentTab: options.type
      });
    }

    // 获取页面数据
    const openid = wx.getStorageSync("openid") //读取openid
    const form = {
      openid,
    }
    this.getRevert(form)
    this.getQuestion(form)
    this.getMessage(form)

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100; //计算swiper的高度
        that.setData({
          winHeight: calc
        });
      }
    });
  },
})