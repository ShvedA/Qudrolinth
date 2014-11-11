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
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var row = 0; row < labirinth.length; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < labirinth[row][0].length; col++) {
            var td = document.createElement("td");
            if (row == 0 && col > 0) {
                td.innerHTML=alphabet.charAt(col - 1);   
            } else if (col == 0 && row > 0) {
                td.innerHTML=row;   
            } else if (col > 0 && row > 0) {
                td.id = alphabet.charAt(col - 1) + "" + row;   
            }
            if (labirinth[row][0][col] == 1) {
                if (col == 0 || col == labirinth.length - 1) {
                    td.className += " right-border";
                } else {
                    td.className += " right-border-hidden";   
                }
            }
            if (labirinth[row][1][col] == 1) {
                if (row == 0 || row == labirinth.length - 1) {
                    td.className += " bottom-border";   
                } else {
                    td.className += " bottom-border-hidden";
                }
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
}

function startFrom(letter, number) {
       
}