var config = require('./../../utils/config.js');
var edit = require('./../../templet/edit/edit.js');
var app = getApp();
Page({
	data: {
		isedit: true,
		male: "/img/icon-man-hover.png",
		female: "/img/icon-woman-normal.png"
	},
	onShow: function() {
		var that = this;
		that.setData({
			userInfo: app.globalData.userInfo,
			height: wx.getStorageSync('height'),
			agenum: wx.getStorageSync('age'),
			sex: wx.getStorageSync('sex'),
			weight: wx.getStorageSync('weightInfo')
		})
	},
	onLoad: function() {
		var that = this;
		if (app.globalData.edhg==1) {
			that.setData({
				edhg:app.globalData.edhg,
			})
		}
	},
	editclick: function(e) {
		var that = this;
		if (app.globalData.edhg==1&&e.currentTarget.dataset.edhg==1) {
			return
		}
		edit.height(function(data) {
			var index = 100;
			if(wx.getStorageSync('height') != undefined) {
				for(var i = 0; i < data.length; i++) {
					if(data[i] == wx.getStorageSync('height')) {
						index = i;
					}
				}
			}
			that.setData({
				heightarr: data,
				hgindex: index
			})
		})
		edit.age(function(data) {
			var index = 18;
			if(wx.getStorageSync('age') != undefined) {
				for(var i = 0; i < data.length; i++) {
					if(data[i] == wx.getStorageSync('age')) {
						index = i;
					}
				}
			}
			that.setData({
				agearr: data,
				ageindex: index
			})
		})
		this.setData({
			isedit: false
		})
	},
	selectsex: function(e) {
		console.log(e.currentTarget.dataset.sex)
		var sex = e.currentTarget.dataset.sex == 0 ? "男" : "女"
		wx.showToast({
			title: '选择的性别为' + sex,
			icon: 'none',
			duration: 1000
		})
		this.setData({
			sex: e.currentTarget.dataset.sex
		})
	},
	heightChange: function(e) {
		console.log(e.detail.value)
		this.setData({
			hgindex: e.detail.value
		})
	},
	ageChange: function(e) {
		this.setData({
			ageindex: e.detail.value
		})
	},
	closeedit: function() {
		var that = this;
		if(that.data.sex == "") {
			wx.showToast({
				title: '请选择性别',
				icon: 'none',
				duration: 2000
			})
		} else {
			if (wx.getStorageSync('height')!=that.data.heightarr[that.data.hgindex]||
				wx.getStorageSync('age')!=that.data.agearr[that.data.ageindex] ||
				wx.getStorageSync('sex')!=that.data.sex
			) {
				wx.setStorageSync('height', that.data.heightarr[that.data.hgindex])
				wx.setStorageSync('age', that.data.agearr[that.data.ageindex])
				wx.setStorageSync('sex', that.data.sex)
				wx.setStorageSync('ischange', 1);
				config.post(config.submitInfo, {
					uniqid: app.globalData.uniqid,
					height: wx.getStorageSync('height'),
					age: wx.getStorageSync('age'),
					sex: wx.getStorageSync('sex')
				}, function(res) {
					console.log(res.data)
				})
				that.setData({
					height: wx.getStorageSync('height'),
					agenum: wx.getStorageSync('age'),
					sex: wx.getStorageSync('sex'),
					isedit: true
				})
			}else{
				that.setData({
					isedit: true
				})
			}
		}
	},
	navclick: function(options) {
		wx.navigateTo({
			url: "/pages/feedback/feedback"
		})
	},
	historyClick:function(options) {
		wx.navigateTo({
			url: "/pages/my/history/history"
		})
	},
	tishi: function() {
		wx.showToast({
			title: '正在开发中，敬请期待！',
			icon: 'none',
			duration: 2000
		})
	}
})