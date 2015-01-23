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
var newColMin = 9;
var newColMax = 0;
var newRowMin = 9;
var newRowMax = 0;
var alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY";
var firstPl = '<img id="firstPl" src="pictures/person.png" />';
var firstHole = "";
var secondHole = "";

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
                divCell.text(alphabet[col]);
            } else if (col == 0) {
                divCell.addClass('divCellLeft');   
                divCell.text(row);
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
            } else if (row == labirinth.length && col != labirinth.length) {
                divCell.addClass('right-no-border');   
            } else if (col == labirinth.length && row != labirinth.length) {
                divCell.addClass('bottom-no-border');   
            }
            divCell.addClass('divCell');
            divCell.attr('id', col + '' + row + '' + holeNumber);
            divCell.hide();
            divCell.disable();
            divRow.append(divCell);
        }
        divTable.append(divRow);
    }
    div.append(divTable);
    makeHoles();
}

$.fn.disable = function() {
    return this.each(function() {
        if (typeof this.disabled != "undefined") this.disabled = true;
    });
}

$.fn.enable = function() {
    return this.each(function() {
        if (typeof this.disabled != "undefined") this.disabled = false;
    });
}

function startFrom(coordinates) {
    var startCell = $('#' + coordinates);
    playerOne = coordinates;
    startCell.append(firstPl);
    startCell.addClass("visited");
}

function makeHoles(first, second) {
    if (undefined != first) {
        firstHole = first;
        secondHole = second;
    }
    var firstCell = "";
    var secondCell = "";
    if (holeNumber == 0) {
        firstCell = $('#' + firstHole);
        secondCell = $('#' + secondHole);
    } else {
        firstCell = $('#' + firstHole + holeNumber);
        secondCell = $('#' + secondHole + holeNumber);
    }
    firstCell.addClass("hole holeOne non-visited");
    secondCell.addClass("hole holeTwo non-visited"); 
}

function fallIntoHole() {
    holeNumber++;
    preMakeTable();
    var firstHole = $('#' + playerOne);
    firstHole.removeClass("non-visited");
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

function hasRightBorder(cell) {
    if (cell.hasClass("right-border-hidden")) {
        cell.removeClass("right-border-hidden");
        cell.addClass("right-border");
        return true;
    }
    if (!cell.hasClass("right-border")) {
        if (cell.hasClass("right-no-border")) {
            cell.removeClass("right-no-border");
        } 
        return false;
    }    
    return true;
}

function hasBottomBorder(cell) {
    if (cell.hasClass("bottom-border-hidden")) {
        cell.removeClass("bottom-border-hidden");
        cell.addClass("bottom-border");
        return true;
    }
    if (!cell.hasClass("bottom-border")) {
        if (cell.hasClass("bottom-no-border")) {
            cell.removeClass("bottom-no-border");  
        } 
        return false;
    }
    return true;
}

function moveRight() {
    var startCell = $('#' + playerOne);
    if (holeNumber == 0) {
        if (!hasRightBorder(startCell)) {
            var nextCellId = String.fromCharCode(playerOne.charCodeAt(0) + 1) + playerOne.charAt(1);
            var nextCell = $('#' + nextCellId);
            move(startCell, nextCell);       
        }
    } else {
        if (!hasRightBorder(startCell)) {
            var nextCellId = String.fromCharCode(playerOne.charCodeAt(0) + 1) + playerOne.charAt(1) + '' + holeNumber;
            var nextCell = $('#' + nextCellId);         
            moveAfterHole(startCell, nextCell);
        }
    }
}

function moveDown() {
    var startCell = $('#' + playerOne);
    if (holeNumber == 0) {
        if (!hasBottomBorder(startCell)) {
            var nextCellId = playerOne.charAt(0) + String.fromCharCode(playerOne.charCodeAt(1) + 1);
            var nextCell = $('#' + nextCellId);
            move(startCell, nextCell);   
        }
    } else {
        if (!hasBottomBorder(startCell)) {
            var nextCellId = playerOne.charAt(0) + String.fromCharCode(playerOne.charCodeAt(1) + 1) + '' + holeNumber;
            var nextCell = $('#' + nextCellId);
            moveAfterHole(startCell, nextCell);   
        }
    }
}

function moveLeft() {
    var startCell = $('#' + playerOne);
    if (holeNumber == 0) {
        if (playerOne.charAt(0) == 'A') {
            var leftCellId = 'Z' + playerOne.charAt(1);   
        } else {
            var leftCellId = String.fromCharCode(playerOne.charCodeAt(0) - 1) + playerOne.charAt(1);
        }
        var leftCell = $('#' + leftCellId);
        if (!hasRightBorder(leftCell)) {
            move(startCell, leftCell);    
        }
    } else {
        if (playerOne.charAt(0) == 'A') {
            var leftCellId = 'Z' + playerOne.charAt(1) + '' + holeNumber;   
        } else {
            var leftCellId = String.fromCharCode(playerOne.charCodeAt(0) - 1) + playerOne.charAt(1) + '' + holeNumber;
        } 
        var leftCell = $('#' + leftCellId);
        if (!hasRightBorder(leftCell)) {
            moveAfterHole(startCell, leftCell);    
        }
    }   
}

function moveUp() {
    var startCell = $('#' + playerOne);
    if (holeNumber == 0) {
        var upCellId = playerOne.charAt(0) + String.fromCharCode(playerOne.charCodeAt(1) - 1);
        var upCell = $('#' + upCellId);
        if (!hasBottomBorder(upCell)) {
            move(startCell, upCell);   
        }
    } else {
        var upCellId = playerOne.charAt(0) + String.fromCharCode(playerOne.charCodeAt(1) - 1) + '' + holeNumber;
        var upCell = $('#' + upCellId); 
        if (!hasBottomBorder(upCell)) {
            moveAfterHole(startCell, upCell);   
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
    var col = playerOne.charAt(0);
    var row = playerOne.charAt(1);
    if (newColMin > col - 1) {
        newColMin = col - 1;
    }
    if (newColMax < col - (-1)) {
        newColMax = col - (-1);   
    }
    if (newRowMin > row -1) {
        newRowMin = row - 1;   
    }
    if (newRowMax < row - (-1)) {
        newRowMax = row - (-1);   
    }    
    for (var i = newColMin; i <= newColMax; i++) {
        for (var j = newRowMin; j <= newRowMax; j++) {
            $('#' + i + '' + j + '' + holeNumber).show();   
        }
    }
    
/*    $('#' + (playerOne.charAt(0) - 1) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - 1) + '' + playerOne.charAt(1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - 1) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).show();
    $('#' + playerOne.charAt(0) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).show();
    $('#' + playerOne.charAt(0) + '' + playerOne.charAt(1) + '' + holeNumber).show();
    $('#' + playerOne.charAt(0) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - (-1)) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - (-1)) + '' + playerOne.charAt(1) + '' + holeNumber).show();
    $('#' + (playerOne.charAt(0) - (-1)) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).show();*/
    
    /*$('#' + (playerOne.charAt(0) - 1) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).prop('disabled', false);
    $('#' + (playerOne.charAt(0) - 1) + '' + playerOne.charAt(1) + '' + holeNumber).prop('disabled', false);
    $('#' + (playerOne.charAt(0) - 1) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).prop('disabled', false);
    $('#' + playerOne.charAt(0) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).prop('disabled', false);
    $('#' + playerOne.charAt(0) + '' + playerOne.charAt(1) + '' + holeNumber).prop('disabled', false);
    $('#' + playerOne.charAt(0) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).prop('disabled', false);
    $('#' + (playerOne.charAt(0) - (-1)) + '' + (playerOne.charAt(1) - 1) + '' + holeNumber).prop('disabled', false);
    $('#' + (playerOne.charAt(0) - (-1)) + '' + playerOne.charAt(1) + '' + holeNumber).prop('disabled', false);
    $('#' + (playerOne.charAt(0) - (-1)) + '' + (playerOne.charAt(1) - (-1)) + '' + holeNumber).prop('disabled', false);*/
}