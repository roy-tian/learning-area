#! /usr/bin/env node

console.log('此脚本为数据库填充一些测试藏书、作者、藏书种类、藏书类型。将数据库地址作为参数，比如：populatedb mongodb://your_username:your_password@your_dabase_url。');

// 从命令行取得参数
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('错误：需要指定一个合法的 MongoDB URL 作为第一个参数。');
  return;
}

const async         = require('async');
const Book          = require('./models/book');
const Author        = require('./models/author');
const Genre         = require('./models/genre');
const BookInstance  = require('./models/bookinstance');

const mongoose      = require('mongoose');
const mongoDB       = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise    = global.Promise;

const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

const authors       = [];
const genres        = [];
const books         = [];
const bookinstances = [];

function authorCreate(first_name, family_name, d_birth, d_death, cb) {
  const author = new Author({
    first_name    : first_name,
    family_name   : family_name,
    date_of_birth : (d_birth !== false) ? d_birth : undefined,
    date_of_death : (d_death !== false) ? d_death : undefined
  });
     
  author.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('新建作者：' + author);
    authors.push(author);
    cb(null, author);
  });
}

function genreCreate(name, cb) {
  const genre = new Genre({ name: name });
     
  genre.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('新建藏书种类：' + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function bookCreate(title, summary, isbn, author, genre, cb) {
  const book = new Book({
    title   : title,
    summary : summary,
    author  : author,
    isbn    : isbn,
    genre   : (genre !== false) ? genre : undefined
  });

  book.save( err => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('新建藏书：' + book);
    books.push(book);
    cb(null, book);
  });
}


function bookInstanceCreate(book, imprint, due_back, status, cb) {
  const bookInstance = new BookInstance({
    book     : book,
    imprint  : imprint,
    due_back : (due_back !== false) ? due_back : undefined,
    status   : (status !== false) ? status : undefined
  });
  
  bookInstance.save( err => {
    if (err) {
      console.log('[错误]无法创建藏书副本：' + bookInstance);
      cb(err, null);
      return;
    }
    console.log('新建藏书副本：' + bookInstance);
    bookinstances.push(bookInstance);
    cb(null, book);
  });
}


function createGenres(cb) {
  async.parallel([
    callback => genreCreate('奇幻', callback),
    callback => genreCreate('科幻', callback),
    callback => genreCreate('诗歌', callback),
    callback => genreCreate('历史', callback),
    callback => genreCreate('伦理', callback)
  ], cb); // 可选回调
}

function createAuthors(cb) {
  async.parallel([
    callback => authorCreate('迁', '司马', false, false, callback),
    callback => authorCreate('笑笑生', '兰陵', false, false, callback),
    callback => authorCreate('迅', '鲁', '1881-9-25', '1936-10-19', callback),
    callback => authorCreate('言', '莫', '1955-2-17', false, callback),
    callback => authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback)
  ], cb); // 可选回调
}

function createBooks(cb) {
  async.parallel([
    callback => bookCreate(
      '史记',
      '《史记》是我国首部通史，是“二十四史”中极早的一部，也是极重要的一部史书。全书共一百三十篇。《史记》叙事，始自黄帝，下迄西汉太初，采用了综合性的叙事模式，囊括记言、纪事、编年、国别等形式，开创纪传体史书“纪、传、表、志”的体例。就内容而言，《史记》是对前代史学的一次总结；就体例而言，《史记》也是集大成之作。',
      '9787101103144',
      authors[0],
      [genres[3],],
      callback
    ),
    callback => bookCreate(
      '金瓶梅',
      '中国文学史上第一部由文人独立创作的长篇小说名著，在中国文学史上具有开拓性意义。小说借助宋朝旧事，以《水浒传》中武松杀嫂的故事为引子，通过对兼有官僚、恶霸、富商三种身份的市侩势力的代表人物西门庆及其家庭罪恶生活的描述，实际上展现的是明代中叶政治和社会的各种现象，深刻揭露了当时社会的黑暗和腐败，具有较高的认识价值。',
      '9787020131198',
      authors[1],
      [genres[0], genres[4]],
      callback
    ),
    callback => bookCreate(
      '狂人日记',
      '本书收录了鲁迅的小说集《呐喊》和《彷徨》的全部篇幅。鲁迅的小说数量不多，却篇篇经典，其内容多取材于病态的现实社会，对国民灵魂、知识分子的命运进行了深刻思考，同时善于从国家、民族生死存亡的高度，来认识、发掘问题的内在本质，铸造典型的艺术形象，因而具有极高的艺术价值。鲁迅的作品，不愧为中国社会从辛亥革命到第1次国内革命战争时期的一面镜子，堪称现代文学的典范。',
      '9787544369480',
      authors[2],
      [genres[4],],
      callback
    ),
    callback => bookCreate(
      '朝花夕拾',
      '本书是一本具有鲜明的个性色彩的散文集。适性任隋、洒脱不羁，想说就说，想骂就骂，心中的种种爱憎悲欢，任其在笔下自然流泻。抒情、叙事和议论融为一体，优美和谐，朴实感人。',
      '9787514370829',
      authors[2],
      [genres[4],],
      callback
    ), 
    callback => bookCreate(
      '丰乳肥臀',
      '记录百年中国风云变幻的恢宏“史诗”，经由一双婴儿的眼睛，目睹一个家族历的战争、贫穷、、荒淫。有爱有欲，有生有死，有人性的愚昧、贪婪，也有人情的温暖、博爱。无情，有情，疯癫——用一个故事看懂中国。',
      '9787533946630',
      authors[3],
      [genres[3],genres[4]],
      callback
    ),
    callback => bookCreate(
      'Foundation',
      'The Foundation series is Isaac Asimov’s iconic masterpiece. Unfolding against the backdrop of a crumbling Galactic Empire, the story of Hari Seldon’s two Foundations is a lasting testament to an extraordinary imagination, one whose unprecedented scale shaped science fiction as we know it today.',
      '0008117497',
      authors[4],
      [genres[1],],
      callback
    )
  ], cb); // 可选回调
}

function createBookInstances(cb) {
  async.parallel([
    callback => bookInstanceCreate(
      books[0], '中华书局 2014年版', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[1], '人民文学出版社 汉日对照 2017年版', false, '已借出', callback
    ),
    callback => bookInstanceCreate(
      books[1], '人民文学出版社 汉法对照 2017年版', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[2], '海南出版社 2017年版', false, false, callback
    ),
    callback => bookInstanceCreate(
      books[2], '海南出版社 2017年版', false, '馆藏维护', callback
    ),
    callback => bookInstanceCreate(
      books[2], '海南出版社 2017年版', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[3], '中国友谊出版公司 2018版', false, '已借出', callback
    ),
    callback => bookInstanceCreate(
      books[3], '现代出版社 2018版', false, '馆藏维护', callback
    ),
    callback => bookInstanceCreate(
      books[4], '浙江文艺出版社 2017版', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[4], '浙江文艺出版社 2017版', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[4], '浙江文艺出版社 2017版', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[5], 'Harper Voyager, 2016.', false, '可供借阅', callback
    ),
    callback => bookInstanceCreate(
      books[5], 'Harper Voyager, 2016.', false, '馆藏维护', callback
    ),
    callback => bookInstanceCreate(
      books[5], 'Harper Voyager, 2016.', false, '已借出', callback
    )
  ], cb); // 可选回调
}

async.series (
  [
    createGenres,
    createAuthors,
    createBooks,
    createBookInstances
  ],
  // 可选回调
  (err, results) => {
    console.log(
      err ?
      '最终错误：' + err :
      '藏书副本：' + bookinstances
    );
    // 操作完成，断开数据库连接
    db.close();
  }
);