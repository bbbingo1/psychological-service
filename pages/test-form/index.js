import {
  getQuestion,
  submitQuestion
} from '../../api/http'

Page({
  data: {
    questionList: [],
    answerList: []
  },

  radioChange(e) {
    const idx = e.target.dataset.idx
    const value = e.detail.value
    const id = this.data.questionList[idx].question_id
    const hasId = this.data.answerList.findIndex(i => i.question_id === id)
    if (hasId !== -1) {
      this.data.answerList[idx] = {
        question_id: id,
        answer: value
      }
    } else {
      this.data.answerList.push({
        question_id: id,
        answer: value
      })
    }
  },

  submit() {
    if (this.data.answerList.length === this.data.questionList.length) {
      const openid = wx.getStorageSync("openid") //读取openid
      const form = {
        openid,
        answer_list: this.data.answerList
      }
      wx.showLoading({
        title: '加载中',
      })
      submitQuestion(form).then(res => {
        wx.hideLoading()
        wx.showModal({
          title: '测试结果',
          content: `分数：${res.data.score}；\n结果：${res.data.result}`,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              // 用户点击确定
              wx.navigateBack({
                delta: 1
              })
            }
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
        title: '请先完成所有测试题',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync("openid") //读取openid
    const form = {
      openid,
    }
    getQuestion(form).then(res => {
      const questionList = JSON.parse(JSON.stringify(res.data.question_list))
      for (let i = 0; i < res.data.question_list.length; i++) {
        questionList[i].result = []
        for (let j in res.data.question_list[i].result) {
          questionList[i].result.push([j, res.data.question_list[i].result[j]])
        }
      }
      this.setData({
        questionList
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
})