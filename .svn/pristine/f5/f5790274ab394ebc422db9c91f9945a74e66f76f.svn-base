var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
		isview:false
  },
  onLoad: function (res) {
		var that = this;
  	wx.getStorage({
		  key: 'addinfo',
		  success (res) {
		    console.log(res.data)
		    if (res.data.AdType==2) {
		    	that.setData({
		    		isview:true,
		    		url:res.data.ExtContent+res.data.Content
		    	})
		    } else{
		    	var content = res.data.Content;
				  content = content.replace('<img', '<img style="max-width:100%;height:auto" ')
					about: WxParse.wxParse('about', 'html', content, that,0)
		    	that.setData({
		    		isview:false,
		    		title:res.data.Title,
		    		content:res.data.Content
		    	})
		    } 
		  } 
		})
  }
})