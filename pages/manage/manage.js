var wxCharts = require('./../../utils/wxcharts.js');
var pulic = require('./../../utils/pulic.js');
var config = require('./../../utils/config.js');
var app = getApp();
var lineChart = null;
var left =0;
var windowWidth = 320;
var mywd = 320;
var inputvalue;
Page({
  data: {
 		isedit:true,
 		type:0
  },
  onShow: function() {
  	var that = this;
  	wx.getStorage({
		  key: 'weightInfo',
		  success (res) {
		    console.log(res.data)
		    var stdata = res.data;
		    stdata.BMI = parseFloat(stdata.BMI)
		    var leftval = 0;
		    if(18.5>stdata.BMI) {
		    	leftval = (stdata.BMI*100-10*100)/(18.5*100-10*100)*138-8;
		    }else if(18.5<stdata.BMI&&stdata.BMI<24) {
		    	console.log(stdata.BMI*100)
		    	leftval = (stdata.BMI*100-18.5*100)/(24*100-18.5*100)*138-8;
		    	console.log(leftval)
		    }else if(24<stdata.BMI&&stdata.BMI<28) {
		    	leftval = (stdata.BMI*100-24*100)/(28*100-24*100)*138-8;
		    }else if(28<stdata.BMI) {
		    	leftval = (stdata.BMI*100-28*100)/(40*100-28*100)*138-8;
		    } 
		    var distag = Math.abs((stdata.Weight-stdata.TargetWeight).toFixed(2));
		    that.setData({
					weightInfo:stdata,
					myvalue:stdata.TargetWeight,
					distag:distag,
					leftvalue:leftval
				})
				pulic.drawCircle({
					value:stdata.CMI,
					total: 100,
					canvasid: 'score',
					height: 96
				});
		  } 
		})
  },
  onLoad: function () {
  	var that = this;
		that.setData({
			userInfo:app.globalData.userInfo
		})
  	
  	var daydata = pulic.getDates(1)[0];
    var day = daydata.year+"年"+daydata.month+"月"+
    					daydata.day+"日"+" "+daydata.week;
    this.setData({
    	day:day
    })
    try {
	    var res = wx.getSystemInfoSync();
	    windowWidth = res.windowWidth;
    } catch (e) {
        console.error('getSystemInfoSync failed!');
    }
    that.getReultList()
  },
	getReultList: function() {
		var that = this;
		config.get(config.getReultList, {
			uniqid:app.globalData.uniqid,
			pagesize:1,
			pagenum:30
		}, function(res) {
			console.log(res.data)
			if(res.data.code == 1) {
				var table = res.data.data.Table;
				var table1 = res.data.data.Table1;
				for (var i = 0; i < table.length; i++) {
					table[i].timestamp = pulic.format(table[i].gt)
				}
				for (var i = 0; i < table1.length; i++) {
					table1[i].timestamp = pulic.format(table1[i].timestamp)
				}
				that.setData({
					daydata:table,
					orderdata:table1,
					type:0
				}) 
				that.drawline()
			}
		})	 
	},
	drawline: function() {
		var that = this;
		var lineData = [];
		if (that.data.type==0) {	
			lineData = that.data.daydata;
		}else{
			lineData = that.data.orderdata;
		}
		mywd = windowWidth/5*lineData.length;
		if(mywd<windowWidth) {
			mywd=windowWidth;
		} 
		if (mywd>1200) {
    	mywd=1200;
    	windowWidth=mywd/lineData.length*5
    } 
		var categories = [];
		var series = [];
		for (var i = 0; i < lineData.length; i++) {
			categories.push(lineData[i].timestamp);
			series.push(lineData[i].weight);
		}
    that.setData({
    	canvasWidth:mywd
    })
    console.log(categories)
    lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: categories,
        animation: true,
        background: '#fff',
        series: [{
            data:series,
            format: function (val) {
              return val + 'kg';
            }
        }],
        xAxis: {
            disableGrid: false, //显示x分割线
            gridColor:'#000', //X轴网格颜色
            fontColor:'#000' 
        },
        yAxis: {
        	min:0,
        	disabled: true, //不绘制Y轴
        	gridColor:'#fff'//y轴网格颜色
        },
        width:windowWidth,
        height: 100,
        dataLabel: true,
        dataPointShape: true,//是否在图表中显示数据点图形标识
        enableScroll:true,
        legend: false,
        extra: {
            lineStyle: 'curve' 
        }
    }); 
		 
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
					type:1,
					uniqid:app.globalData.uniqid,
					value:inputvalue
				}, function(res) {
					console.log(res.data)
					if(res.data.code == 1) {
						that.data.weightInfo.TargetWeight = inputvalue;
						var distag = Math.abs((that.data.weightInfo.Weight-inputvalue).toFixed(2));
						wx.setStorageSync('weightInfo', that.data.weightInfo);
						that.setData({
							myvalue:inputvalue,
							distag:distag,
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
	changvalue:function(e){
		var mystep = (mywd - windowWidth)/100;
		console.log(mystep);
		console.log(e.detail.value);
		var moveleft = -mystep*e.detail.value;
		console.log(moveleft);
		this.setData({
    	left:moveleft
    })
	},
	selecttype: function (e) {
		if (e.currentTarget.dataset.type!=this.data.type) {
			this.setData({
				type:e.currentTarget.dataset.type,
				left:0,
				svalue:0
			})
			this.drawline()
		} 
  }
})