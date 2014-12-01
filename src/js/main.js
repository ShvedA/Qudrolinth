/*jslint plusplus: true */
var labirinth = [];
var sides = ["Border-Right", "Border-Bottom"];
for (var rows = 0; rows < 9; rows++) {
    labirinth[rows] = [];
}
labirinth[0][0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
labirinth[0][1] = [0, 1, 1, 1, 1, 1, 1, 1, 1];
labirinth[1][0] = [1, 0, 1, 1, 1, 0, 0, 0, 1];
labirinth[1][1] = [0, 0, 0, 0, 0, 0, 1, 1, 0];
labirinth[2][0] = [1, 1, 0, 1, 0, 0, 0, 1, 1];
labirinth[2][1] = [0, 0, 1, 0, 0, 0, 0, 0, 0];
labirinth[3][0] = [1, 1, 0, 0, 1, 1, 1, 1, 1];
labirinth[3][1] = [0, 0, 0, 1, 1, 0, 0, 0, 0];
labirinth[4][0] = [1, 1, 1, 0, 0, 0, 1, 0, 1];
labirinth[4][1] = [0, 0, 0, 0, 0, 0, 1, 1, 1];
labirinth[5][0] = [1, 0, 0, 1, 1, 1, 0, 0, 1];
labirinth[5][1] = [0, 1, 1, 0, 0, 0, 0, 0, 0];
labirinth[6][0] = [1, 0, 0, 1, 1, 0, 0, 1, 1];
labirinth[6][1] = [0, 0, 0, 0, 0, 1, 1, 0, 0];
labirinth[7][0] = [1, 1, 1, 0, 0, 0, 0, 1, 1];
labirinth[7][1] = [0, 0, 1, 1, 0, 0, 1, 0, 0];
labirinth[8][0] = [1, 0, 0, 0, 1, 0, 0, 0, 1];
labirinth[8][1] = [0, 1, 1, 1, 1, 1, 1, 1, 1];

var playerOne = "";
var holeNumber = 0;
var alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY";
var firstPl = '<img id="firstPl" src="pictures/person.png" />';

window.addEventListener("keydown", function (event) {
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

function makeDivTable() {
    var div = $('#divTable');
    var divTable = $('<div>');
    divTable.addClass('divTable');
    for (var row = 0; row < labirinth.length; row++) {
        var divRow = $('<div>');  
        divRow.addClass('divRow');
        for (var col = 0; col < labirinth[row][0].length; col++) {
            var divCell = $('<div>');
            if (col == 0 && row == 0) {
                divCell.addClass('divCellCornerTopLeft');   
            } else if (row == 0) {
                divCell.addClass('divCellTop');   
            } else if (col == 0) {
                divCell.addClass('divCellLeft');   
            } else {
                divCell.addClass('divCellBoard'); 
                if (col == labirinth.length - 1 && row == labirinth.length - 1) {
                    divCell.addClass('divCellCornerBottomRight');  
                } else if (row > 0 && col == labirinth.length - 1) {
                    divCell.addClass('divCellRight');   
                } else if (col > 0 && row == labirinth.length - 1) {
                    divCell.addClass('divCellBottom');   
                }
            } 
            if (labirinth[row][0][col] == 1) {
                if (col == 0 || col == labirinth.length - 1) {
                    divCell.addClass('right-border');
                } else {
                    divCell.addClass('right-border-hidden');   
                }
            } else if (col > 0 && row > 0) {
                divCell.addClass('right-no-border');   
            }
            if (labirinth[row][1][col] == 1) {
                if (row == 0 || row == labirinth.length - 1) {
                    divCell.addClass('bottom-border');   
                } else {
                    divCell.addClass('bottom-border-hidden');
                }
            } else if (col > 0 && row > 0) {
                divCell.addClass('bottom-no-border');
            }
            divCell.addClass('divCell');
            divCell.attr('id', col + '' + row);
            divRow.append(divCell);
        }
        divTable.append(divRow);
    }
    div.append(divTable);
}

function preMakeTable() {
    var div = $('#firstTable');
    var divTable = $('<div>');
    divTable.addClass('divTable');
    for (var row = 0; row < labirinth.length + 1; row++) {
        var divRow = $('<div>');  
        divRow.addClass('divRow');
        for (var col = 0; col < labirinth.length + 1; col++) {
            var divCell = $('<div>');
            divCell.addClass('divCellBoard');
            if (row != labirinth.length && col != labirinth.length) {
                if (labirinth[row][0][col] == 1) {
                    divCell.addClass('right-border-hidden');   
                } else {
                    divCell.addClass('right-no-border');   
                }
                if (labirinth[row][1][col] == 1) {
                    divCell.addClass('bottom-border-hidden');
                } else {
                    divCell.addClass('bottom-no-border');
                }
            }
            divCell.addClass('divCell');
            divCell.attr('id', col + '' + row + '' + holeNumber);
            divCell.hide();
            divRow.append(divCell);
        }
        divTable.append(divRow);
    }
    div.append(divTable);
}

function startFrom(coordinates) {
    var startCell = $('#' + coordinates);
    playerOne = coordinates;
    startCell.append(firstPl);
    startCell.addClass("visited");
}

function makeHoles(firstHole, secondHole) {
    var firstCell = $('#' + firstHole);
    var secondCell = $('#' + secondHole);
    firstCell.addClass("hole holeOne");
    secondCell.addClass("hole holeTwo");
}

function fallIntoHole() {
    holeNumber++;
    preMakeTable();
    var firstHole = $('#' + playerOne);
    if (firstHole.hasClass("holeOne")) {
        var secondHole = $(".holeTwo");  
    } else if (firstHole.hasClass("holeTwo")) {
        var secondHole = $(".holeOne");
    }
    playerOne = secondHole.attr('id') + '' + holeNumber;    
    secondHole = $('#' + playerOne);
    showAllRound();
    secondHole.addClass("visited");
    firstHole.html("");
    secondHole.html(firstPl);
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
    } else {
        var startCell = $('#' + playerOne);
        if (playerOne.charAt(0) == 'A') {
            var leftCellId = 'Z' + playerOne.charAt(1) + '' + holeNumber;   
        } else {
            var leftCellId = String.fromCharCode(playerOne.charCodeAt(0) - 1) + playerOne.charAt(1) + '' + holeNumber;
        } 
        var leftCell = $('#' + leftCellId);
        if (leftCell.hasClass("right-border-hidden")) {
            leftCell.removeClass("right-border-hidden");
            leftCell.addClass("right-border");
        } else if (!leftCell.hasClass("right-border")) {
            if (leftCell.hasClass("right-no-border")) {
                leftCell.removeClass("right-no-border");  
            } 
            moveAfterHole(startCell, leftCell);
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
    nextCell.html(firstPl);
    playerOne = nextCell.attr('id');
    nextCell.addClass("visited");
    if (nextCell.hasClass("hole")) {
        fallIntoHole();   
    }   
}

function moveAfterHole(startCell, nextCell) {
    move(startCell, nextCell);
    showAllRound();
}
         
function showAllRound() {
    $('#' + (playerOne.charAt(0) - 1) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - 1) + '' + playerOne.charAt(1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - 1) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).show();
    $('#' + playerOne.charAt(0) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).show();
    $('#' + playerOne.charAt(0) + '' + playerOne.charAt(1) + '' + holeNumber).show();
    $('#' + playerOne.charAt(0) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - (-1)) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - (-1)) + '' + playerOne.charAt(1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - (-1)) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).show();
}