var config = require('./../../utils/config.js');
var pulic = require('./../../utils/pulic.js');
var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {

  },
formSubmit: function(e) {
		var data = e.detail.value;
		console.log(data)
	  if (pulic.trim(data.Contact) == '') {
      wx.showToast({
			  title: '联系方式不能为空!',
			  icon: 'none',
			  duration: 2000
			})
    }else if (pulic.trim(data.Content) == '') {
      wx.showToast({
			  title: '建议不能为空!',
			  icon: 'none',
			  duration: 2000
			})
    }else{
    	wx.showLoading({
			  title: '数据提交中！',
			});
    	var formdata = e.detail.value;
			config.post(config.submitSuggest,formdata,function(data){
 				wx.hideLoading();
 				console.log(data.data.status)
    		if(data.data.status.code==1){
					wx.showToast({
					  title: '提交成功',
					  icon: 'success',
					  duration: 2000
					})
    			setTimeout(function(){   
						wx.navigateBack();
					},2000);
				}else{
					wx.showModal({
					  title: '提示',
					  content: '提交失败，请重新提交！',
					  success: function(res) { 
					  }
					})
				}
    	})
 
    }
	}
})