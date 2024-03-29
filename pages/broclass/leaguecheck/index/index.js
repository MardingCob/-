// pages/home/leaguecheck/index/index.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    first_data: []
  },

  userchoose: function (e) {
    var that = this

    var index = e.currentTarget.dataset.index;

    var queryBean = JSON.stringify(that.data.first_data[index]);

    wx.navigateTo({
      url: '/pages/broclass/leaguecheck/detail/index?queryBean=' + queryBean,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    var that = this;

    wx.request({

      url: app.globalData.apiUrl + '/localeapply/applyadmin',

      method: 'GET',

      data: {
        status: 'FIRST',
        limit: '999999999'
      },

      header: {
        'Authorization': wx.getStorageSync('server_token')
      },

      success: function (res) {

        //开发测试
        console.log('团学查询传回的数据');
        console.log(res.data.data.content);

        switch (res.data.errorCode) {
          case "200":
            var first_data = res.data.data.content;

            if (res.data.data.content.length == 0) {
              wx.showModal({
                title: '提示',
                content: '当前暂无申请',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1
                    });
                  }
                }
              });
            }

            that.setData({
              first_data: first_data
            });
            break;
          case "400":
            app.warning(res.data.errorMsg);
            break;
          case "401":
            app.warning(res.data.errorMsg);
            break;
          default:
            app.warning(res.data.errorMsg);
            break;
        }



      },
      fail: function (res) {
        app.warning('服务器错误');
      }

    })
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