var wxCharts = require('./../../utils/wxcharts.js');
var config = require('./../../utils/config.js');
var pulic = require('./../../utils/pulic.js');
var app = getApp();
var lineChart = null;
var inputvalue;
var windowWidth = 320;
var data = [];
var categories = [];
Page({
    data: {
    	isedit:true,
    	type:0
    },
    onLoad: function (e) {
    	var that = this;
    	wx.getStorage({
			key: 'moveinfo',
			success (res) {
			    console.log(res.data)
			    var stdata = res.data;
			    that.setData({
					todaymove:stdata,
					myvalue:stdata.TargetValue  
				})
			}
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
    	data = [];
		categories = [];
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
 
    },
    onReady: function (e) {
    	var that = this;
    	that.wxrun();
    },
    touchHandler: function (e) {
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },  
    drawline:function(categories,data){
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: categories,
            animation: true,
            series: [{
            	name: '步数',
                data: data,
                format: function (val) {
                    return val;
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                format: function (val) {
                    return val;
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: false,
            legend: false,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    wxrun:function(){
		var that = this;
		wx.getWeRunData({
			success(res) {
				console.log(res)
			    config.post(config.getWxMove, {
					sessionid:app.globalData.sessionId,
					encryptedData:res.encryptedData,
					iv:res.iv
				}, function(res) {
					console.log(res.data)
					if(res.data.code == 1) {
						console.log(res.data.data)
						var movedata = res.data.data;
						for (var i = 0; i < movedata.length; i++) {
							movedata[i].timestamp = pulic.format(movedata[i].timestamp)
							movedata[i].step = movedata[i].step;
							categories.push(movedata[i].timestamp);
	            			data.push(movedata[i].step);
						}
						categories.reverse();
						data.reverse();
						var catdata = [];
						var valdata = [];
						for (var i = 0; i < 7; i++) {
							catdata.push(categories[i])
							valdata.push(data[i])
						}
						if (that.data.todaymove.CurrentValue==0&&valdata[0]!=0) {
							that.data.todaymove.CurrentValue = valdata[0];
							wx.setStorageSync('moveinfo', that.data.todaymove);
							wx.getStorage({
								key: 'moveinfo',
								success (res) {
								    console.log(res.data)
								    var stdata = res.data;
								    that.setData({
										todaymove:stdata 
									})
								}
							})
							wx.setStorageSync('runtag',1); 
						} 	
						console.log(valdata)
						console.log(that.data.todaymove.CurrentValue)
						console.log(valdata[0])
						that.drawline(catdata,valdata);
					}
				}) 
		  	} 
		})
	},
    editbtn: function(e) {
		var that = this;
		this.setData({
			isedit:false
		}) 
	},
	inputchange: function(e) {
		console.log(e.detail.value)
		inputvalue = e.detail.value;
	},
	confirmbtn: function() {
		var that = this;
		console.log(inputvalue)
		if(inputvalue!=""&&inputvalue!=undefined){
			if (inputvalue.substring(0,1)==0) {
				wx.showToast({
				  title: '请输入正确的目标值！',
				  icon: 'none',
				  duration: 2000
				})
			} else{
				config.post(config.setTarget, {
					type:2,
					uniqid:app.globalData.uniqid,
					value:inputvalue
				}, function(res) {
					console.log(res.data)
					if(res.data.code == 1) {
						that.data.todaymove.TargetValue = inputvalue;
						wx.setStorageSync('moveinfo',that.data.todaymove); 
						wx.setStorageSync('runtag',1); 
						that.setData({
							myvalue:inputvalue,
							isedit:true
						}) 
					}
				})	
			}	
		}else{
			wx.showToast({
			  title: '请输入目标值！',
			  icon: 'none',
			  duration: 2000
			})
		}
	},
	closebtn: function () {
		this.setData({
			isedit:true
		})
    },
    selecttype: function (e) {
		if(e.currentTarget.dataset.type!=this.data.type) {
			this.setData({
				type:e.currentTarget.dataset.type
			})
			if (e.currentTarget.dataset.type==1) {
				this.drawline(categories,data);
			} else{
				var catdata = [];
				var valdata = [];
				for (var i = 0; i < 7; i++) {
					catdata.push(categories[i])
					valdata.push(data[i])
				}
				this.drawline(catdata,valdata);
			}
		} 
			
    }
});