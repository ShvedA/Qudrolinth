var labirinth = new Array();
var sides = new Array("Border-Right", "Border-Bottom");
for (var rows = 0; rows < 9; rows++) 
labirinth[rows] = new Array();
labirinth[0][0] = new Array(0,0,0,0,0,0,0,0,0);
labirinth[0][1] = new Array(0,1,1,1,1,1,1,1,1);
labirinth[1][0] = new Array(1,0,1,1,1,0,0,0,1);
labirinth[1][1] = new Array(0,0,0,0,0,0,1,1,0);
labirinth[2][0] = new Array(1,1,0,1,0,0,0,1,1);
labirinth[2][1] = new Array(0,0,1,0,0,0,0,0,0);
labirinth[3][0] = new Array(1,1,0,0,1,1,1,1,1);
labirinth[3][1] = new Array(0,0,0,1,1,0,0,0,0);
labirinth[4][0] = new Array(1,1,1,0,0,0,1,0,1);
labirinth[4][1] = new Array(0,0,0,0,0,0,1,1,1);
labirinth[5][0] = new Array(1,0,0,1,1,1,0,0,1);
labirinth[5][1] = new Array(0,1,1,0,0,0,0,0,0);
labirinth[6][0] = new Array(1,0,0,1,1,0,0,1,1);
labirinth[6][1] = new Array(0,0,0,0,0,1,1,0,0);
labirinth[7][0] = new Array(1,1,1,0,0,0,0,1,1);
labirinth[7][1] = new Array(0,0,1,1,0,0,1,0,0);
labirinth[8][0] = new Array(1,0,0,0,1,0,0,0,1);
labirinth[8][1] = new Array(0,1,1,1,1,1,1,1,1);

var playerOne = "";

function showLabirinth() {
    var div = document.getElementById("secondTable");
    var table = document.createElement("table");
    table.className = "table table-bordered table-board";
    var tbody = document.createElement("tbody");
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var row = 0; row < labirinth.length; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < labirinth[row][0].length; col++) {
            var td = document.createElement("td")
            if (row == 0 && col > 0) {
                td.innerHTML=alphabet.charAt(col-1);   
            }
            if (col == 0 && row > 0) {
                td.innerHTML=row;   
            }
            if (labirinth[row][0][col] == 1) {
                td.className += " right-border";
            }
            if (labirinth[row][1][col] == 1) {
                td.className += " bottom-border";   
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
}

function makeEmptyTable() {
    var div = document.getElementById("firstTable");
    var table = document.createElement("table");
    table.className = "table table-bordered table-board";
    var tbody = document.createElement("tbody");
    var alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY";
    for(var row = 0; row < labirinth.length; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < labirinth[row][0].length; col++) {
            var td = document.createElement("td");
            if (row == 0 && col > 0) {
                td.innerHTML=alphabet.charAt(col);   
            } else if (col == 0 && row > 0) {
                td.innerHTML=row;   
            }
            if (!(col == 0 && row == 0)) {
                td.id = alphabet.charAt(col) + row;   
            }
            if (labirinth[row][0][col] == 1) {
                if (col == 0 || col == labirinth.length - 1) {
                    td.className += " right-border";
                } else {
                    td.className += " right-border-hidden";   
                }
            } else if (col > 0 && row > 0) {
                td.className += " right-no-border";   
            }
            if (labirinth[row][1][col] == 1) {
                if (row == 0 || row == labirinth.length - 1) {
                    td.className += " bottom-border";   
                } else {
                    td.className += " bottom-border-hidden";
                }
            } else if (col > 0 && row > 0) {
                td.className += " bottom-no-border";
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
}

function startFrom(letter, number) {
    var startCell = document.getElementById(letter + number);
    startCell.innerHTML = "P1";
    playerOne = letter + number;
}

function moveRight() {
    var startCell = $('#' + playerOne);
    if (startCell.hasClass("right-border-hidden")) {
        startCell.removeClass("right-border-hidden");
        startCell.addClass("right-border");
    } else if (!startCell.hasClass("right-border")) {
        if (startCell.hasClass("right-no-border")) {
            startCell.removeClass("right-no-border");  
        }   
        var nextCellId = String.fromCharCode(playerOne.charCodeAt(0) + 1) + playerOne.charAt(1);
        var nextCell = $('#' + nextCellId);
        startCell.html("");
        nextCell.html('P1');
        playerOne = nextCellId;
    }
}

function moveDown() {
    var startCell = $('#' + playerOne);
    if (startCell.hasClass("bottom-border-hidden")) {
        startCell.removeClass("bottom-border-hidden");
        startCell.addClass("bottom-border");
    } else if (!startCell.hasClass("bottom-border")) {
        if (startCell.hasClass("bottom-no-border")) {
            startCell.removeClass("bottom-no-border");  
        } 
        var nextCellId = playerOne.charAt(0) + String.fromCharCode(playerOne.charCodeAt(1) + 1);
        var nextCell = $('#' + nextCellId);
        startCell.html("");
        nextCell.html('P1');
        playerOne = nextCellId;
    }
}

function moveLeft() {
    var startCell = $('#' + playerOne);
    if (playerOne.charAt(0) == 'A') {
        var leftCellId = 'Z' + playerOne.charAt(1);   
    } else {
        var leftCellId = String.fromCharCode(playerOne.charCodeAt(0) - 1) + playerOne.charAt(1);
    }
    var leftCell = $('#' + leftCellId);
    if (leftCell.hasClass("right-border-hidden")) {
        leftCell.removeClass("right-border-hidden");
        leftCell.addClass("right-border");
    } else if (!leftCell.hasClass("right-border")) {
        if (leftCell.hasClass("right-no-border")) {
            leftCell.removeClass("right-no-border");  
        } 
        startCell.html("");
        leftCell.html('P1');
        playerOne = leftCellId;
    }
}

function moveUp() {
    var startCell = $('#' + playerOne);
    var upCellId = playerOne.charAt(0) + String.fromCharCode(playerOne.charCodeAt(1) - 1);
    var upCell = $('#' + upCellId);
    if (upCell.hasClass("bottom-border-hidden")) {
        upCell.removeClass("bottom-border-hidden");
        upCell.addClass("bottom-border");
    } else if (!upCell.hasClass("bottom-border")) {
        if (upCell.hasClass("bottom-no-border")) {
            upCell.removeClass("bottom-no-border");  
        } 
        startCell.html("");
        upCell.html('P1');
        playerOne = upCellId;
    }
}