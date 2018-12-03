// pages/details/details.js
const app = getApp()
Page({
  
  //回到主页
  home:function(){
   wx.reLaunch({
     url: '/pages/home/home',
   })
  },
  //分享-事件
  onShareAppMessage: function () {
    var id = this.data.id;
    console.log(11)
    //console.log(id)
    return {
      title: '分享',
      path: '/pages/details/details?id=' + id + '&uid=' + wx.getStorageSync('uid')
    }
  },

  //选择尺码-事件
  select:function(){
    this.setData({sizem:true})
  },
  sizeClose:function(){
    this.setData({ sizem: false })
  },
 
  /**
   * 页面的初始数据
   */
  data: {
    value:1,
    list:[],
    sizem:false,
    id:0,
    size:[
      { sid: 1, sname: "S" },
      { sid: 2, sname: "M" },
      { sid: 3, sname: "L" },
      ],
    sizeNum:0,
  },
  //商品添加到购物车
  addServe: function () {
    wx.reLaunch({
      url: '/pages/cart/cart',
    })
  },
  //添加到购物车显示的文字
  checkboxChange: function (e) {
    console.log(e.detail.value)
  },
  
  addcart: function () {
    console.log(this.data.list)
    var list = this.data.list[0]
    var val = this.data.value
    if (this.data.sizeNum!=0){
     wx.showToast({
       title: '已添加到购物车',
       icon: "none",
     })
    wx.request({
      url: 'http://127.0.0.1:7000/cart',
      data:{
        pid:list.pid,
        title:list.title,
        pic:list.pic,
        price:list.price,
        count:val,
        id:app.globalData.sessionid
        },
    })
    this.sizeClose();
   }else{
     wx.showToast({
       title: '请选择尺码',
       icon: "none",
     })
   }
  },
  //加减
  sub:function(){
    if (this.data.value>1)
      this.setData({ value: --this.data.value })

  },
  add:function(){
     this.setData({value:++this.data.value})
       
  },
  //  s/m/l选择
  selectSize:function(event){
   //this.setData({sizeNum:this.data.size.sid})
    //console.log()
    this.setData({ sizeNum: event.target.dataset.id})

  },
  /**
   * 生命周期函数--监听页面加载
   */
  getlist:function(pid){
    wx.request({
      url: 'http://127.0.0.1:7000/getpid',
      data: { pid },
      success: (res) => {
        this.setData({list: res.data })
        //console.log(this.data.list)
      }

    })
  },
  onLoad: function (options) {
    this.getlist(options.pid)
    this.setData({ id: options.pid})
    

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