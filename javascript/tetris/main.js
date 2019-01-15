const COLOR = [
    {LIGHT: '#fff',    MEDIUM: '#aaa',    DARK: '#888',    FADE: '#444'},    // White
    {LIGHT: '#f6685e', MEDIUM: '#f44335', DARK: '#aa2e25', FADE: '#801313'}, // I: Red
    {LIGHT: '#ffac33', MEDIUM: '#ff9800', DARK: '#b26a00', FADE: '#a13800'}, // T: Orange
    {LIGHT: '#6573c3', MEDIUM: '#3f51b5', DARK: '#2c387e', FADE: '#121858'}, // O: Indigo
    {LIGHT: '#ffef62', MEDIUM: '#ffeb3b', DARK: '#b2a429', FADE: '#ab5810'}, // J: Yellow
    {LIGHT: '#ed4b82', MEDIUM: '#e91e63', DARK: '#a31545', FADE: '#5f0937'}, // L: Pink
    {LIGHT: '#6fbf73', MEDIUM: '#4caf50', DARK: '#357a38', FADE: '#124116'}, // S: Green
    {LIGHT: '#4dabf5', MEDIUM: '#2196f3', DARK: '#1769aa', FADE: '#093170'}  // Z: Blue
];

const BLOCKS = [ [],
    [
        [ [1], [1], [1], [1] ],
        [ [1,1,1,1] ]
    ], [
        [ [1,1,1], [0,1,0] ],
        [ [0,1], [1,1], [0,1] ],
        [ [0,1,0], [1,1,1] ],
        [ [1,0], [1,1], [1,0] ]
    ], [
        [ [1,1], [1,1] ]
    ], [
        [ [0,1], [0,1], [1,1] ],
        [ [1,0,0], [1,1,1] ],
        [ [1,1], [1,0], [1,0] ],
        [ [1,1,1], [0,0,1] ]
    ], [
        [ [1,0], [1,0], [1,1] ],
        [ [1,1,1], [1,0,0] ],
        [ [1,1], [0,1], [0,1] ],
        [ [0,0,1], [1,1,1] ]
    ], [
        [ [0,1,1], [1,1,0] ],
        [ [1,0], [1,1], [0,1] ]
    ],
    [
        [ [1,1,0], [0,1,1] ],
        [ [0,1], [1,1], [1,0] ]
    ]
];

const canvas = document.getElementById('cvs-tetris');
const ctx = canvas.getContext('2d');
let width, height;   // 窗口的尺寸
let rem;             // 相对单位，等于单个方块的宽度
let layout;          // detail | regular | slim
let score = 0, lines = 0, level = 0;
const count = [0, 0, 0, 0, 0, 0, 0, 0];
const panel = [];
let currentCol = 3, currentRow = 0;
let current, next = newBlock();
let interval, paused = false;

initPanel();
pushBlock();
setLayout();
window.onresize = setLayout;
window.onkeydown = onKeyDown;

interval = window.setInterval(moveDown, 1000 - level * 100);

function setSizeEnv() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    rem = height / 22;

    if (width >= rem*28)
        layout = 'detail';
    else if ( width < rem*28 && width >= rem*17 )
        layout = 'regular';
    else {
        layout = 'slim';
        rem = height / 20;
        if ( width < rem*10 )
            rem = width / 10;
    }
}

function setBackground() {
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
}

function setGameBox() {
    let X, Y = rem;
    if (layout === 'detail')
        X = width/2 - rem*13;
    else if (layout === 'regular')
        X = width/2 - rem*7.5;
    else if (layout === 'slim') {
        X = width/2 - rem*5;
        Y = height/2 - rem*10;
    }

    ctx.save();
    ctx.fillStyle = COLOR[level].FADE;
    ctx.fillRect(X - 2, Y - 2, rem*10 + 2, rem*20 + 2);

    for (let i = 0; i < 20; i++)
        for (let j = 0; j < 10; j++)
            if (panel[i][j] === 1) {
                ctx.fillStyle = COLOR[level].DARK;
                ctx.fillRect(X + rem*j - 1,  Y + rem*i - 1, rem + 1, rem + 1);
            }

    drawBlock(current.number, current.sequence, 1,
              X + rem*currentCol, Y + rem*currentRow);

    ctx.restore();
}


function setInfoBox() {

    ctx.save();
    if (layout === 'detail' || layout === 'regular') {
        const X = layout === 'regular' ? width/2 + rem*3.5 : width/2 - rem*2,
              Y = rem*4;

        ctx.fillStyle = '#000';
        ctx.fillRect(X, Y, rem*4, rem*15);
        ctx.fillStyle = COLOR[level].FADE;
        ctx.fillRect(X, Y + rem*6.5, rem*4, rem);
        ctx.fillRect(X, Y + rem*9.5, rem*4, rem);
        ctx.fillRect(X, Y + rem*12.5, rem*4, rem);

        ctx.fillStyle = COLOR[level].LIGHT;
        ctx.font = rem + 'px 微软雅黑';
        ctx.fillText('下一方块', X, Y);
        ctx.fillText('当前关卡', X, Y + rem*6);
        ctx.fillText('已消层数', X, Y + rem*9);
        ctx.fillText('当前得分', X, Y + rem*12);

        ctx.font = rem + 'px Consolas';
        const numberX = 
            (number) => X + rem*0.08 + rem*0.55 * (7 - String(number).length);
        ctx.fillText(level, numberX(level), Y + rem* 7.3);
        ctx.fillText(lines, numberX(lines), Y + rem*10.3);
        ctx.fillText(score, numberX(score), Y + rem*13.3);

        drawBlock(next.number, next.sequence, 1, X, Y + rem*0.5);
    } else {
        const rightX = width/2 + rem*2.8,
              Y = height/2 - rem*9.4;
        ctx.fillStyle = COLOR[level].LIGHT;
        ctx.font = rem*0.5 + 'px consolas';
        ctx.globalAlpha = 0.5;
        ctx.fillText(lines, width/2 - rem*4.8, Y);

        ctx.font = rem*0.5 + 'px 微软雅黑';
        ctx.fillText('下一方块', rightX, Y);

        drawBlock(next.number, next.sequence, 0.5, rightX, Y + rem*0.2);
    }
    ctx.restore();
}

function setStatBox() {
    if (layout === 'detail') {
        const X = width/2 + rem*3,
            Y = rem,
            blockY = height - rem*4;
        ctx.save();
        ctx.fillStyle = COLOR[level].FADE;
        ctx.fillRect( X - 1, Y - 1, rem*10 + 1, rem*20 + 1);

        ctx.fillStyle = '#000';
        ctx.font = rem*2 + 'px 微软雅黑';
        ctx.fillText('方块统计',  X + rem*1.5, Y + rem*2.8);

        drawBlock(1, 0, 0.5,  X + rem*0.85,  blockY);
        drawBlock(2, 1, 0.5,  X + rem*1.9,  blockY);
        drawBlock(3, 0, 0.5,  X + rem*3.2,  blockY);
        drawBlock(4, 0, 0.5,  X + rem*4.5,  blockY);
        drawBlock(5, 0, 0.5,  X + rem*5.8,  blockY);
        drawBlock(6, 1, 0.5,  X + rem*7.1,  blockY);
        drawBlock(7, 1, 0.5,  X + rem*8.4,  blockY);

        for (let i = 1; i <= 7; i++) {
            ctx.fillStyle = COLOR[i].DARK;
            ctx.fillRect(X + rem*0.7 + rem*(i - 1)*1.3,
                         Y + rem*16.5 - rem*0.2*count[i],
                         rem*0.8, rem*0.2* count[i]);
        }
        ctx.restore();
    }
}


function drawBlock(number, sequence, size, x, y) {
    ctx.save();
    ctx.fillStyle = COLOR[number].MEDIUM;
    for (let i = 0; i < blockHeight(number, sequence); i++) {
        for (let j = 0; j < blockWidth(number, sequence); j++) {
            if (blockMatrix(number, sequence)[i][j] === 1) {
                ctx.fillRect(x + j*rem*size-1, y + i*rem*size-1,
                             rem*size+1, rem*size+1);
            }
        }
    }
    ctx.restore();
}

function initPanel() {
    for (let i = 0; i < 20; i++) {
        const cur = [];
        for (let j = 0; j < 10; j++) {
            cur.push(0);
        }
        panel.push(cur);
    }
}

function clearPanel() {
    for (let i = currentRow; i < currentRow + blockHeight(); i++) {
        if ( panel[i].reduce( (arr, cur) => arr + cur ) === 10 ) {
            lines++;
            if (lines % 10 === 0)
                level++;
            for (let j = i; j > 0; j--) {
                panel[j] = panel[j-1];
            }
            panel[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }
}

function pushBlock() {
    currentRow = 0;
    currentCol = 3;
    current = next;
    if ( fit() ) {
        next = newBlock();
        count[0]++;
        count[current.number]++;
        return true;
    }
    else return false;
}

function acceptBlock() {
    for (let i = 0; i < blockHeight(); i++)
        for (let j = 0; j < blockWidth(); j++)
             if (panel[currentRow+i][currentCol+j] === 0)
                 panel[currentRow+i][currentCol+j] = blockMatrix()[i][j];
}

function onKeyDown(e) {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowUp':
            turnClockwise();
            break;
        case ' ':
            pauseGame();
            break;
    }
}

function moveLeft() {
    if (!paused) {
        if (fit(currentRow, currentCol - 1))
            currentCol--;
        setLayout();
    }
}

function moveRight() {
    if (!paused) {
        if (fit(currentRow, currentCol + 1))
            currentCol++;
        setLayout();
    }
}

function moveDown() {
    if (!paused) {
        if (fit(currentRow + 1, currentCol)) {
            currentRow++;
        } else {
            acceptBlock();
            clearPanel();
            pushBlock();
        }
        setLayout();
    }
}

function turnClockwise() {
    if (!paused) {
        const turnSq = (current.sequence + 1) % BLOCKS[current.number].length;

        if (fit(currentRow, currentCol, current.number, turnSq))
            current.sequence = turnSq;
        else {
            let i = 0, j = 0;
            const diff = Math.abs(blockWidth() - blockHeight());
            for (; i <= diff; i++)
                if (fit(currentRow, currentCol - i, current.number, turnSq))
                    break;
            if (i === diff + 1) i = 0;
            for (; j <= diff; j++)
                if (fit(currentRow - j, currentCol - i, current.number, turnSq))
                    break;
            if (j === diff + 1) j = 0;
            if (i + j > 0) {
                currentRow -= j;
                currentCol -= i;
                current.sequence = turnSq;
            }
        }
        setLayout();
    }
}

function pauseGame() {
    if (paused === true) {
        interval = window.setInterval(moveDown, 1000 - level * 100);
        paused = false;
    } else {
        window.clearInterval(interval);
        paused = true;
    }

}

function newBlock() {
    const n = rand(1, 7), s = rand(0, 3) % BLOCKS[n].length;
    return { number: n, sequence: s };
}

function fit(row = currentRow, col = currentCol, 
             number = current.number, sequence = current.sequence)  {
    if ( row < 0 || row > 20-blockHeight(number, sequence) ||
         col < 0 || col > 10-blockWidth(number, sequence) )
        return false;
    for (let i = 0; i < blockHeight(number, sequence); i++) {
        for (let j = 0; j < blockWidth(number, sequence); j++) {
            if ( blockMatrix(number, sequence)[i][j] + panel[row+i][col+j] ===
                 2 ) {
                return false;
            }
        }
    }
    return true;
}

function blockWidth(number = current.number, sequence = current.sequence) {
    return BLOCKS[number][sequence][0].length;
}

function blockHeight(number = current.number, sequence = current.sequence) {
    return BLOCKS[number][sequence].length;
}

function blockMatrix(number = current.number, sequence = current.sequence) {
    return BLOCKS[number][sequence];
}

function rand(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function setLayout() {
    setSizeEnv();
    setBackground();
    setGameBox();
    setInfoBox();
    setStatBox();
}
