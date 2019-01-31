const Book = require('../models/book');

exports.index = (req, res) => { 
  res.send('未实现：站点首页');
};

// 显示完整的藏书列表
exports.book_list = (req, res) => {
  res.send('未实现：藏书列表');
};

// 为每种藏书显示详细信息的页面
exports.book_detail = (req, res) => {
  res.send('未实现：藏书详细信息：' + req.params.id);
};

// 由 GET 显示创建藏书的表单
exports.book_create_get = (req, res) => {
  res.send('未实现：藏书创建表单的 GET');
};

// 由 POST 处理藏书创建操作
exports.book_create_post = (req, res) => {
  res.send('未实现：创建藏书的 POST');
};

// 由 GET 显示删除藏书的表单
exports.book_delete_get = (req, res) => {
  res.send('未实现：藏书删除表单的 GET');
};

// 由 POST 处理藏书删除操作
exports.book_delete_post = (req, res) => {
  res.send('未实现：删除藏书的 POST');
};

// 由 GET 显示更新藏书的表单
exports.book_update_get = (req, res) => {
  res.send('未实现：藏书更新表单的 GET');
};

// 由 POST 处理藏书更新操作
exports.book_update_post = (req, res) => {
  res.send('未实现：更新藏书的 POST');
};