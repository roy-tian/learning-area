// 使用 XHR 获取商品，并将商品传递给 initialize()
// 报告获取商品时出现的错误
// 商品成功加载并通过 responseType: 'json' 转换为 JSON 对象后，
// 调用 initialize() 函数
const request = new XMLHttpRequest();
request.open('GET', 'products.json');
request.responseType = 'json';

request.onload = function() {
  if(request.status === 200) {
    let products = request.response;
    initialize(products);
  } else {
    console.log('获取 products.json 的网络请求失败，响应状态为 ' + request.status + ': ' + request.statusText)
  }
};

request.send();

// 设置应用逻辑、声明所需变量，并包含其他所有函数
function initialize(products) {
  // 获取需要操作的界面元素
  const category = document.querySelector('#category');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');

  // 记录上一次使用的分类和搜索词
  let lastCategory = category.value;
  // 目前还没有执行过搜索
  let lastSearch = '';

  // 下面两个数组保存分类和搜索词筛选后的结果
  // finalGroup 保存最终要显示的商品
  // 每个数组元素都是一个商品对象
  let categoryGroup;
  let finalGroup;

  // 初始时让 finalGroup 包含整个商品数据库，
  // 然后调用 updateDisplay()，首先显示全部商品
  finalGroup = products;
  updateDisplay();

  // 为下一次搜索准备空数组
  categoryGroup = [];
  finalGroup = [];

  // 点击搜索按钮时，调用 selectCategory() 开始筛选
  searchBtn.onclick = selectCategory;

  function selectCategory(e) {
    // 阻止表单提交，否则页面会重新加载，影响使用体验
    e.preventDefault();

    // 清空上一次搜索的结果
    categoryGroup = [];
    finalGroup = [];

    // 如果分类和搜索词都没有变化，结果也不会变化，因此无需重复筛选
    if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      // 更新上一次分类和搜索词的记录
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();
      // 如果选择“全部”，就先选择所有商品，再按搜索词筛选
      if(category.value === 'All') {
        categoryGroup = products;
        selectProducts();
      // 如果选择了具体分类，就先筛选分类，再按搜索词筛选
      } else {
        // 下拉选项的 value 首字母大写，而 JSON 中的 type 使用小写，
        // 因此比较前需要转换为小写
        let lowerCaseType = category.value.toLowerCase();
        for(let i = 0; i < products.length ; i++) {
          // 如果商品的 type 与所选分类相同，就保留该商品
          if(products[i].type === lowerCaseType) {
            categoryGroup.push(products[i]);
          }
        }

        // 分类筛选完成后继续按搜索词筛选
        selectProducts();
      }
    }
  }

  // selectProducts() 接收 selectCategory() 筛选出的商品，
  // 再根据搜索词进行第二轮筛选（如果用户输入了搜索词）
  function selectProducts() {
    // 如果没有输入搜索词，就直接使用分类筛选结果
    if(searchTerm.value.trim() === '') {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      // 将搜索词转换为小写后进行比较；中文字符不受此转换影响
      let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      // 将名称中包含搜索词的商品加入最终结果
      for(let i = 0; i < categoryGroup.length ; i++) {
        if(categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }

      // 更新页面显示
      updateDisplay();
    }

  }

  // 根据新的商品结果更新页面
  function updateDisplay() {
    // 删除 main 元素中的旧内容
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // 如果没有商品匹配搜索词，就显示提示信息
    if(finalGroup.length === 0) {
      const para = document.createElement('p');
      para.textContent = '没有符合条件的商品！';
      main.appendChild(para);
    // 否则将每个商品传递给 fetchBlob()
    } else {
      for(var i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  // fetchBlob() 使用 XHR 获取商品图片，
  // 然后将图片对象 URL 和商品对象传递给 showProduct() 显示
  function fetchBlob(product) {
    // 根据商品的 image 属性构造图片 URL
    let url = 'images/' + product.image;
    // 使用 XHR 将图片作为 Blob 获取
    // 如果出现错误，就在控制台中报告
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';

    request.onload = function() {
      if(request.status === 200) {
          // 将 Blob 转换为对象 URL——这是一个指向浏览器中临时对象的 URL
          let blob = request.response;
          let objectURL = URL.createObjectURL(blob);
          // 显示商品
          showProduct(objectURL, product);
      } else {
        console.log('获取“' + product.name + '”图片的网络请求失败，响应状态为 ' + request.status + ': ' + request.statusText);
      }
    };

    request.send();
  }

  // 在 main 元素中显示一个商品
  function showProduct(objectURL, product) {
    // 创建 section、h2、p 和 img 元素
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para = document.createElement('p');
    const image = document.createElement('img');

    // 将 section 的类名设置为商品的 type，以便显示对应的图标
    section.setAttribute('class', product.type);

    // 将 h2 的文本设置为商品名称，并将首字母转换为大写
    // 中文名称没有大小写变化，因此会保持原样
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    // 在价格前添加美元符号，并固定显示两位小数
    para.textContent = '$' + product.price.toFixed(2);

    // 设置图片的对象 URL 和替代文本
    image.src = objectURL;
    image.alt = product.name;

    // 按照页面结构将元素添加到 DOM 中
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}
