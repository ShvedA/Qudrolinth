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
var holeNumber = 0;
var alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY";

window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.keyCode) {
    case 40:
        moveDown();
        break;
    case 38:
        moveUp();
        break;
    case 37:
        moveLeft();
        break;
    case 39:
        moveRight();
        break;
    case "Enter":
      // Do something for "enter" or "return" key press.
        break;
    case "Esc":
      // Do something for "esc" key press.
        break;
    default:
        return; // Quit when this doesn't handle the key event.
  }
event.preventDefault();
}, true);

function showNewLabirinth() {
    holeNumber++;
    var div = document.getElementById("secondTable");
    var label = document.createElement("label");
    label.innerHTML = "From the hole";
    var table = document.createElement("table");
    table.className = "table-board";
    var tbody = document.createElement("tbody");
    for(var row = 0; row < labirinth.length; row++) {
        var tr = document.createElement("tr");
        tr.className += " tr" + row;
        for (var col = 0; col < labirinth[row][0].length; col++) {
            var td = document.createElement("td");
            if (row == 0 && col > 0) {
                td.innerHTML=alphabet.charAt(col);   
            } else if (col == 0 && row > 0) {
                td.innerHTML=row;   
            }
            if (!(col == 0 && row == 0)) {
                td.id = alphabet.charAt(col) + row + holeNumber;   
            }
            if (col > 0 && row > 0) {
                td.className += ("non-visited");   
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
    div.appendChild(label);
    div.appendChild(table);
    for (var row = 0; row < labirinth.length; row++) {
        for (var col = 0; col < labirinth[row][0].length; col++) {
            $('#'+alphabet.charAt(col) + row + holeNumber).hide();
        }
        //$('.tr' + row).hide();
    }
}

function makeEmptyTable() {
    var div = document.getElementById("firstTable");
    var table = document.createElement("table");
    table.className = "table table-bordered table-board";
    var tbody = document.createElement("tbody");
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
            if (col > 0 && row > 0) {
                td.className += ("non-visited");   
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
           
function makeDivTable() {
    var div = $('#divTable');
    var divTable = $('<div>');
    divTable.addClass('divTable');
    for (var row = 0; row < labirinth.length; row++) {
        var divRow = $('<div>');  
        divRow.addClass('divRow');
        for (var col = 0; col < labirinth[row][0].length; col++) {
            var divCell = $('<div>');
            divCell.addClass('divCell');
            divCell.html(row + " " + col);
            
            divRow.append(divCell);
        }
        divTable.append(divRow);
    }
    div.append(divTable);
    
    
}

function startFrom(letter, number) {
    var startCell = document.getElementById(letter + number);
    startCell.innerHTML = "P1";
    playerOne = letter + number;
    var startCell = $('#' + playerOne);
    startCell.removeClass("non-visited");
}

function makeHoles(firstHole, secondHole) {
    var firstCell = $('#' + firstHole);
    var secondCell = $('#' + secondHole);
    firstCell.addClass("hole holeOne");
    secondCell.addClass("hole holeTwo");
}

function fallIntoHole() {
    showNewLabirinth();
    var firstHole = $('#' + playerOne);
    if (firstHole.hasClass("holeOne")) {
        var secondHole = $(".holeTwo");  
    } else if (firstHole.hasClass("holeTwo")) {
        var secondHole = $(".holeOne");
    }
    playerOne = secondHole.attr('id')
    secondHole = $('#' + playerOne + holeNumber);
    $('#' + String.fromCharCode(playerOne.charCodeAt(0) - 1) + (playerOne.charAt(1) - 1) + holeNumber).show();
    $('#' + String.fromCharCode(playerOne.charCodeAt(0) - 1) + playerOne.charAt(1) + holeNumber).show();
    $('#' + String.fromCharCode(playerOne.charCodeAt(0) - 1) + (playerOne.charAt(1) - (-1)) + holeNumber).show();
    $('#' + playerOne.charAt(0) + (playerOne.charAt(1) - 1) + holeNumber).show();
    $('#' + playerOne.charAt(0) + playerOne.charAt(1) + holeNumber).show();
    $('#' + playerOne.charAt(0) + (playerOne.charAt(1) - (-1)) + holeNumber).show();
    $('#' + String.fromCharCode(playerOne.charCodeAt(0) + 1) + (playerOne.charAt(1) - 1) + holeNumber).show();
    $('#' + String.fromCharCode(playerOne.charCodeAt(0) + 1) + playerOne.charAt(1) + holeNumber).show();
    $('#' + String.fromCharCode(playerOne.charCodeAt(0) + 1) + (playerOne.charAt(1) - (-1)) + holeNumber).show();
    secondHole.show();
    secondHole.removeClass("non-visited");
    firstHole.html("");
    secondHole.html("P1");
}

function moveRight() {
    if (holeNumber == 0) {
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
            move(startCell, nextCell);
        }
    }
}

function moveDown() {
    if (holeNumber == 0) {
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
            move(startCell, nextCell);
        }
    }
}

function moveLeft() {
    if (holeNumber == 0) {
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
            move(startCell, leftCell);
        }
    }
}

function moveUp() {
    if (holeNumber == 0) {
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
           move(startCell, upCell);
        }
    }
}

function move(startCell, nextCell) {
    startCell.html("");
    nextCell.html('P1');
    playerOne = nextCell.attr('id');
    nextCell.removeClass("non-visited");
    if (nextCell.hasClass("hole")) {
        fallIntoHole();   
    }   
}