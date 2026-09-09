L.mapquest.key = 'YOUR-API-KEY-HERE';

// 'map' 指向 ID 为 map 的 <div> 元素
const map = L.mapquest.map('map', {
  center: [53.480759, -2.242631],
  // 1. 将 'map' 改成 'hybrid'，也可以尝试其他地图类型
  layers: L.mapquest.tileLayer('hybrid'),
  zoom: 12
});

// 2. 添加控件
map.addControl(L.mapquest.control());

// 3. 添加图标
L.marker([53.480759, -2.242631], {
  icon: L.mapquest.icons.marker({
    primaryColor: '#22407F',
    secondaryColor: '#3B5998',
    shadow: true,
    size: 'md',
    symbol: 'A'
  })
})
.bindPopup('这里是曼彻斯特！')
.addTo(map);
