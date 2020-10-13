//Assign all table rows to variable, row
let row = document.getElementsByTagName("tr");

//Functions
functions = () => {
    ID();
    ClearButton();
    ResetButton();
    AboutButton();
    FontsButtons();
    ButtonFunction();
}

//This function assigns all elements with an ID.
ID = () => {
    for (let i = 0; i < row.length - 1; i++) {
        //Sets id for each element
        row[i].setAttribute("id", i);
    }
}

//Clear Button  
ClearButton = () => {
    for (let i = 1; i < row.length - 1; i++) {
        let btn = document.createElement("button");
        let label = document.createTextNode("C");
        let space = document.createTextNode(" ");
        btn.appendChild(label);
        btn.className = "btn-clear";
        row[i].children[4].appendChild(space);
        row[i].children[4].appendChild(btn);
    }
}


ResetButton = () => {
    //Create a button element and set the attributes and values
    let btn = document.createElement("button");
    let label = document.createTextNode("Reset Table");
    btn.appendChild(label);
    btn.id = "btnReset";
    //Function to clear a table
    let clearTable = () => {
        for (let i = 1; i < row.length - 1; i++) {
            clearRow(i);
            ActiveHole(i);
        }
        //Reset the TOTALs row.
        row[row.length - 1].children[1].innerText = "-"
        row[row.length - 1].children[2].innerText = "-"
        row[row.length - 1].children[3].innerText = "-"
        ActiveHole(row.length - 1);
    }
    //Appends the main body
    let tableFooter = document.getElementById("buttons");
    tableFooter.appendChild(btn);
    //Event Listener
    document.getElementById("btnReset").addEventListener("click", clearTable);
}




//About Button
AboutButton = () => {
    let btn = document.createElement("button");
    let label = document.createTextNode("About");
    btn.appendChild(label);
    btn.id = "btnAbout";

    displayMsg = () => {
        alert("Golf Scorecard 1.0. All rights reserved.");
    }

    let tableFooter = document.getElementById("buttons");
    tableFooter.appendChild(btn);
    document.getElementById("btnAbout").addEventListener("click", displayMsg);
}

//Font Buttons
FontsButtons = () => {
    //Font increase button
    let btn = document.createElement("button");
    let label = document.createTextNode("Increase Font");
    btn.appendChild(label);
    btn.id = "btnFont+";

    let tableFooter = document.getElementById("buttons");
    tableFooter.appendChild(btn);

    //Font decrease button
    btn = document.createElement("button");
    label = document.createTextNode("Decrease Font");
    btn.appendChild(label);
    btn.id = "btnFont-";

    tableFooter = document.getElementById("buttons");
    tableFooter.appendChild(btn);

    let body = document.getElementsByTagName("body");
    increaseFont = () => {
        if (body[0].style.fontSize == "") {
            body[0].style.fontSize = "larger";
        } else {
            body[0].style.removeProperty("font-size");
        }
    }
    decreaseFont = () => {
        if (body[0].style.fontSize == "") {
            body[0].style.fontSize = "smaller";
        } else {
            body[0].style.removeProperty("font-size");
        }
    }
    document.getElementById("btnFont+").addEventListener("click", increaseFont);
    document.getElementById("btnFont-").addEventListener("click", decreaseFont);
}

ButtonFunction = () => {
    for (let i = 1; i < row.length - 1; i++) {
        row[i].children[4].children[0].onclick = function() {
            updateButton("+", i);
        };
        row[i].children[4].children[1].onclick = function() {
            updateButton("-", i);
        };
        row[i].children[4].children[2].onclick = function() {
            updateButton("c", i);
        };
    }
}




updateButton = (a, b) => {
    //Selects for the addition buttion
    if (a == "+") {
        add1(b);
        Difference(b);
        getTotal(b);
        ActiveHole(b);
        ActiveHole(row.length - 1);
    }
    //Selects for the subtraction button
    else if (a == "-") {
        subtract1(b);
        Difference(b);
        getTotal(b);
        ActiveHole(b);
        ActiveHole(row.length - 1);
    }
    //Selects for the clear button
    else {
        clearRow(b);
        getTotal(b);
        ActiveHole(b);
        ActiveHole(row.length - 1);
    }
}
//Add Button
add1 = (b) => {
    if ("-" == row[b].children[2].innerText) {
        row[b].children[2].innerText = "0"
    }
    //Converting the string to number.
    let x = Number(row[b].children[2].innerText);
    let par = Number(row[b].children[1].innerText);
    if (x + 1 <= par * 2) {
        x++
        row[b].children[2].innerText = x;
    }
}


//Subtract Button
subtract1 = (b) => {
    let x = Number(row[b].children[2].innerText);
    if (x - 1 >= 1) {
        x--
        row[b].children[2].innerText = x;
    } else {
        row[b].children[2].innerText = "-";
    }
}

//Difference between Over
Difference = (r) => {
    let score = Number(row[r].children[2].innerText);
    let par = Number(row[r].children[1].innerText);
    if (score > par) {
        let difference = score - par;
        row[r].children[3].innerText = difference;
    } else {
        row[r].children[3].innerText = "-";
    }
}

ActiveHole = (b) => {
    if (Number(row[b].children[2].innerText) > 0) {
        console.log("Attribute Added");
    } else {
        console.log("Attribute Removed");
        row[b].removeAttribute("style");
    }
}

//Total
getTotal = () => {
    let sumPar = 0;
    let sumScore = 0;
    let sumOver = 0;

    for (let i = 1; i <= 18; i++) {

        if ((row[i].children[1].innerText != "-") && (row[i].children[2].innerText != "-")) {
            sumPar += Number(row[i].children[1].innerText);
            row[row.length - 1].children[1].innerText = sumPar;
            console.log("Par:" + sumPar);
        } else if (sumPar == 0) {
            row[row.length - 1].children[1].innerText = "-";
        }

        if (row[i].children[2].innerText != "-") {
            sumScore += Number(row[i].children[2].innerText);
            row[row.length - 1].children[2].innerText = sumScore;
            console.log("Score:" + sumScore);
        } else if (sumScore == 0) {
            row[row.length - 1].children[2].innerText = "-";
        }

        if (row[i].children[3].innerText != "-") {
            sumOver += Number(row[i].children[3].innerText);
            row[row.length - 1].children[3].innerText = sumOver;
            console.log("Over:" + sumOver);
        } else if (sumOver == 0) {
            row[row.length - 1].children[3].innerText = "-";
        }
    }
}

//Clears
clearRow = (b) => {
    row[b].children[2].innerText = "-";
    row[b].children[3].innerText = "-";
}