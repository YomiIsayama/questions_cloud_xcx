Page({
  formsubmit: function (e) {
    const db = wx.cloud.database()
    const studentCollection = db.collection('ddd_students')
let sn = e.detail.value.sn
let name = e.detail.value.name
studentCollection.where({
        sn: sn
      }).get()
        .then(res => {
          if (res.data.length == 0) {
            studentCollection.add({
              data: {
                sn: sn,
                name: name,
                signdate: new Date(),
                score: 0
              }
              }).then(res => {
                if (res.errMsg == 'collection.add:ok'){
                  wx.showToast({
                    title:'绑定成功',
                    success:function() {
                      wx.navigateTo({
                        url: '../exam/exam',
                      })
                    }
                  })
                }
              })
}else {
            console.log(res)
            wx.showModal({
              title: '此学号已注册',
              content: '已被+res.data[0].name+于' + res.data[O].signdate + '注册，他的openid是'+res.data[0].openid
            })
}
          })
        }
  })
