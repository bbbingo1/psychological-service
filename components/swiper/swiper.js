// pages/test-page/test-page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			cardCur: 0,
			swiperList: [{
				id: 0,
				type: 'image',
				url: '../../images/psy_test1.jfif'
			}, {
				id: 1,
					type: 'image',
					url: '../../images/psy_test3.jfif',
			}, {
				id: 1,
					type: 'image',
					url: '../../images/psy_test2.jfif',
			}, {
				id: 2,
				type: 'image',
				url: '../../images/home-pic1.jpg'
			}],
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
			this.towerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
    },
		DotStyle(e) {
			this.setData({
				DotStyle: e.detail.value
			})
		},
		  // cardSwiper
			cardSwiper(e) {
				this.setData({
					cardCur: e.detail.current
				})
			},
			// towerSwiper
			// 初始化towerSwiper
			towerSwiper(name) {
				let list = this.data[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.setData({
					swiperList: list
				})
			},
			// towerSwiper触摸开始
			towerStart(e) {
				this.setData({
					towerStart: e.touches[0].pageX
				})
			},
			// towerSwiper计算方向
			towerMove(e) {
				this.setData({
					direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
				})
			},
			// towerSwiper计算滚动
			towerEnd(e) {
				let direction = this.data.direction;
				let list = this.data.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < list.length; i++) {
						list[i - 1].mLeft = list[i].mLeft
						list[i - 1].zIndex = list[i].zIndex
					}
					list[list.length - 1].mLeft = mLeft;
					list[list.length - 1].zIndex = zIndex;
					this.setData({
						swiperList: list
					})
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = list.length - 1; i > 0; i--) {
						list[i].mLeft = list[i - 1].mLeft
						list[i].zIndex = list[i - 1].zIndex
					}
					list[0].mLeft = mLeft;
					list[0].zIndex = zIndex;
					this.setData({
						swiperList: list
					})
				}
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