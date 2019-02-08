const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
const insertX = ['Willy the Goblin','Big Daddy','Father Christmas'];
const insertY = ['the soup kitchen','Disneyland','the White House'];
const insertZ = ['spontaneously combusted','melted into a puddle on the sidewalk','turned into a slug and crawled away'];

const storyTextZh = '外边有34度，于是:inserta:出去遛弯。当走到:insertb:时他们被眼前的景象惊呆了，然后就:insertc:。李雷全程目睹但他并没有慌，因为:inserta:是一个270斤的胖子，天气又辣么热。';
const insertA = ['怪兽威利', '大老爹', '圣诞老人'];
const insertB = ['救助站', '迪士尼乐园', '白宫'];
const insertC = ['自燃了', '在人行道化成了一坨泥', '变成一条鼻涕虫爬走了'];

randomize.addEventListener('click', result);

function result() {
  let newStory, xItem, yItem, zItem, name;
  if (document.getElementById('cn').checked) {
    newStory = storyTextZh;

    xItem = randomValueFromArray(insertA);
    yItem = randomValueFromArray(insertB);
    zItem = randomValueFromArray(insertC);

    newStory = newStory.replace(':inserta:', xItem);
    newStory = newStory.replace(':inserta:', xItem);
    newStory = newStory.replace(':insertb:', yItem);
    newStory = newStory.replace(':insertc:', zItem);

    if (customName.value !== '') {
      name = customName.value;
      newStory = newStory.replace('李雷', name);
    }
  } else {
    newStory = storyText;

    xItem = randomValueFromArray(insertX);
    yItem = randomValueFromArray(insertY);
    zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);

    if (customName.value !== '') {
      name = customName.value;
      newStory = newStory.replace('Bob', name);
    }

    if (document.getElementById("uk").checked) {
      const weight = Math.round(300 * 0.0714286) + ' stone';
      const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';
      newStory = newStory.replace('94 fahrenheit', temperature);
      newStory = newStory.replace('300 pounds', weight);
    }
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

