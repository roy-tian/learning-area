const Author = require('../models/author');

// 显示完整的作者列表
exports.author_list = (req, res) => {
  res.send('未实现：作者列表');
};

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res) => {
  res.send('未实现：作者详细信息：' + req.params.id);
};

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => {
  res.send('未实现：作者创建表单的 GET');
};

// 由 POST 处理作者创建操作
exports.author_create_post = (req, res) => {
  res.send('未实现：创建作者的 POST');
};

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => {
  res.send('未实现：作者删除表单的 GET');
};

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => {
  res.send('未实现：删除作者的 POST');
};

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
  res.send('未实现：作者更新表单的 GET');
};

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => {
  res.send('未实现：更新作者的 POST');
};