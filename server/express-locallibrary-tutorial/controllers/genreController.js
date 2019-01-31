const Genre = require('../models/genre');

// 显示完整的藏书种类列表
exports.genre_list = (req, res) => {
  res.send('未实现：藏书种类列表');
};

// 为每一类藏书显示详细信息的页面
exports.genre_detail = (req, res) => {
  res.send('未实现：藏书种类详细信息：' + req.params.id);
};

// 由 GET 显示创建藏书种类的表单
exports.genre_create_get = (req, res) => {
  res.send('未实现：藏书种类创建表单的 GET');
};

// 由 POST 处理藏书种类创建操作
exports.genre_create_post = (req, res) => {
  res.send('未实现：创建藏书种类的 POST');
};

// 由 GET 显示删除藏书种类的表单
exports.genre_delete_get = (req, res) => {
  res.send('未实现：藏书种类删除表单的 GET');
};

// 由 POST 处理藏书种类删除操作
exports.genre_delete_post = (req, res) => {
  res.send('未实现：删除藏书种类的 POST');
};

// 由 GET 显示更新藏书种类的表单
exports.genre_update_get = (req, res) => {
  res.send('未实现：藏书种类更新表单的 GET');
};

// 由 POST 处理藏书种类更新操作
exports.genre_update_post = (req, res) => {
  res.send('未实现：更新藏书种类的 POST');
};