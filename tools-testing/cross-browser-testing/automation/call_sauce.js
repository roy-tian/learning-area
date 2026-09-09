const SauceLabs = require('saucelabs');

let myAccount = new SauceLabs({
  username: "your-sauce-username",
  password: "your-sauce-api-key"
});

myAccount.getAccountDetails(function (err, res) {
  console.log(res);
  myAccount.getServiceStatus(function (err, res) {
    // Sauce Labs 服务的状态
    console.log(res);
    myAccount.getJobs(function (err, jobs) {
      // 获取所有任务的列表
      for (let k in jobs) {
        if ( jobs.hasOwnProperty( k )) {
          myAccount.showJob(jobs[k].id, function (err, res) {
            let str = res.id + ": 状态：" + res.status;
            if (res.error) {
              str += "\033[31m 错误：" + res.error + " \033[0m";
            }
            console.log(str);
          });
        }
      }
    });
  });
});
