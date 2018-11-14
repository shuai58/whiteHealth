var config = require('../../utils/config.js');
var app = getApp();
Page({
 	data: {
		isshow:0
 	},
 	onShow: function(res) {
 		if(app.globalData.userInfo != null) { 
 			wx.navigateBack();
 		} 
 	},
 	onLoad: function () {
 		var that = this;
 		wx.getSetting({
			success: res => {
				if(res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							setTimeout(function () {
								wx.switchTab({
									url: `/pages/index/index`
								})
							},1000)
						}
					})
				}else{
					that.setData({
						isshow:1
					})
				}
			}
		})
 	},
 	getUserInfo: function(e) {
 		var that = this;
 		console.log(e)
 		if(e.detail.rawData != undefined) {
 			console.log(e.detail.rawData)
 			// 获取用户信息
 			wx.getSetting({
 				success: res => {
 					if(res.authSetting['scope.userInfo']) {
 						// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
 						wx.getUserInfo({
 							success: res => {
 								app.globalData.userInfo = res.userInfo;
 								wx.showToast({
								  title: '授权成功！',
								  icon: 'success',
								  duration: 2000
								})
 								wx.switchTab({
									url: `/pages/index/index`
								})
// 								wx.navigateBack();
 							}
 						})
 					}
 				}
 			})
 		}else{
 			wx.showToast({
			  title: '必须授权才能使用小程序！',
			  icon: 'none',
			  duration: 2000
			})
 		}
 	}
})