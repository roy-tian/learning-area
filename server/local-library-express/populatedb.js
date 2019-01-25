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
const BookInstance  = require('./models/bookInstance');

const mongoose      = require('mongoose');
const mongoDB       = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise    = global.Promise;

const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

const authors       = [];
const genres        = [];
const books         = [];
const bookInstances = [];

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
        bookInstances.push(bookInstance);
        cb(null, book);
    });
}


function createGenres(cb) {
    async.parallel([
        callback => genreCreate("奇幻", callback),
        callback => genreCreate("科幻", callback),
        callback => genreCreate("诗歌", callback),
        callback => genreCreate("历史", callback),
        callback => genreCreate("伦理", callback)
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
            'The Name of the Wind (The Kingkiller Chronicle, #1)',
            'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.',
            '9781473211896',
            authors[0],
            [genres[0],],
            callback
        ),
    ], cb); // 可选回调
}


function createBookInstances(cb) {
    async.parallel([
        callback => bookInstanceCreate(
            books[0], 'London Gollancz, 2014.', false, 'Available', callback
        ),
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
            '藏书副本：' + bookInstances
        );
        // 操作完成，断开数据库连接
        db.close();
    }
);