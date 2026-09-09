const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = '外面是 94 华氏度，所以 :insertx: 出去散步了。当他们到达 :inserty: 时，他们惊恐地盯着那里几秒钟，然后 :insertz:。Bob 看到了整个过程，但并不惊讶——:insertx: 重 300 磅，而且那天很热。';
const insertX = ['哥布林威利', '大爸爸', '圣诞老人'];
const insertY = ['施粥所', '迪士尼乐园', '白宫'];
const insertZ = ['突然自燃了', '在人行道融成了一滩', '变成蛞蝓爬走了'];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:',xItem);
  newStory = newStory.replaceAll(':inserty:',yItem);
  newStory = newStory.replaceAll(':insertz:',zItem);

  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300*0.0714286)} 英石`;
    const temperature =  `${Math.round((94-32) * 5 / 9)} 摄氏度`;
    newStory = newStory.replaceAll('94 华氏度', temperature);
    newStory = newStory.replaceAll('300 磅', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
