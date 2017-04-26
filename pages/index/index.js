//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    accounts: [],

  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, accounts = this.data.accounts;
    for (var i = 0, len = accounts.length; i < len; ++i) {
      if (accounts[i].id == id) {
        accounts[i].open = !accounts[i].open
      } else {
        accounts[i].open = false
      }
    }
    this.setData({
      accounts: accounts
    });
  },
  copyPassword: function (e) {
    var id = e.currentTarget.id, accounts = this.data.accounts;
    var password = ""
    for (var i = 0, len = accounts.length; i < len; ++i) {
      if (accounts[i].id == id) {
        password = accounts[i].password
        break;
      }
    }

    if (password == "") {
      wx.showToast({ title: "错误", icon: "warn" })
      return
    }

    wx.setClipboardData({
      data: password,
      success: function (res) {
        wx.showToast({ title: "密码已成功复制到剪切板", icon: "success" })
      }
    })

  },
  editAccount: function (e) {
    var id = e.currentTarget.id
    var url = '/pages/new/new?id=' + id
    wx.redirectTo({
      url: url,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  newAccount: function (e) {
    wx.redirectTo({
      url: '/pages/new/new',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  deleteAccount: function (e) {
    var that = this
    var id = e.currentTarget.id, accounts = this.data.accounts;

    wx.showModal({
      title: "删除",
      content: "你确定要删除此项么？",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({ key: id })
          for (var i = 0, len = accounts.length; i < len; ++i) {
            if (accounts[i].id == id) {
              accounts.splice(i, 1)
              break;
            }
          }
          that.setData({ accounts: accounts })
        }
      }
    })


  },
  onLoad: function () {
    var res = wx.getStorageInfoSync()
    var accounts = []
    for (var i = 0; i < res.keys.length; i++) {
      var id = res.keys[i];
      if (id == "logs")
        continue
      var account = wx.getStorageSync(id)
      accounts.push({ id: id, descp: account.accountDescp, password: account.passwordResult, open: false })
    }
    this.setData({ accounts: accounts })
  }
})
