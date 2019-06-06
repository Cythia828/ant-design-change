var Mock = require('mockjs');
var delay = require('mocker-api/utils/delay');
var noProxy = process.env.NO_PROXY === 'true';


var proxy = {

  // 'POST /log/api/v2/host/page': function(req, res) {
  //   res.send(Mock.mock({
  //     data: {
  //       'data|10': [
  //         {
  //           'id|+1': 1,
  //           name: '@name', 
  //           hostName: function () { return this.name+this.id}, 
  //           hostIp: '@ip', 
  //           'modelNum|0-10': 1,
  //           agentVersion: 'v1.2.2',
  //           'driverList|0-1': [
  //             {
  //               "driverComment": "性能",
  //               "driverId": 1,
  //               "status": 0
  //             },
  //             {
  //               "driverComment": "文件",
  //               "driverId": 0,
  //               "status": 0
  //             }
  //           ],
  //           'status|0-1': 0,
  //           gmtModified: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
  //         }
  //       ],
  //       total: 10
  //     },
  //     result: true,
  //     result_message: '执行成功'
  //   }))
  // },

}
module.exports = (noProxy ? {} : delay(proxy, 1000)); 