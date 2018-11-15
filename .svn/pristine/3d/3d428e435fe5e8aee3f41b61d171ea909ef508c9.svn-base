var config = require('./../../utils/config.js');
var app = getApp();
var pagenum=1;
var ranklist = [];
Page({
  data: {

  },
  onLoad:function () {
		var that = this;
		pagenum=1;
		ranklist = [];
		that.setData({
			userInfo:app.globalData.userInfo
		})
    wx.getStorage({
		  key: 'weightInfo',
		  success (res) {
			  console.log(res.data)
			  var stdata = res.data;
			  that.setData({
					weightInfo:stdata
				})
			}
		})
    that.getRank()
  },
  getRank:function () {
		var that = this;
    config.get(config.getRank, {
			pagesize:pagenum,
			pagenum:10
		}, function(res) {
			wx.hideLoading();
			console.log(res.data)
			if(res.data.code == 1) {
				var getrank = res.data.data.ranklist;
				if (getrank.length!=0) {
					for (var i = 0; i < getrank.length; i++) {
						ranklist.push(getrank[i]);
					}
					that.setData({
						ranklist:ranklist
					})
					pagenum++;
				}else{
					wx.showToast({
					  title: '没有更多数据了！',
					  icon: 'none',
					  duration: 2000
					})
				}
			} 
		}) 
  },
  onReachBottom: function () {
		var that = this;
 		wx.showLoading({
		  title: '加载中',
		});
		that.getRank();
  }
})