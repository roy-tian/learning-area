let UIColorPicker = (function UIColorPicker() {

  let subscribers = [];
  let pickers = [];

  /**
   * RGBA 颜色类
   *
   * HSV/HSB 和 HSL
   * （hue=色调，saturation=饱和度，value=色阶 / brightness=亮度，lightness=亮度）
   * @param hue        0-360
   * @param saturation 0-100
   * @param value      0-100
   * @param lightness  0-100
   */

  function Color(color) {

    if(color instanceof Color === true) {
      this.copy(color);
      return;
    }

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    this.hue = 0;
    this.saturation = 0;
    this.value = 0;
    this.lightness = 0;
    this.format = 'HSV';
  }

  function RGBColor(r, g, b) {
    let color = new Color();
    color.setRGBA(r, g, b, 1);
    return color;
  }

  function RGBAColor(r, g, b, a) {
    let color = new Color();
    color.setRGBA(r, g, b, a);
    return color;
  }

  function HSVColor(h, s, v) {
    let color = new Color();
    color.setHSV(h, s, v);
    return color;
  }

  function HSVAColor(h, s, v, a) {
    let color = new Color();
    color.setHSV(h, s, v);
    color.a = a;
    return color;
  }

  function HSLColor(h, s, l) {
    let color = new Color();
    color.setHSL(h, s, l);
    return color;
  }

  function HSLAColor(h, s, l, a) {
    let color = new Color();
    color.setHSL(h, s, l);
    color.a = a;
    return color;
  }

  Color.prototype.copy = function copy(obj) {
    if(obj instanceof Color !== true) {
      console.log('Typeof parameter not Color');
      return;
    }

    this.r = obj.r;
    this.g = obj.g;
    this.b = obj.b;
    this.a = obj.a;
    this.hue = obj.hue;
    this.saturation = obj.saturation;
    this.value = obj.value;
    this.format = '' + obj.format;
    this.lightness = obj.lightness;
  };

  Color.prototype.setFormat = function setFormat(format) {
    if (format === 'HSV')
      this.format = 'HSV';
    if (format === 'HSL')
      this.format = 'HSL';
  };

  /*========== 设置 Color 类属性的方法 ==========*/

  Color.prototype.isValidRGBValue = function isValidRGBValue(value) {
    return (typeof(value) === 'number' && isNaN(value) === false &&
      value >= 0 && value <= 255);
  };

  Color.prototype.isValidAlphaValue = function isValidAlphaValue(value) {
    return (typeof(value) === 'number' && isNaN(value) === false &&
      value >= 0 && value <= 1);
  };

  Color.prototype.setRGBA = function setRGBA(red, green, blue, alpha) {
    if (this.isValidRGBValue(red) === false ||
      this.isValidRGBValue(green) === false ||
      this.isValidRGBValue(blue) === false)
      return;

    if (alpha !== undefined && this.isValidAlphaValue(alpha) === false)
      return;

    this.r = red | 0;
    this.g = green | 0;
    this.b = blue | 0;

    if (alpha !== undefined)
      this.a = alpha;
  };

  Color.prototype.setByName = function setByName(name, value) {
    if (name === 'r' || name === 'g' || name === 'b') {
      if(this.isValidRGBValue(value) === false)
        return;

      this[name] = value;
      this.updateHSX();
    }
  };

  Color.prototype.setHSV = function setHSV(hue, saturation, value) {
    this.hue = hue;
    this.saturation = saturation;
    this.value = value;
    this.HSVtoRGB();
  };

  Color.prototype.setHSL = function setHSL(hue, saturation, lightness) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.HSLtoRGB();
  };

  Color.prototype.setHue = function setHue(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 359)
      return;
    this.hue = value;
    this.updateRGB();
  };

  Color.prototype.setSaturation = function setSaturation(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100)
      return;
    this.saturation = value;
    this.updateRGB();
  };

  Color.prototype.setValue = function setValue(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100)
      return;
    this.value = value;
    this.HSVtoRGB();
  };

  Color.prototype.setLightness = function setLightness(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100)
      return;
    this.lightness = value;
    this.HSLtoRGB();
  };

  Color.prototype.setHexa = function setHexa(value) {
    let match = /^#?([0-9A-F]{3,4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.exec(value);

    if (match === null)
      return false;

    value = match[1];

    if (value.length === 3 || value.length === 4)
      value = value.replace(/([0-9A-F])/gi, '$1$1');

    this.r = parseInt(value.substr(0, 2), 16);
    this.g = parseInt(value.substr(2, 2), 16);
    this.b = parseInt(value.substr(4, 2), 16);

    if (value.length === 8)
      this.a = parseFloat((parseInt(value.substr(6, 2), 16) / 255).toFixed(3));
    else
      this.a = 1;

    this.updateHSX();
    return true;
  };

  /*========== 转换方法 ==========*/

  Color.prototype.convertToHSL = function convertToHSL() {
    if (this.format === 'HSL')
      return;

    this.setFormat('HSL');
    this.RGBtoHSL();
  };

  Color.prototype.convertToHSV = function convertToHSV() {
    if (this.format === 'HSV')
      return;

    this.setFormat('HSV');
    this.RGBtoHSV();
  };

  /*========== 更新方法 ==========*/

  Color.prototype.updateRGB = function updateRGB() {
    if (this.format === 'HSV') {
      this.HSVtoRGB();
      return;
    }

    if (this.format === 'HSL') {
      this.HSLtoRGB();
      return;
    }
  };

  Color.prototype.updateHSX = function updateHSX() {
    if (this.format === 'HSV') {
      this.RGBtoHSV();
      return;
    }

    if (this.format === 'HSL') {
      this.RGBtoHSL();
      return;
    }
  };

  Color.prototype.HSVtoRGB = function HSVtoRGB() {
    let sat = this.saturation / 100;
    let value = this.value / 100;
    let C = sat * value;
    let H = this.hue / 60;
    let X = C * (1 - Math.abs(H % 2 - 1));
    let m = value - C;
    let precision = 255;

    C = (C + m) * precision | 0;
    X = (X + m) * precision | 0;
    m = m * precision | 0;

    if (H >= 0 && H < 1) { this.setRGBA(C, X, m); return; }
    if (H >= 1 && H < 2) { this.setRGBA(X, C, m); return; }
    if (H >= 2 && H < 3) { this.setRGBA(m, C, X); return; }
    if (H >= 3 && H < 4) { this.setRGBA(m, X, C); return; }
    if (H >= 4 && H < 5) { this.setRGBA(X, m, C); return; }
    if (H >= 5 && H < 6) { this.setRGBA(C, m, X); return; }
  };

  Color.prototype.HSLtoRGB = function HSLtoRGB() {
    let sat = this.saturation / 100;
    let light = this.lightness / 100;
    let C = sat * (1 - Math.abs(2 * light - 1));
    let H = this.hue / 60;
    let X = C * (1 - Math.abs(H % 2 - 1));
    let m = light - C/2;
    let precision = 255;

    C = (C + m) * precision | 0;
    X = (X + m) * precision | 0;
    m = m * precision | 0;

    if (H >= 0 && H < 1) { this.setRGBA(C, X, m); return; }
    if (H >= 1 && H < 2) { this.setRGBA(X, C, m); return; }
    if (H >= 2 && H < 3) { this.setRGBA(m, C, X); return; }
    if (H >= 3 && H < 4) { this.setRGBA(m, X, C); return; }
    if (H >= 4 && H < 5) { this.setRGBA(X, m, C); return; }
    if (H >= 5 && H < 6) { this.setRGBA(C, m, X); return; }
  };

  Color.prototype.RGBtoHSV = function RGBtoHSV() {
    let red  = this.r / 255;
    let green = this.g / 255;
    let blue = this.b / 255;

    let cmax = Math.max(red, green, blue);
    let cmin = Math.min(red, green, blue);
    let delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;

    if (delta) {
      if (cmax === red ) { hue = ((green - blue) / delta); }
      if (cmax === green ) { hue = 2 + (blue - red) / delta; }
      if (cmax === blue ) { hue = 4 + (red - green) / delta; }
      if (cmax) saturation = delta / cmax;
    }

    this.hue = 60 * hue | 0;
    if (this.hue < 0) this.hue += 360;
    this.saturation = (saturation * 100) | 0;
    this.value = (cmax * 100) | 0;
  };

  Color.prototype.RGBtoHSL = function RGBtoHSL() {
    let red  = this.r / 255;
    let green = this.g / 255;
    let blue = this.b / 255;

    let cmax = Math.max(red, green, blue);
    let cmin = Math.min(red, green, blue);
    let delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;
    let lightness = (cmax + cmin) / 2;
    let X = (1 - Math.abs(2 * lightness - 1));

    if (delta) {
      if (cmax === red ) { hue = ((green - blue) / delta); }
      if (cmax === green ) { hue = 2 + (blue - red) / delta; }
      if (cmax === blue ) { hue = 4 + (red - green) / delta; }
      if (cmax) saturation = delta / X;
    }

    this.hue = 60 * hue | 0;
    if (this.hue < 0) this.hue += 360;
    this.saturation = (saturation * 100) | 0;
    this.lightness = (lightness * 100) | 0;
  };

  /*========== 获取方法 ==========*/

  Color.prototype.getHexa = function getHexa(includeAlpha) {
    let r = this.r.toString(16);
    let g = this.g.toString(16);
    let b = this.b.toString(16);
    if (this.r < 16) r = '0' + r;
    if (this.g < 16) g = '0' + g;
    if (this.b < 16) b = '0' + b;
    let value = '#' + r + g + b;
    let alpha = parseFloat(this.a);
    if (includeAlpha === true && isNaN(alpha) === false && alpha !== 1) {
      alpha = Math.max(0, Math.min(1, alpha));
      let a = Math.round(alpha * 255).toString(16);
      if (a.length < 2) a = '0' + a;
      value += a;
    }
    return value.toUpperCase();
  };

  Color.prototype.getRGBA = function getRGBA() {

    let rgb = '(' + this.r + ', ' + this.g + ', ' + this.b;
    let a = '';
    let v = '';
    let x = parseFloat(this.a);
    if (x !== 1) {
      a = 'a';
      v = ', ' + x;
    }

    let value = 'rgb' + a + rgb + v + ')';
    return value;
  };

  Color.prototype.getHSLA = function getHSLA() {
    if (this.format === 'HSV') {
      let color = new Color(this);
      color.setFormat('HSL');
      color.updateHSX();
      return color.getHSLA();
    }

    let a = '';
    let v = '';
    let hsl = '(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness +'%';
    let x = parseFloat(this.a);
    if (x !== 1) {
      a = 'a';
      v = ', ' + x;
    }

    let value = 'hsl' + a + hsl + v + ')';
    return value;
  };

  Color.prototype.getColor = function getColor() {
    if (parseFloat(this.a) === 1)
      return this.getHexa();
    return this.getRGBA();
  };

  /*=======================================================================*/
  /*=======================================================================*/

  /*========== 获取指针移动事件 ==========*/

  let setPointerTracking = function setPointerTracking(elem, callback) {
    let pointerId = null;

    let pointerMove = function pointerMove(e) {
      if (e.pointerId !== pointerId)
        return;
      e.preventDefault();
      callback(e);
    };

    let pointerEnd = function pointerEnd(e) {
      if (e.pointerId !== pointerId)
        return;
      if (elem.hasPointerCapture(e.pointerId))
        elem.releasePointerCapture(e.pointerId);
      pointerId = null;
    };

    elem.addEventListener('pointerdown', function(e) {
      if (e.button !== 0)
        return;
      pointerId = e.pointerId;
      e.preventDefault();
      callback(e);
      elem.setPointerCapture(e.pointerId);
    });
    elem.addEventListener('pointermove', pointerMove);
    elem.addEventListener('pointerup', pointerEnd);
    elem.addEventListener('pointercancel', pointerEnd);
  };

  /*====================*/
  // ColorPicker 类（汲取颜色）
  /*====================*/

  function ColorPicker(node) {
    this.color = new Color();
    this.node = node;
    this.subscribers = [];

    let type = this.node.getAttribute('data-mode');
    let topic = this.node.getAttribute('data-topic');

    this.topic = topic;
    this.picker_mode = (type === 'HSL') ? 'HSL' : 'HSV';
    this.color.setFormat(this.picker_mode);

    this.createPickingArea();
    this.createHueArea();

    this.newInputComponent('H', 'hue', this.inputChangeHue.bind(this));
    this.newInputComponent('S', 'saturation', this.inputChangeSaturation.bind(this));
    this.newInputComponent('V', 'value', this.inputChangeValue.bind(this));
    this.newInputComponent('L', 'lightness', this.inputChangeLightness.bind(this));

    this.createAlphaArea();

    this.newInputComponent('R', 'red', this.inputChangeRed.bind(this));
    this.newInputComponent('G', 'green', this.inputChangeGreen.bind(this));
    this.newInputComponent('B', 'blue', this.inputChangeBlue.bind(this));

    this.createPreviewBox();
    this.createChangeModeButton();

    this.newInputComponent('alpha', 'alpha', this.inputChangeAlpha.bind(this));
    this.newInputComponent('hexa', 'hexa', this.inputChangeHexa.bind(this));

    this.setColor(this.color);
    pickers[topic] = this;
  }

  /*************************************************************************/
  //    生成 ColorPicker 的函数
  /*************************************************************************/

  ColorPicker.prototype.createPickingArea = function createPickingArea() {
    let area = document.createElement('div');
    let picker = document.createElement('div');

    area.className = 'picking-area';
    picker.className = 'picker';

    this.picking_area = area;
    this.color_picker = picker;
    area.setAttribute('role', 'group');
    area.setAttribute('tabindex', '0');
    area.setAttribute('aria-label', '颜色选择区域');
    area.addEventListener('keydown', this.handlePickingKeydown.bind(this));
    setPointerTracking(area, this.updateColor.bind(this));

    area.appendChild(picker);
    this.node.appendChild(area);
  };

  ColorPicker.prototype.createHueArea = function createHueArea() {
    let area = document.createElement('div');
    let picker = document.createElement('div');

    area.className = 'hue';
    picker.className ='slider-picker';

    this.hue_area = area;
    this.hue_picker = picker;
    area.setAttribute('role', 'slider');
    area.setAttribute('tabindex', '0');
    area.setAttribute('aria-label', '色调');
    area.setAttribute('aria-valuemin', '0');
    area.setAttribute('aria-valuemax', '359');
    area.setAttribute('aria-valuestep', '1');
    area.addEventListener('keydown', this.handleHueKeydown.bind(this));
    setPointerTracking(area, this.updateHueSlider.bind(this));

    area.appendChild(picker);
    this.node.appendChild(area);
  };

  ColorPicker.prototype.createAlphaArea = function createAlphaArea() {
    let area = document.createElement('div');
    let mask = document.createElement('div');
    let picker = document.createElement('div');

    area.className = 'alpha';
    mask.className = 'alpha-mask';
    picker.className = 'slider-picker';

    this.alpha_area = area;
    this.alpha_mask = mask;
    this.alpha_picker = picker;
    area.setAttribute('role', 'slider');
    area.setAttribute('tabindex', '0');
    area.setAttribute('aria-label', '透明度');
    area.setAttribute('aria-valuemin', '0');
    area.setAttribute('aria-valuemax', '1');
    area.setAttribute('aria-valuestep', '0.01');
    area.addEventListener('keydown', this.handleAlphaKeydown.bind(this));
    setPointerTracking(area, this.updateAlphaSlider.bind(this));

    area.appendChild(mask);
    mask.appendChild(picker);
    this.node.appendChild(area);
  };

  ColorPicker.prototype.createPreviewBox = function createPreviewBox(e) {
    let preview_box = document.createElement('div');
    let preview_color = document.createElement('div');

    preview_box.className = 'preview';
    preview_color.className = 'preview-color';

    this.preview_color = preview_color;

    preview_box.appendChild(preview_color);
    this.node.appendChild(preview_box);
  };

  ColorPicker.prototype.newInputComponent = function newInputComponent(title, topic, onChangeFunc) {
    let wrapper = document.createElement('div');
    let input = document.createElement('input');
    let info = document.createElement('label');
    let label = title;
    if (topic === 'alpha') label = '透明度';
    if (topic === 'hexa') label = '十六进制颜色';
    let inputId = (this.topic || 'picker') + '-' + topic + '-input';

    wrapper.className = 'input';
    wrapper.setAttribute('data-topic', topic);
    info.textContent = label;
    info.className = 'name';
    info.setAttribute('for', inputId);
    input.id = inputId;
    input.setAttribute('type', 'text');
    input.setAttribute('aria-label', label);

    wrapper.appendChild(info);
    wrapper.appendChild(input);
    this.node.appendChild(wrapper);

    input.addEventListener('change', onChangeFunc);
    input.addEventListener('click', function() {
      this.select();
    });

    this.subscribe(topic, function(value) {
      input.value = value;
    });
  };

  ColorPicker.prototype.createChangeModeButton = function createChangeModeButton() {

    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.className = 'switch_mode';
    button.setAttribute('aria-label', '切换颜色模式');
    button.addEventListener('click', function() {
      if (this.picker_mode === 'HSV')
        this.setPickerMode('HSL');
      else
        this.setPickerMode('HSV');

    }.bind(this));

    this.node.appendChild(button);
  };

  ColorPicker.prototype.updateAria = function updateAria() {
    let valueName = this.picker_mode === 'HSL' ? '亮度' : '色阶';
    let value = this.picker_mode === 'HSL' ? this.color.lightness : this.color.value;

    this.picking_area.setAttribute('aria-label',
      '颜色选择区域，饱和度 ' + this.color.saturation + '%，' + valueName + ' ' + value + '%');
    this.hue_area.setAttribute('aria-valuenow', this.color.hue);
    this.hue_area.setAttribute('aria-valuetext', this.color.hue + '°');
    this.alpha_area.setAttribute('aria-valuenow', parseFloat(this.color.a).toFixed(2));
    this.alpha_area.setAttribute('aria-valuetext',
      parseFloat(this.color.a).toFixed(2));
  };

  ColorPicker.prototype.handlePickingKeydown = function handlePickingKeydown(e) {
    let step = e.shiftKey ? 10 : 1;
    let saturation = this.color.saturation;
    let value = this.picker_mode === 'HSL' ? this.color.lightness : this.color.value;

    if (e.key === 'ArrowLeft') saturation -= step;
    else if (e.key === 'ArrowRight') saturation += step;
    else if (e.key === 'ArrowDown') value -= step;
    else if (e.key === 'ArrowUp') value += step;
    else return;

    e.preventDefault();
    saturation = Math.max(0, Math.min(100, saturation));
    value = Math.max(0, Math.min(100, value));
    this.color.setSaturation(saturation);
    if (this.picker_mode === 'HSL')
      this.color.setLightness(value);
    else
      this.color.setValue(value);
    this.updateSLV();
  };

  ColorPicker.prototype.handleHueKeydown = function handleHueKeydown(e) {
    let value = this.color.hue;
    if (e.key === 'ArrowLeft') value--;
    else if (e.key === 'ArrowRight') value++;
    else if (e.key === 'Home') value = 0;
    else if (e.key === 'End') value = 359;
    else return;

    e.preventDefault();
    value = Math.max(0, Math.min(359, value));
    this.setHue(value);
    this.updateHuePicker();
  };

  ColorPicker.prototype.handleAlphaKeydown = function handleAlphaKeydown(e) {
    let value = parseFloat(this.color.a);
    let step = e.shiftKey ? 0.1 : 0.01;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') value -= step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') value += step;
    else if (e.key === 'Home') value = 0;
    else if (e.key === 'End') value = 1;
    else return;

    e.preventDefault();
    this.setAlpha(Math.max(0, Math.min(1, value)));
  };

  /*************************************************************************/
  //    更新 UI 元素的属性
  /*************************************************************************/

  ColorPicker.prototype.updateColor = function updateColor(e) {
    let rect = this.picking_area.getBoundingClientRect();
    let x = e.clientX - rect.left - this.picking_area.clientLeft;
    let y = e.clientY - rect.top - this.picking_area.clientTop;
    let picker_offset = 5;

    // 长宽应一致
    let size = this.picking_area.clientWidth;

    if (x > size) x = size;
    if (y > size) y = size;
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    let value = 100 - (y * 100 / size) | 0;
    let saturation = x * 100 / size | 0;

    if (this.picker_mode === 'HSV')
      this.color.setHSV(this.color.hue, saturation, value);
    if (this.picker_mode === 'HSL')
      this.color.setHSL(this.color.hue, saturation, value);

    this.color_picker.style.left = x - picker_offset + 'px';
    this.color_picker.style.top = y - picker_offset + 'px';

    this.updateAlphaGradient();
    this.updatePreviewColor();

    this.notify('value', value);
    this.notify('lightness', value);
    this.notify('saturation', saturation);

    this.notify('red', this.color.r);
    this.notify('green', this.color.g);
    this.notify('blue', this.color.b);
    this.notify('hexa', this.color.getHexa(true));
    this.updateAria();

    notify(this.topic, this.color);
  };

  ColorPicker.prototype.updateHueSlider = function updateHueSlider(e) {
    let rect = this.hue_area.getBoundingClientRect();
    let x = e.clientX - rect.left - this.hue_area.clientLeft;
    let width = this.hue_area.clientWidth;

    if (x < 0) x = 0;
    if (x > width) x = width;

    // TODO 360 => 359
    let hue = ((359 * x) / width) | 0;
    // if (hue === 360) hue = 359;

    this.updateSliderPosition(this.hue_picker, x);
    this.setHue(hue);
  };

  ColorPicker.prototype.updateAlphaSlider = function updateAlphaSlider(e) {
    let rect = this.alpha_area.getBoundingClientRect();
    let x = e.clientX - rect.left - this.alpha_area.clientLeft;
    let width = this.alpha_area.clientWidth;

    if (x < 0) x = 0;
    if (x > width) x = width;

    this.setAlpha(x / width);
    this.updateSliderPosition(this.alpha_picker, x);
  };

  ColorPicker.prototype.setHue = function setHue(value) {
    this.color.setHue(value);

    this.updatePickerBackground();
    this.updateAlphaGradient();
    this.updatePreviewColor();

    this.notify('red', this.color.r);
    this.notify('green', this.color.g);
    this.notify('blue', this.color.b);
    this.notify('hexa', this.color.getHexa(true));
    this.notify('hue', this.color.hue);
    this.updateAria();

    notify(this.topic, this.color);
  };

  // 当饱和度/色阶/亮度任一项改动时进行更新
  ColorPicker.prototype.updateSLV = function updateSLV() {
    this.updatePickerPosition();
    this.updateAlphaGradient();
    this.updatePreviewColor();

    this.notify('red', this.color.r);
    this.notify('green', this.color.g);
    this.notify('blue', this.color.b);
    this.notify('saturation', this.color.saturation);
    this.notify('value', this.color.value);
    this.notify('lightness', this.color.lightness);
    this.notify('hexa', this.color.getHexa(true));
    this.updateAria();

    notify(this.topic, this.color);
  };

  /*************************************************************************/
  //    更新各 UI 元素的位置
  /*************************************************************************/

  ColorPicker.prototype.updatePickerPosition = function updatePickerPosition() {
    let size = this.picking_area.clientWidth;
    let value = 0;
    let offset = 5;

    if (this.picker_mode === 'HSV')
      value = this.color.value;
    if (this.picker_mode === 'HSL')
      value = this.color.lightness;

    let x = (this.color.saturation * size / 100) | 0;
    let y = size - (value * size / 100) | 0;

    this.color_picker.style.left = x - offset + 'px';
    this.color_picker.style.top = y - offset + 'px';
  };

  ColorPicker.prototype.updateSliderPosition = function updateSliderPosition(elem, pos) {
    elem.style.left = Math.max(pos - 3, -2) + 'px';
  };

  ColorPicker.prototype.updateHuePicker = function updateHuePicker() {
    let size = this.hue_area.clientWidth;
    let offset = 1;
    let pos = (this.color.hue * size / 360 ) | 0;
    this.hue_picker.style.left = pos - offset + 'px';
  };

  ColorPicker.prototype.updateAlphaPicker = function updateAlphaPicker() {
    let size = this.alpha_area.clientWidth;
    let offset = 1;
    let pos = (this.color.a * size) | 0;
    this.alpha_picker.style.left = pos - offset + 'px';
  };

  /*************************************************************************/
  //     更新背景色
  /*************************************************************************/

  ColorPicker.prototype.updatePickerBackground = function updatePickerBackground() {
    let nc = new Color(this.color);
    nc.setHSV(nc.hue, 100, 100);
    this.picking_area.style.backgroundColor = nc.getHexa();
  };

  ColorPicker.prototype.updateAlphaGradient = function updateAlphaGradient() {
    this.alpha_mask.style.setProperty('--alpha-color', this.color.getHexa());
  };

  ColorPicker.prototype.updatePreviewColor = function updatePreviewColor() {
    this.preview_color.style.backgroundColor = this.color.getColor();
  };

  /*************************************************************************/
  //     更新输入元素
  /*************************************************************************/

  ColorPicker.prototype.inputChangeHue = function inputChangeHue(e) {
    let value = parseInt(e.target.value);
    this.setHue(value);
    this.updateHuePicker();
  };

  ColorPicker.prototype.inputChangeSaturation = function inputChangeSaturation(e) {
    let value = parseInt(e.target.value);
    this.color.setSaturation(value);
    e.target.value = this.color.saturation;
    this.updateSLV();
  };

  ColorPicker.prototype.inputChangeValue = function inputChangeValue(e) {
    let value = parseInt(e.target.value);
    this.color.setValue(value);
    e.target.value = this.color.value;
    this.updateSLV();
  };

  ColorPicker.prototype.inputChangeLightness = function inputChangeLightness(e) {
    let value = parseInt(e.target.value);
    this.color.setLightness(value);
    e.target.value = this.color.lightness;
    this.updateSLV();
  };

  ColorPicker.prototype.inputChangeRed = function inputChangeRed(e) {
    let value = parseInt(e.target.value);
    this.color.setByName('r', value);
    e.target.value = this.color.r;
    this.setColor(this.color);
  };

  ColorPicker.prototype.inputChangeGreen = function inputChangeGreen(e) {
    let value = parseInt(e.target.value);
    this.color.setByName('g', value);
    e.target.value = this.color.g;
    this.setColor(this.color);
  };

  ColorPicker.prototype.inputChangeBlue = function inputChangeBlue(e) {
    let value = parseInt(e.target.value);
    this.color.setByName('b', value);
    e.target.value = this.color.b;
    this.setColor(this.color);
  };

  ColorPicker.prototype.inputChangeAlpha = function inputChangeAlpha(e) {
    let value = parseFloat(e.target.value);

    if (this.color.isValidAlphaValue(value))
      this.setAlpha(value);
    else
      this.setColor(this.color);
  };

  ColorPicker.prototype.setAlpha = function setAlpha(value) {
    if (this.color.isValidAlphaValue(value) === false)
      return;

    this.color.a = parseFloat(value.toFixed(2));
    this.setColor(this.color);
  };

  ColorPicker.prototype.inputChangeHexa = function inputChangeHexa(e) {
    let value = e.target.value;
    this.color.setHexa(value);
    this.setColor(this.color);
  };

  /*************************************************************************/
  //      内部 Pub/Sub
  /*************************************************************************/

  ColorPicker.prototype.subscribe = function subscribe(topic, callback) {
    this.subscribers[topic] = callback;
  };

  ColorPicker.prototype.notify = function notify(topic, value) {
    if (this.subscribers[topic])
      this.subscribers[topic](value);
  };

  /*************************************************************************/
  //      设置汲取器属性
  /*************************************************************************/

  ColorPicker.prototype.setColor = function setColor(color) {
    if(color instanceof Color !== true) {
      console.log('Typeof parameter not Color');
      return;
    }

    if (color.format !== this.picker_mode) {
      color.setFormat(this.picker_mode);
      color.updateHSX();
    }

    this.color.copy(color);
    this.updateHuePicker();
    this.updatePickerPosition();
    this.updatePickerBackground();
    this.updateAlphaPicker();
    this.updateAlphaGradient();
    this.updatePreviewColor();

    this.notify('red', this.color.r);
    this.notify('green', this.color.g);
    this.notify('blue', this.color.b);

    this.notify('hue', this.color.hue);
    this.notify('saturation', this.color.saturation);
    this.notify('value', this.color.value);
    this.notify('lightness', this.color.lightness);

    this.notify('alpha', this.color.a);
    this.notify('hexa', this.color.getHexa(true));
    this.updateAria();
    notify(this.topic, this.color);
  };

  ColorPicker.prototype.setPickerMode = function setPickerMode(mode) {
    if (mode !== 'HSV' && mode !== 'HSL')
      return;

    this.picker_mode = mode;
    this.node.setAttribute('data-mode', this.picker_mode);
    this.setColor(this.color);
  };

  /*************************************************************************/
  //       未使用
  /*************************************************************************/

  let setPickerMode = function setPickerMode(topic, mode) {
    if (pickers[topic])
      pickers[topic].setPickerMode(mode);
  };

  let setColor = function setColor(topic, color) {
    if (pickers[topic])
      pickers[topic].setColor(color);
  };

  let getColor = function getColor(topic) {
    if (pickers[topic])
      return new Color(pickers[topic].color);
  };

  let subscribe = function subscribe(topic, callback) {
    if (subscribers[topic] === undefined)
      subscribers[topic] = [];

    subscribers[topic].push(callback);
  };

  let unsubscribe = function unsubscribe(topic, callback) {
    if (callback === undefined) {
      callback = topic;
      Object.keys(subscribers).forEach(function(topicName) {
        unsubscribe(topicName, callback);
      });
      return;
    }

    if (subscribers[topic] === undefined)
      return;

    let index = subscribers[topic].indexOf(callback);
    if (index !== -1)
      subscribers[topic].splice(index, 1);
  };

  let notify = function notify(topic, value) {
    if (subscribers[topic] === undefined || subscribers[topic].length === 0)
      return;

    let color = new Color(value);
    for (let i in subscribers[topic])
      subscribers[topic][i](color);
  };

  let init = function init() {
    let elem = document.querySelectorAll('.ui-color-picker');
    let size = elem.length;
    for (let i = 0; i < size; i++)
      new ColorPicker(elem[i]);
  };

  return {
    init : init,
    Color : Color,
    RGBColor : RGBColor,
    RGBAColor : RGBAColor,
    HSVColor : HSVColor,
    HSVAColor : HSVAColor,
    HSLColor : HSLColor,
    HSLAColor : HSLAColor,
    setColor : setColor,
    getColor : getColor,
    subscribe : subscribe,
    unsubscribe : unsubscribe,
    setPickerMode : setPickerMode
  };

})();



/**
 * UI 滑块管理器
 */

let InputSliderManager = (function InputSliderManager() {

  let subscribers = {};
  let sliders = [];

  let InputComponent = function InputComponent(obj) {
    let input = document.createElement('input');
    input.id = obj.topic + '-slider-input';
    input.setAttribute('type', 'text');
    input.setAttribute('aria-label', obj.name || obj.topic);
    input.style.width = 50 + obj.precision * 10 + 'px';

    input.addEventListener('click', function(e) {
      this.select();
    });

    input.addEventListener('change', function(e) {
      let value = parseFloat(e.target.value);

      if (isNaN(value) === true)
        setValue(obj.topic, obj.value);
      else
        setValue(obj.topic, value);
    });

    return input;
  };

  let SliderComponent = function SliderComponent(obj, sign) {
    let slider = document.createElement('button');
    let startX = null;
    let start_value = 0;

    slider.setAttribute('type', 'button');
    slider.setAttribute('aria-label',
      (sign < 0 ? '减少' : '增加') + (obj.name || obj.topic));

    slider.addEventListener("click", function(e) {
      document.removeEventListener("mousemove", sliderMotion);
      setValue(obj.topic, obj.value + obj.step * sign);
    });

    slider.addEventListener("mousedown", function(e) {
      startX = e.clientX;
      start_value = obj.value;
      document.body.style.cursor = "e-resize";

      document.addEventListener("mouseup", slideEnd);
      document.addEventListener("mousemove", sliderMotion);
    });

    let slideEnd = function slideEnd(e) {
      document.removeEventListener("mousemove", sliderMotion);
      document.body.style.cursor = "auto";
      slider.style.cursor = "pointer";
    };

    let sliderMotion = function sliderMotion(e) {
      slider.style.cursor = "e-resize";
      let delta = (e.clientX - startX) / obj.sensitivity | 0;
      let value = delta * obj.step + start_value;
      setValue(obj.topic, value);
    };

    return slider;
  };

  let InputSlider = function(node) {
    let min  = parseFloat(node.getAttribute('data-min'));
    let max  = parseFloat(node.getAttribute('data-max'));
    let step = parseFloat(node.getAttribute('data-step'));
    let value = parseFloat(node.getAttribute('data-value'));
    let topic = node.getAttribute('data-topic');
    let unit = node.getAttribute('data-unit');
    let name  = node.getAttribute('data-info');
    let sensitivity = node.getAttribute('data-sensitivity') | 0;
    let precision = node.getAttribute('data-precision') | 0;

    this.min = isNaN(min) ? 0 : min;
    this.max = isNaN(max) ? 100 : max;
    this.precision = precision >= 0 ? precision : 0;
    this.step = step < 0 || isNaN(step) ? 1 : step.toFixed(precision);
    this.topic = topic;
    this.name = name || topic;
    this.node = node;
    this.unit = unit === null ? '' : unit;
    this.sensitivity = sensitivity > 0 ? sensitivity : 5;
    value = isNaN(value) ? this.min : value;

    let input = new InputComponent(this);
    let slider_left  = new SliderComponent(this, -1);
    let slider_right = new SliderComponent(this,  1);

    slider_left.className = 'ui-input-slider-left';
    slider_right.className = 'ui-input-slider-right';

    if (name) {
      let info = document.createElement('label');
      info.className = 'ui-input-slider-info';
      info.textContent = name;
      info.setAttribute('for', input.id);
      node.appendChild(info);
    }

    node.appendChild(slider_left);
    node.appendChild(input);
    node.appendChild(slider_right);

    this.input = input;
    sliders[topic] = this;
    setValue(topic, value);
  };

  InputSlider.prototype.setInputValue = function setInputValue() {
    this.input.value = this.value.toFixed(this.precision) + this.unit;
  };

  let setValue = function setValue(topic, value, send_notify) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    value = parseFloat(value.toFixed(slider.precision));

    if (value > slider.max) value = slider.max;
    if (value < slider.min) value = slider.min;

    slider.value = value;
    slider.node.setAttribute('data-value', value);

    slider.setInputValue();

    if (send_notify === false)
      return;

    notify.call(slider);
  };

  let setMax = function setMax(topic, value) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    slider.max = value;
    setValue(topic, slider.value);
  };

  let setMin = function setMin(topic, value) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    slider.min = value;
    setValue(topic, slider.value);
  };

  let setUnit = function setUnit(topic, unit) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    slider.unit = unit;
    setValue(topic, slider.value);
  };

  let setStep = function setStep(topic, value) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    slider.step = parseFloat(value);
    setValue(topic, slider.value);
  };

  let setPrecision = function setPrecision(topic, value) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    value = value | 0;
    slider.precision = value;

    let step = parseFloat(slider.step.toFixed(value));
    if (step === 0)
      slider.step = 1 / Math.pow(10, value);

    setValue(topic, slider.value);
  };

  let setSensitivity = function setSensitivity(topic, value) {
    let slider = sliders[topic];
    if (slider === undefined)
      return;

    value = value | 0;

    slider.sensitivity = value > 0 ? value : 5;
  };

  let getNode =  function getNode(topic) {
    return sliders[topic].node;
  };

  let getPrecision =  function getPrecision(topic) {
    return sliders[topic].precision;
  };

  let getStep =  function getStep(topic) {
    return sliders[topic].step;
  };

  let subscribe = function subscribe(topic, callback) {
    if (subscribers[topic] === undefined)
      subscribers[topic] = [];
    subscribers[topic].push(callback);
  };

  let unsubscribe = function unsubscribe(topic, callback) {
    if (subscribers[topic] === undefined)
      return;

    let index = subscribers[topic].indexOf(callback);
    if (index !== -1)
      subscribers[topic].splice(index, 1);
  };

  let notify = function notify() {
    if (subscribers[this.topic] === undefined)
      return;
    for (let i = 0; i < subscribers[this.topic].length; i++)
      subscribers[this.topic][i](this.value);
  };

  let createSlider = function createSlider(topic, label) {
    let slider = document.createElement('div');
    slider.className = 'ui-input-slider';
    slider.setAttribute('data-topic', topic);

    if (label !== undefined)
      slider.setAttribute('data-info', label);

    new InputSlider(slider);
    return slider;
  };

  let init = function init() {
    let elem = document.querySelectorAll('.ui-input-slider');
    let size = elem.length;
    for (let i = 0; i < size; i++)
      new InputSlider(elem[i]);
  };

  return {
    init : init,
    setMax : setMax,
    setMin : setMin,
    setUnit : setUnit,
    setStep : setStep,
    getNode : getNode,
    getStep : getStep,
    setValue : setValue,
    subscribe : subscribe,
    unsubscribe : unsubscribe,
    setPrecision : setPrecision,
    setSensitivity : setSensitivity,
    setSensivity : setSensitivity,
    getPrecision : getPrecision,
    createSlider : createSlider,
  };

})();

window.addEventListener("load", function() {
  ColorPickerTool.init();
});

let ColorPickerTool = (function ColorPickerTool() {

  /*========== 按 ID 获取 DOM 元素 ==========*/

  function getElemById(id) {
    return document.getElementById(id);
  }

  function allowDropEvent(e) {
    e.preventDefault();
  }

  /*========== 使元素随父元素改变尺寸 ==========*/

  let UIComponent = (function UIComponent() {

    function makeResizable(elem, axis) {
      let valueX = 0;
      let valueY = 0;
      let action = 0;

      let resizeStart = function resizeStart(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button !== 0)
          return;

        valueX = e.clientX - elem.clientWidth;
        valueY = e.clientY - elem.clientHeight;

        document.body.setAttribute('data-resize', axis);
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', resizeEnd);
      };

      let mouseMove = function mouseMove(e) {
        if (action >= 0)
          elem.style.width = e.clientX - valueX + 'px';
        if (action <= 0)
          elem.style.height = e.clientY - valueY + 'px';
      };

      let resizeEnd = function resizeEnd(e) {
        if (e.button !== 0)
          return;

        document.body.removeAttribute('data-resize', axis);
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', resizeEnd);
      };

      let handle = document.createElement('div');
      handle.className = 'resize-handle';

      if (axis === 'width') action = 1;
      else if (axis === 'height') action = -1;
      else axis = 'both';

      handle.className = 'resize-handle';
      handle.setAttribute('data-resize', axis);
      handle.addEventListener('mousedown', resizeStart);
      elem.appendChild(handle);
    }

    /*========== 让元素相对父元素可拖动 ==========*/

    let makeDraggable = function makeDraggable(elem, endFunction) {

      let offsetTop;
      let offsetLeft;

      elem.setAttribute('data-draggable', 'true');

      let dragStart = function dragStart(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target.getAttribute('data-draggable') !== 'true' ||
          e.target !== elem || e.button !== 0)
          return;

        offsetLeft = e.clientX - elem.offsetLeft;
        offsetTop = e.clientY - elem.offsetTop;

        document.addEventListener('mousemove', mouseDrag);
        document.addEventListener('mouseup', dragEnd);
      };

      let dragEnd = function dragEnd(e) {
        if (e.button !== 0)
          return;

        document.removeEventListener('mousemove', mouseDrag);
        document.removeEventListener('mouseup', dragEnd);
      };

      let mouseDrag = function mouseDrag(e) {
        elem.style.left = e.clientX - offsetLeft + 'px';
        elem.style.top = e.clientY - offsetTop + 'px';
      };

      elem.addEventListener('mousedown', dragStart, false);
    };

    return {
      makeResizable : makeResizable,
      makeDraggable : makeDraggable
    };

  })();

  /*========== 颜色类 ==========*/

  let Color = UIColorPicker.Color;
  let HSLColor = UIColorPicker.HSLColor;

  /**
   * ColorPalette（调色板）
   */
  let ColorPalette = (function ColorPalette() {

    let samples = [];
    let color_palette;
    let complementary;

    let hideNode = function(node) {
      node.setAttribute('data-hidden', 'true');
    };

    let ColorSample = function ColorSample(id) {
      let node = document.createElement('div');
      node.className = 'sample';

      this.uid = samples.length;
      this.node = node;
      this.color = new Color();

      node.setAttribute('data-sample-id', this.uid);
      node.setAttribute('draggable', 'true');
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', '0');
      node.setAttribute('aria-label', '调色板颜色 ' + (this.uid + 1));
      node.addEventListener('dragstart', this.dragStart.bind(this));
      node.addEventListener('click', this.pickColor.bind(this));
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.pickColor();
        }
      }.bind(this));

      samples.push(this);
    };

    ColorSample.prototype.updateBgColor = function updateBgColor() {
      this.node.style.backgroundColor = this.color.getColor();
    };

    ColorSample.prototype.updateColor = function updateColor(color) {
      this.color.copy(color);
      this.updateBgColor();
    };

    ColorSample.prototype.updateHue = function updateHue(color, degree, steps) {
      this.color.copy(color);
      let hue = (steps * degree + this.color.hue) % 360;
      if (hue < 0) hue += 360;
      this.color.setHue(hue);
      this.updateBgColor();
    };

    ColorSample.prototype.updateSaturation = function updateSaturation(color, value, steps) {
      let saturation = color.saturation + value * steps;
      if (saturation <= 0) {
        this.node.setAttribute('data-hidden', 'true');
        return;
      }

      this.node.removeAttribute('data-hidden');
      this.color.copy(color);
      this.color.setSaturation(saturation);
      this.updateBgColor();
    };

    ColorSample.prototype.updateLightness = function updateLightness(color, value, steps) {
      let lightness = color.lightness + value * steps;
      if (lightness <= 0) {
        this.node.setAttribute('data-hidden', 'true');
        return;
      }
      this.node.removeAttribute('data-hidden');
      this.color.copy(color);
      this.color.setLightness(lightness);
      this.updateBgColor();
    };

    ColorSample.prototype.updateBrightness = function updateBrightness(color, value, steps) {
      let brightness = color.value + value * steps;
      if (brightness <= 0) {
        this.node.setAttribute('data-hidden', 'true');
        return;
      }
      this.node.removeAttribute('data-hidden');
      this.color.copy(color);
      this.color.setValue(brightness);
      this.updateBgColor();
    };

    ColorSample.prototype.updateAlpha = function updateAlpha(color, value, steps) {
      let alpha = parseFloat(color.a) + value * steps;
      if (alpha <= 0) {
        this.node.setAttribute('data-hidden', 'true');
        return;
      }
      this.node.removeAttribute('data-hidden');
      this.color.copy(color);
      this.color.a = parseFloat(alpha.toFixed(2));
      this.updateBgColor();
    };

    ColorSample.prototype.pickColor = function pickColor() {
      UIColorPicker.setColor('picker', this.color);
    };

    ColorSample.prototype.dragStart = function dragStart(e) {
      e.dataTransfer.setData('sampleID', this.uid);
      e.dataTransfer.setData('location', 'palette-samples');
    };

    let Palette = function Palette(text, size) {
      this.samples = [];
      this.locked = false;

      let palette = document.createElement('div');
      let title = document.createElement('div');
      let controls = document.createElement('div');
      let container = document.createElement('div');
      let lock = document.createElement('button');

      container.className = 'container';
      title.className = 'title';
      palette.className = 'palette';
      controls.className = 'controls';
      lock.className = 'lock';
      lock.setAttribute('type', 'button');
      lock.setAttribute('aria-label', '锁定此色板');
      lock.setAttribute('aria-pressed', 'false');
      title.textContent = text;

      controls.appendChild(lock);
      container.appendChild(title);
      container.appendChild(controls);
      container.appendChild(palette);

      lock.addEventListener('click', function () {
        this.locked = !this.locked;
        lock.setAttribute('data-locked-state', this.locked);
        lock.setAttribute('aria-pressed', this.locked);
      }.bind(this));

      for(let i = 0; i < size; i++) {
        let sample = new ColorSample();
        this.samples.push(sample);
        palette.appendChild(sample.node);
      }

      this.container = container;
      this.title = title;
    };

    let createHuePalette = function createHuePalette() {
      let palette = new Palette('色调', 12);

      UIColorPicker.subscribe('picker', function(color) {
        if (palette.locked === true)
          return;

        for(let i = 0; i < 12; i++) {
          palette.samples[i].updateHue(color, 30, i);
        }
      });

      color_palette.appendChild(palette.container);
    };

    let createSaturationPalette = function createSaturationPalette() {
      let palette = new Palette('饱和度', 11);

      UIColorPicker.subscribe('picker', function(color) {
        if (palette.locked === true)
          return;

        for(let i = 0; i < 11; i++) {
          palette.samples[i].updateSaturation(color, -10, i);
        }
      });

      color_palette.appendChild(palette.container);
    };

    /* 亮度（Brightness 或 Lightness，取决于选择器模式） */
    let createVLPalette = function createSaturationPalette() {
      let palette = new Palette('亮度', 11);

      UIColorPicker.subscribe('picker', function(color) {
        if (palette.locked === true)
          return;

        if(color.format === 'HSL') {
          palette.title.textContent = '亮度';
          for(let i = 0; i < 11; i++)
            palette.samples[i].updateLightness(color, -10, i);
        }
        else {
          palette.title.textContent = '色阶';
          for(let i = 0; i < 11; i++)
            palette.samples[i].updateBrightness(color, -10, i);
        }
      });

      color_palette.appendChild(palette.container);
    };

    let isBlankPalette = function isBlankPalette(container, value) {
      if (value === 0) {
        container.setAttribute('data-collapsed', 'true');
        return true;
      }

      container.removeAttribute('data-collapsed');
      return false;
    };

    let createAlphaPalette = function createAlphaPalette() {
      let palette = new Palette('透明度', 10);

      UIColorPicker.subscribe('picker', function(color) {
        if (palette.locked === true)
          return;

        for(let i = 0; i < 10; i++) {
          palette.samples[i].updateAlpha(color, -0.1, i);
        }
      });

      color_palette.appendChild(palette.container);
    };

    let getSampleColor = function getSampleColor(id) {
      if (samples[id] !== undefined && samples[id]!== null)
        return new Color(samples[id].color);
    };

    let init = function init() {
      color_palette = getElemById('color-palette');

      createHuePalette();
      createSaturationPalette();
      createVLPalette();
      createAlphaPalette();

    };

    return {
      init : init,
      getSampleColor : getSampleColor
    };

  })();

  /**
   * 颜色信息
   */
  let ColorInfo = (function ColorInfo() {

    let info_box;
    let select;
    let RGBA;
    let HEXA;
    let HSLA;

    let updateInfo = function updateInfo(color) {
      if (parseFloat(color.a) === 1) {
        RGBA.info.textContent = 'RGB';
        HSLA.info.textContent = 'HSL';
      }
      else {
        RGBA.info.textContent = 'RGBA';
        HSLA.info.textContent = 'HSLA';
      }

      RGBA.value.setAttribute('aria-label', RGBA.info.textContent + ' 颜色值');
      HSLA.value.setAttribute('aria-label', HSLA.info.textContent + ' 颜色值');
      RGBA.copy.setAttribute('aria-label', '选择 ' + RGBA.info.textContent + ' 颜色值');
      HSLA.copy.setAttribute('aria-label', '选择 ' + HSLA.info.textContent + ' 颜色值');
      RGBA.value.value = color.getRGBA();
      HSLA.value.value = color.getHSLA();
      HEXA.value.value = color.getHexa(true);
    };

    let InfoProperty = function InfoProperty(info) {

      let node = document.createElement('div');
      let title = document.createElement('label');
      let value = document.createElement('input');
      let copy = document.createElement('button');

      node.className = 'property';
      title.className = 'type';
      value.className = 'value';
      copy.className = 'copy';

      title.textContent = info;
      value.id = 'color-info-' + info.toLowerCase();
      title.setAttribute('for', value.id);
      value.setAttribute('type', 'text');
      value.readOnly = true;
      value.setAttribute('aria-label', info + ' 颜色值');
      copy.setAttribute('type', 'button');
      copy.setAttribute('aria-label', '选择 ' + info + ' 颜色值');

      copy.addEventListener('click', function() {
        value.select();
      });

      node.appendChild(title);
      node.appendChild(value);
      node.appendChild(copy);

      this.node = node;
      this.value = value;
      this.info = title;
      this.copy = copy;

      info_box.appendChild(node);
    };

    let init = function init() {

      info_box = getElemById('color-info');

      RGBA = new InfoProperty('RGBA');
      HSLA = new InfoProperty('HSLA');
      HEXA = new InfoProperty('十六进制');

      UIColorPicker.subscribe('picker', updateInfo);

    };

    return {
      init: init
    };

  })();

  /**
   * 选择器颜色样本
   */
  let ColorPickerSamples = (function ColorPickerSamples() {

    let samples = [];
    let nr_samples = 0;
    let active = null;
    let container = null;
    let samples_per_line = 10;
    let trash_can = null;
    let base_color = new HSLColor(0, 50, 100);
    let add_btn;
    let add_btn_pos;

    let ColorSample = function ColorSample() {
      let node = document.createElement('div');
      node.className = 'sample';

      this.uid = samples.length;
      this.index = nr_samples++;
      this.node = node;
      this.color = new Color(base_color);

      node.setAttribute('data-sample-id', this.uid);
      node.setAttribute('draggable', 'true');
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', '0');
      node.setAttribute('aria-label', '颜色样本 ' + (this.uid + 1));

      node.addEventListener('dragstart', this.dragStart.bind(this));
      node.addEventListener('dragover' , allowDropEvent);
      node.addEventListener('drop'     , this.dragDrop.bind(this));
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });

      this.updatePosition(this.index);
      this.updateBgColor();
      samples.push(this);
    };

    ColorSample.prototype.updateBgColor = function updateBgColor() {
      this.node.style.backgroundColor = this.color.getColor();
    };

    ColorSample.prototype.updatePosition = function updatePosition(index) {
      this.index = index;
      this.posY = 5 + ((index / samples_per_line) | 0) * 52;
      this.posX = 5 + ((index % samples_per_line) | 0) * 52;
      this.node.style.top  = this.posY + 'px';
      this.node.style.left = this.posX + 'px';
    };

    ColorSample.prototype.updateColor = function updateColor(color) {
      this.color.copy(color);
      this.updateBgColor();
    };

    ColorSample.prototype.activate = function activate() {
      UIColorPicker.setColor('picker', this.color);
      this.node.setAttribute('data-active', 'true');
      this.node.setAttribute('aria-pressed', 'true');
    };

    ColorSample.prototype.deactivate = function deactivate() {
      this.node.removeAttribute('data-active');
      this.node.setAttribute('aria-pressed', 'false');
    };

    ColorSample.prototype.dragStart = function dragStart(e) {
      e.dataTransfer.setData('sampleID', this.uid);
      e.dataTransfer.setData('location', 'picker-samples');
    };

    ColorSample.prototype.dragDrop = function dragDrop(e) {
      e.stopPropagation();
      this.color = Tool.getSampleColorFrom(e);
      this.updateBgColor();
    };

    ColorSample.prototype.deleteSample = function deleteSample() {
      if (active === this)
        unsetActiveSample();
      container.removeChild(this.node);
      samples[this.uid] = null;
      nr_samples--;
    };

    let updateUI = function updateUI() {
      updateContainerProp();

      let index = 0;
      let nr = samples.length;
      for (let i=0; i < nr; i++)
        if (samples[i] !== null) {
          samples[i].updatePosition(index);
          index++;
        }

      AddSampleButton.updatePosition(index);
    };

    let deleteSample = function deleteSample(e) {
      trash_can.parentElement.setAttribute('data-drag-state', 'none');

      let location = e.dataTransfer.getData('location');
      if (location !== 'picker-samples')
        return;

      let sampleID = e.dataTransfer.getData('sampleID');
      if (samples[sampleID] === undefined || samples[sampleID] === null)
        return;
      samples[sampleID].deleteSample();

      updateUI();
    };

    let createDropSample = function createDropSample() {
      let sample = document.createElement('div');
      sample.id = 'drop-effect-sample';
      sample.className = 'sample';
      container.appendChild(sample);
    };

    let setActivateSample = function setActivateSample(e) {
      if (e.target.className !== 'sample')
        return;

      let sampleID = e.target.getAttribute('data-sample-id');
      if (sampleID === null || samples[sampleID] === undefined || samples[sampleID] === null)
        return;

      unsetActiveSample(active);
      Tool.unsetVoidSample();
      CanvasSamples.unsetActiveSample();
      active = samples[sampleID];
      active.activate();
    };

    let unsetActiveSample = function unsetActiveSample() {
      if (active)
        active.deactivate();
      active = null;
    };

    let getSampleColor = function getSampleColor(id) {
      if (samples[id] !== undefined && samples[id]!== null)
        return new Color(samples[id].color);
    };

    let updateContainerProp = function updateContainerProp() {
      samples_per_line = ((container.clientWidth - 5) / 52) | 0;
      samples_per_line = Math.max(1, samples_per_line);
      let height = 52 * (1 + (nr_samples / samples_per_line) | 0);
      container.style.height = height + 10 + 'px';
    };

    let AddSampleButton = (function AddSampleButton() {
      let node;
      let _index = 0;
      let _posX;
      let _posY;

      let updatePosition = function updatePosition(index) {
        _index = index;
        _posY = 5 + ((index / samples_per_line) | 0) * 52;
        _posX = 5 + ((index % samples_per_line) | 0) * 52;

        node.style.top  = _posY + 'px';
        node.style.left = _posX + 'px';
      };

      let addButtonClick = function addButtonClick() {
        let sample = new ColorSample();
        container.appendChild(sample.node);
        updatePosition(_index + 1);
        updateUI();
      };

      let init = function init() {
        node = document.createElement('div');
        let icon = document.createElement('div');

        node.className = 'sample';
        node.setAttribute('role', 'button');
        node.setAttribute('tabindex', '0');
        node.setAttribute('aria-label', '添加颜色样本');
        icon.id = 'add-icon';
        node.appendChild(icon);
        node.addEventListener('click', addButtonClick);
        node.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            addButtonClick();
          }
        });

        updatePosition(0);
        container.appendChild(node);
      };

      return {
        init : init,
        updatePosition : updatePosition
      };
    })();

    let init = function init() {
      container = getElemById('picker-samples');
      trash_can = getElemById('trash-can');

      AddSampleButton.init();

      for (let i=0; i<16; i++) {
        let sample = new ColorSample();
        container.appendChild(sample.node);
      }

      AddSampleButton.updatePosition(samples.length);
      updateUI();

      active = samples[0];
      active.activate();

      container.addEventListener('click', setActivateSample);

      trash_can.addEventListener('dragover', allowDropEvent);
      trash_can.addEventListener('dragenter', function() {
        this.parentElement.setAttribute('data-drag-state', 'enter');
      });
      trash_can.addEventListener('dragleave', function(e) {
        this.parentElement.setAttribute('data-drag-state', 'none');
      });
      trash_can.addEventListener('drop', deleteSample);

      UIColorPicker.subscribe('picker', function(color) {
        if (active)
          active.updateColor(color);
      });

    };

    return {
      init : init,
      getSampleColor : getSampleColor,
      unsetActiveSample : unsetActiveSample
    };

  })();

  /**
   * 画布样本
   */
  let CanvasSamples = (function CanvasSamples() {

    let active = null;
    let canvas = null;
    let samples = [];
    let zindex = null;
    let tutorial = true;

    let CanvasSample = function CanvasSample(color, posX, posY) {

      let node = document.createElement('div');
      let pick = document.createElement('button');
      let delete_btn = document.createElement('button');
      node.className = 'sample';
      pick.className = 'pick';
      delete_btn.className = 'delete';
      node.setAttribute('role', 'group');
      node.setAttribute('tabindex', '0');
      node.setAttribute('aria-label', '画布颜色样本');
      pick.setAttribute('type', 'button');
      delete_btn.setAttribute('type', 'button');
      pick.setAttribute('aria-label', '激活颜色样本');
      delete_btn.setAttribute('aria-label', '删除颜色样本');

      this.uid = samples.length;
      this.node = node;
      this.color = color;
      this.updateBgColor();
      this.zIndex = 1;

      node.style.top = posY - 50 + 'px';
      node.style.left = posX - 50 + 'px';
      node.setAttribute('data-sample-id', this.uid);

      node.appendChild(pick);
      node.appendChild(delete_btn);

      let activate = function activate() {
        setActiveSample(this);
      }.bind(this);

      node.addEventListener('dblclick', activate);
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          this.deleteSample();
        }
      }.bind(this));
      pick.addEventListener('click', activate);
      delete_btn.addEventListener('click', this.deleteSample.bind(this));

      UIComponent.makeDraggable(node);
      UIComponent.makeResizable(node);

      samples.push(this);
      canvas.appendChild(node);
      return this;
    };

    CanvasSample.prototype.updateBgColor = function updateBgColor() {
      this.node.style.backgroundColor = this.color.getColor();
    };

    CanvasSample.prototype.updateColor = function updateColor(color) {
      this.color.copy(color);
      this.updateBgColor();
    };

    CanvasSample.prototype.updateZIndex = function updateZIndex(value) {
      this.zIndex = value;
      this.node.style.zIndex = value;
    };

    CanvasSample.prototype.activate = function activate() {
      this.node.setAttribute('data-active', 'true');
      this.node.setAttribute('aria-label', '当前画布颜色样本');
      zindex.setAttribute('data-active', 'true');

      UIColorPicker.setColor('picker', this.color);
      InputSliderManager.setValue('z-index', this.zIndex);
    };

    CanvasSample.prototype.deactivate = function deactivate() {
      this.node.removeAttribute('data-active');
      this.node.setAttribute('aria-label', '画布颜色样本');
      zindex.removeAttribute('data-active');
    };

    CanvasSample.prototype.deleteSample = function deleteSample() {
      if (active === this)
        unsetActiveSample();
      canvas.removeChild(this.node);
      samples[this.uid] = null;
    };

    CanvasSample.prototype.updatePosition = function updatePosition(posX, posY) {
      this.node.style.top = posY - this.startY + 'px';
      this.node.style.left = posX - this.startX + 'px';
    };

    let canvasDropEvent = function canvasDropEvent(e) {
      let color = Tool.getSampleColorFrom(e);

      if (color) {
        let rect = canvas.getBoundingClientRect();
        let offsetX = e.clientX - rect.left - canvas.clientLeft;
        let offsetY = e.clientY - rect.top - canvas.clientTop;
        let sample = new CanvasSample(color, offsetX, offsetY);
        if (tutorial) {
          tutorial = false;
          canvas.removeAttribute('data-tutorial');
          let info = new CanvasSample(new Color(), 100, 100);
          info.node.setAttribute('data-tutorial', 'dblclick');
        }
      }

    };

    let setActiveSample = function setActiveSample(sample) {
      ColorPickerSamples.unsetActiveSample();
      Tool.unsetVoidSample();
      unsetActiveSample();
      active = sample;
      active.activate();
    };

    let unsetActiveSample = function unsetActiveSample() {
      if (active)
        active.deactivate();
      active = null;
    };

    let createToggleBgButton = function createToggleBgButton() {
      let button = document.createElement('button');
      let state = false;
      button.setAttribute('type', 'button');
      button.className = 'toggle-bg';
      button.setAttribute('aria-label', '切换画布背景');
      button.setAttribute('aria-pressed', 'false');
      canvas.appendChild(button);

      button.addEventListener('click', function() {
        state = !state;
        canvas.setAttribute('data-bg', state);
        button.setAttribute('aria-pressed', state);
      });
    };

    let init = function init() {
      canvas = getElemById('canvas');
      zindex = getElemById('zindex');

      canvas.addEventListener('dragover', allowDropEvent);
      canvas.addEventListener('drop', canvasDropEvent);

      createToggleBgButton();

      UIColorPicker.subscribe('picker', function(color) {
        if (active) active.updateColor(color);
      });

      InputSliderManager.subscribe('z-index', function (value) {
        if (active) active.updateZIndex(value);
      });

      UIComponent.makeResizable(canvas, 'height');
    };

    return {
      init : init,
      unsetActiveSample : unsetActiveSample
    };

  })();

  let StateButton = function StateButton(node, state) {
    this.state = false;
    this.callback = null;

    if (node.tagName !== 'BUTTON') {
      node.setAttribute('role', 'button');
      node.setAttribute('tabindex', '0');
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });
    }

    node.addEventListener('click', function() {
      this.state = !this.state;
      if (typeof this.callback === "function")
        this.callback(this.state);
    }.bind(this));
  };

  StateButton.prototype.set = function set() {
    this.state = true;
    if (typeof this.callback === "function")
      this.callback(this.state);
  };

  StateButton.prototype.unset = function unset() {
    this.state = false;
    if (typeof this.callback === "function")
      this.callback(this.state);
  };

  StateButton.prototype.subscribe = function subscribe(func) {
    this.callback = func;
  };


  /**
   * 工具
   */
  let Tool = (function Tool() {

    let samples = [];
    let controls = null;
    let void_sw;

    let createPickerModeSwitch = function createPickerModeSwitch() {
      let parent = getElemById('controls');
      let icon = document.createElement('button');
      let button = document.createElement('div');
      let hsv = document.createElement('button');
      let hsl = document.createElement('button');
      let active = null;

      icon.setAttribute('type', 'button');
      icon.setAttribute('aria-label', '切换颜色模式');
      icon.className = 'icon picker-icon';
      button.className = 'switch';
      button.setAttribute('role', 'group');
      button.setAttribute('aria-label', '颜色模式');
      hsv.setAttribute('type', 'button');
      hsl.setAttribute('type', 'button');
      button.appendChild(hsv);
      button.appendChild(hsl);

      hsv.textContent = 'HSV';
      hsl.textContent = 'HSL';

      active = hsl;
      active.setAttribute('data-active', 'true');
      active.setAttribute('aria-pressed', 'true');
      hsv.setAttribute('aria-pressed', 'false');

      function switchPickingModeTo(elem) {
        active.removeAttribute('data-active');
        active.setAttribute('aria-pressed', 'false');
        active = elem;
        active.setAttribute('data-active', 'true');
        active.setAttribute('aria-pressed', 'true');
        UIColorPicker.setPickerMode('picker', active.textContent);
      }

      let picker_sw = new StateButton(icon);
      picker_sw.subscribe(function() {
        if (active === hsv)
          switchPickingModeTo(hsl);
        else
          switchPickingModeTo(hsv);
      });

      hsv.addEventListener('click', function() {
        switchPickingModeTo(hsv);
      });
      hsl.addEventListener('click', function() {
        switchPickingModeTo(hsl);
      });

      parent.appendChild(icon);
      parent.appendChild(button);
    };

    let setPickerDragAndDrop = function setPickerDragAndDrop() {
      let preview = document.querySelector('#picker .preview-color');
      let picking_area = document.querySelector('#picker .picking-area');

      preview.setAttribute('draggable', 'true');
      preview.addEventListener('drop', drop);
      preview.addEventListener('dragstart', dragStart);
      preview.addEventListener('dragover', allowDropEvent);

      picking_area.addEventListener('drop', drop);
      picking_area.addEventListener('dragover', allowDropEvent);

      function drop(e) {
        let color = getSampleColorFrom(e);
        UIColorPicker.setColor('picker', color);
      }

      function dragStart(e) {
        e.dataTransfer.setData('sampleID', 'picker');
        e.dataTransfer.setData('location', 'picker');
      }
    };

    let getSampleColorFrom = function getSampleColorFrom(e) {
      let sampleID = e.dataTransfer.getData('sampleID');
      let location = e.dataTransfer.getData('location');

      if (location === 'picker')
        return UIColorPicker.getColor(sampleID);
      if (location === 'picker-samples')
        return ColorPickerSamples.getSampleColor(sampleID);
      if (location === 'palette-samples')
        return ColorPalette.getSampleColor(sampleID);
    };

    let setVoidSwitch = function setVoidSwitch() {
      let void_sample = getElemById('void-sample');
      void_sw = new StateButton(void_sample);
      void_sw.subscribe( function (state) {
        void_sample.setAttribute('data-active', state);
        void_sample.setAttribute('aria-pressed', state);
        if (state === true) {
          ColorPickerSamples.unsetActiveSample();
          CanvasSamples.unsetActiveSample();
        }
      });
    };

    let unsetVoidSample = function unsetVoidSample() {
      void_sw.unset();
    };

    let init = function init() {
      controls = getElemById('controls');

      let color = new Color();
      color.setHSL(0, 51, 51);
      UIColorPicker.setColor('picker', color);

      setPickerDragAndDrop();
      createPickerModeSwitch();
      setVoidSwitch();
    };

    return {
      init : init,
      unsetVoidSample : unsetVoidSample,
      getSampleColorFrom : getSampleColorFrom
    };

  })();

  let init = function init() {
    UIColorPicker.init();
    InputSliderManager.init();
    ColorInfo.init();
    ColorPalette.init();
    ColorPickerSamples.init();
    CanvasSamples.init();
    Tool.init();
  };

  return {
    init : init
  };

})();
