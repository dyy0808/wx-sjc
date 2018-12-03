// pages/home/home.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    qList:[],
    xList:[],
    lList:[],
    qz:true,
    xz:false,
    lyq:false,
  
  },
  //秋装
  qzl:function(event){
    if(event.target.dataset.id==1){
        this.setData({qz:true})
        this.setData({ xz: false })
        this.setData({ lyq: false })
    }
  },
  //夏装
  xzl: function (event) {
    if (event.target.dataset.id == 2) {
      this.setData({ qz: false})
      this.setData({ xz: true})
      this.setData({ lyq: false })
    }
  },
//连衣裙
  lyql: function (event) {
    if (event.target.dataset.id == 3) {
      this.setData({ qz:false})
      this.setData({ xz: false })
      this.setData({ lyq: true})
    }
  },
 //调整到商品想起页面
  detalis:function(event){
    //console.log(event)
    var pid = event.target.dataset.pid
    //console.log(pid)
    wx.navigateTo({
      url: '/pages/details/details?pid='+pid,
    })
  },
 //请求商品列表
  getImg:function(){
    wx.request({
      url: 'http://127.0.0.1:7000/getimg',
      success:(res)=>{
        this.setData({list:res.data})
        for (var i = 0; i < this.data.list.length; i++){
          //秋装
          if(this.data.list[i].did==2){
            this.data.qList.push(this.data.list[i])
            this.setData({qList:this.data.qList})//异步更新
          } 
          //夏装
          else if (this.data.list[i].did == 1){
            this.data.xList.push(this.data.list[i])
            this.setData({ xList: this.data.xList })
          }
          //连衣裙
          else if (this.data.list[i].did == 3){
            this.data.lList.push(this.data.list[i])
            this.setData({ lList: this.data.lList })
          }

        }
        //成功响应结束
        //console.log(this.data.qList)
      }
    })
  },


  xz:function(event){
    if (event.target.dataset.id == this.data.xList[0].did){
      
    }
   

  },
   

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImg();//数据库获取图片
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