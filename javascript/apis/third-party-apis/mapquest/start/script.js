L.mapquest.key = 'YOUR-API-KEY-HERE';

// 'map' 指向 ID 为 map 的 <div> 元素
const map = L.mapquest.map('map', {
  center: [53.480759, -2.242631],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});
