const boards = [
    {
    cells: [
    ["E", "L", "W", "Y", "C"],
    ["Y", "L", "O", "A", "N"],
    ["U", "B", "L", "E", "E"],
    ["E", "L", "P", "M", "V"],
    ["P", "U", "R", "A", "U"]],
    words: ["CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE"]
    },
    {
    cells: [
    ["E", "K", "O", "A", "P"],
    ["A", "W", "L", "I", "R"],
    ["N", "S", "F", "A", "T"],
    ["L", "E", "E", "R", "A"],
    ["A", "G", "G", "U", "J"]],
    words: ["TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"]
    },
    {
    cells: [
    ["H", "C", "N", "A", "N"],
    ["Y", "R", "A", "A", "A"],
    ["R", "E", "A", "Y", "B"],
    ["F", "P", "P", "E", "R"],
    ["I", "G", "A", "P", "A"]],
    words: ["CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG"]
    },
    ]
    let score = 0;
    let board = 0;
    let selectedX = -1;
    let selectedY = -1;
    let primaryColor = "papayawhip";
    let secondaryColor = "linen";
    let tertiaryColor = "black";
    const CELLS = makeCellList();
    let confettiHeight = 0;
    reset();
    
    function colorPalette() {
    switch (board) {
    case 0: {
    primaryColor = "papayawhip";
    secondaryColor = "linen";
    tertiaryColor = "black";
    
    break
    }
    case 1: {
    primaryColor = "maroon";
    secondaryColor = "firebrick";
    tertiaryColor = "red";
    
    break
    }
    case 2: {
    primaryColor = "forestgreen";
    secondaryColor = "mediumseagreen";
    tertiaryColor = "darkgreen";
    break
    }
    }
    console.log("go");
    }
    function confetti() {
    console.log("yay");
    confettiHeight = -1920;
    }
    function makeCellList() {
    let cells = Array.from(document.getElementById("cell-holder").children);
    let cellBoard = [];
    for (let i = 0; i < 5; i++) {
    cellBoard.push(cells.slice(i * 5, i * 5 + 5));
    }
    return cellBoard;
    }
    
    
    function setupGame(board) {
    for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
    CELLS[j][i].innerHTML = board[j][i];
    }
    }
    }
    
    function select(x, y) {
    let cell = CELLS[y][x];
    if (cell.innerHTML.length > 0) {
    selectedX = x;
    selectedY = y;
    cell.classList.add("selected");
    }
    }
    
    function unselect(x, y) {
    CELLS[y][x].classList.remove("selected");
    selectedX = -1;
    selectedY = -1;
    }
    
    
    function move(x, y) {
    CELLS[y][x].innerHTML = CELLS[selectedY][selectedX].innerHTML + CELLS[y][x].innerHTML;
    CELLS[selectedY][selectedX].innerHTML = "";
    unselect(selectedX, selectedY);
    select(x, y);
    for (let i = 0; i < boards[board].words.length; i++) {
    if (boards[board].words[i] == CELLS[y][x].innerHTML) {
    score += CELLS[y][x].innerHTML.length * 40;
    document.getElementById("score").innerHTML = "Score: " + score;
    if (score == 1000) {
    confetti();
    }
    }
    }
    }
    
    function canMove(x, y) {
    let isNextTo = Math.abs(selectedX - x) + Math.abs(selectedY - y) == 1;
    
    return selectedX >= 0 && selectedY >= 0 && isNextTo && CELLS[y][x].innerHTML.length > 0;
    }
    
    function onClick(x, y) {
    if (selectedX == x && selectedY == y) {
    unselect(x, y)
    } else if (canMove(x, y)) {
    move(x, y);
    } else {
    if (selectedX >= 0 && selectedY >= 0) {
    unselect(selectedX, selectedY);
    }
    select(x, y);
    
    }
    
    }
    
    function reset() {
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    if (selectedX >= 0 && selectedY >= 0) {
    unselect(selectedX, selectedY);
    }
    makeCellList();
    setupGame(boards[board].cells);
    document.getElementById("words").innerHTML = "Words to spell: " + boards[board].words.join(", ");
    document.getElementById("display").innerHTML = board + 1 + "";
    colorPalette();
    }
    
    function random() {
    let newBoard = Math.floor(Math.random() * boards.length);
    while (newBoard == board) {
    newBoard = Math.floor(Math.random() * boards.length);
    }
    board = newBoard;
    reset();
    }
    
    function left() {
    board--;
    if (board < 0) {
    board = 0;
    } else {
    reset();
    }
    }
    
    function right() {
    board++;
    if (board >= boards.length) {
    board = boards.length - 1;
    } else {
    reset();
    }
    }
    function onFrame() {
    if (confettiHeight < 0) {
    confettiHeight += 10;
    }
    document.body.style = "--primaryColor: " + primaryColor + ";--secondaryColor: " + secondaryColor + ";--tertiaryColor:" + tertiaryColor + ";--confettiY:" + confettiHeight + "px";
    requestAnimationFrame(onFrame)
    }
    onFrame()