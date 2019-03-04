const CODE_DB = {
  'italics': {
    original: '刀枪剑戟 斧钺钩叉',
    answer: '<i>刀枪剑戟 斧钺钩叉</i>'
  },
  'link': {
    original: '<p>欲练葵花宝典，需引刀自宫</p>',
    answer: '<p>欲练<a href="https://zh.wikipedia.org/zh-hans/葵花宝典" title="葵花宝典简介" target="_blank">葵花宝典</a>，需引刀自宫</p>'
  },
  'image': {
    original: '<p>相思无用，惟别而已。别期若有定，千般煎熬又何如？莫道黯然销魂，何处柳暗花明？</p>',
    answer:
`<h1>经典回忆</h1>
<p>
  相思无用，惟别而已。别期若有定，千般煎熬又何如？莫道黯然销魂，何处<strong>柳暗花明</strong>？<br>
  ——《<a href="https://zh.wikipedia.org/zh-hans/神鵰俠侶">神雕侠侣</a>》
</p>
<img src="images/sdxl.jfif">`
  }
};