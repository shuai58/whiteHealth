import {History} from 'historyModel.js';
var history = new History(); 
var app = getApp();
var pagenum=1;
var historylist = [];
Page({
  data: {

  },
  onLoad: function (options) {
		var that = this;
		pagenum=1;
		historylist = [];
		that._loadData();
  },
	_loadData:function(){
    var that = this;
    that.pageHistory();
	},
	pageHistory:function(){
		var that = this;
		history.getHistoryData(app,pagenum,function(res) {
			console.log(res)
			wx.hideLoading();
			if (res.code=1) {
				var getlist = res.data.Table;
				if (getlist.length!=0) {
					for (var i = 0; i < getlist.length; i++) {
						historylist.push(getlist[i]);
					}
					that.setData({
						historylist:historylist
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
	onDetailTap:function (e) {	
		console.log(e.currentTarget.dataset.set)
		wx.navigateTo({
			url: "/pages/my/history/detail/detail?data="+JSON.stringify(e.currentTarget.dataset.set)
		})
  },
  onReachBottom:function () {
  	var that = this;
 		wx.showLoading({
		  title: '加载中',
		});
		that.pageHistory();
  }
})