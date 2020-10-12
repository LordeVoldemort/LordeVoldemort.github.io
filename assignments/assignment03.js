onStart = () => {
   assignElementIDs();
   createClearButton();
   createResetButton();
   createAboutButton();
   createFontConrtols();
   assignButtonFunction()

   
   // assign the entire table rows to a variable, rows
let rows = document.getElementsByTagName("tr");

//declare an array for each row, elem
let elem = [];

//set a loops to assign each row (from hole 1 to hole 18) to each element in array. 
//also, for each elem, assign functions for each buttons - add, substracts, and clear.
for (let i = 1; i < rows.length - 1; i++) {
    elem[i] = document.getElementById(i);
    elem[i].children[4].children[0].onclick = function() {
        add1(elem[i]);
    };
    elem[i].children[4].children[1].onclick = function() {
        sub1(elem[i]);
    };
    elem[i].children[4].children[2].onclick = function() {
        clear(elem[i]);
    }
}

// create an "add1" function
function add1(elem) {
    if (elem.children[2].innerHTML == "-") {
        elem.children[2].innerHTML = "1";
        diff(elem);
    } else if (elem.children[2].innerHTML == "8") {
        alert("Score is double Spar. Try to substract or Reset!");
        elem.children[2].innerHTML = "8";
    } else {
        let currentScore = elem.children[2].innerHTML;
        currentScore = Number.parseInt(currentScore);
        elem.children[2].innerHTML = currentScore + 1;
        diff(elem);
    }
    addTotal();
}

// create an "sub1" function
function sub1(elem) {
    if (elem.children[2].innerHTML == "-") {
        alert("Score is negative. Try to Plus or Reset!");
        elem.children[2].innerHTML == "-";
    } else if (elem.children[2].innerHTML == "1") {
        alert("Score is zero. Try to Plus or Reset!");
        elem.children[2].innerHTML = "1";
    } else {
        let currentScore = elem.children[2].innerHTML;
        currentScore = Number.parseInt(currentScore);
        elem.children[2].innerHTML = currentScore - 1;
        diff(elem);
    }
    addTotal();
}

// create an "diff1" function
function diff(elem) {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    let par = elem.children[1].innerHTML;
    par = Number.parseInt(par);
    elem.children[3].innerHTML = currentScore - par;
}

// create an "addTotal" function
function addTotal() {
    let parTotal = 0;
    let totalScore = 0;
    let overTotal = 0;

    for (let i = 1; i < rows.length - 1; i++) {
        let par = elem[i].children[1].innerHTML;
        let score = elem[i].children[2].innerHTML;
        let over = elem[i].children[3].innerHTML;

        if (isNaN(score)) {
            parTotal += 0;
            totalScore += 0;
            overTotal += 0;
        } else {
            parTotal += parseInt(par);
            totalScore += parseInt(score);
            overTotal += parseInt(over);
        }
    }

    if (totalScore == 0 && parTotal == 0 && overTotal == 0) {
        rows[19].children[1].innerText = "-";
        rows[19].children[2].innerText = "-";
        rows[19].children[3].innerText = "-";
    } else {
        rows[19].children[1].innerText = parTotal;
        rows[19].children[2].innerText = totalScore;
        rows[19].children[3].innerText = overTotal;
    }
}

function clear(elem) {
    elem.children[2].innerHTML = "-";
    elem.children[3].innerHTML = "-";
    addTotal(elem);
}




//Creates a reset button
createResetButton = () => {
   //Create a button element and set the attributes and values
   let btn = document.createElement("button");
   let label = document.createTextNode("Reset Table");
   btn.appendChild(label);
   btn.id = "btnReset";
   //Function to clear a table
   let clearTable = () => {
      for (let i = 1; i < row.length - 1; i++){
         clearRow(i);
         checkActiveHole(i);     
      }
      //Reset the TOTALs row.
      row[row.length - 1].children[1].innerText = "-"
      row[row.length - 1].children[2].innerText = "-"
      row[row.length - 1].children[3].innerText = "-"
      checkActiveHole(row.length - 1);
   }
   //Appends the main body
   let tableFooter = document.getElementById("buttons");
   tableFooter.appendChild(btn);
   //Event listener
   document.getElementById("btnReset").addEventListener("click", clearTable); 
}
//Creates an about button
createAboutButton = () => {
   let btn = document.createElement("button");
   let label = document.createTextNode("About");
   btn.appendChild(label);
   btn.id = "btnAbout";
   
   displayMsg = () => {
      alert("Golf Scorecard 1.0. All rights reserved.");
   }  
   
   //Appends the main body
   let tableFooter = document.getElementById("buttons");
   tableFooter.appendChild(btn);
   //Event Listener
   document.getElementById("btnAbout").addEventListener("click", displayMsg);
}
//Creates a font control buttons
createFontConrtols = () => {
   //Create the Font increase button
   let btn = document.createElement("button");
   let label = document.createTextNode("Increase Font");
   btn.appendChild(label);
   btn.id = "btnFont+";
   
   //Appends the main body
   let tableFooter = document.getElementById("buttons");
   tableFooter.appendChild(btn);
   
   //Create the Font decrease button
   btn = document.createElement("button");
   label = document.createTextNode("Decrease Font");
   btn.appendChild(label);
   btn.id = "btnFont-";
   
   //Appends the main body
   tableFooter = document.getElementById("buttons");
   tableFooter.appendChild(btn);
   
   let body = document.getElementsByTagName("body");  
   increaseFont = () => {     
      if (body[0].style.fontSize == ""){
         body[0].style.fontSize = "larger";
      }
      else {
         body[0].style.removeProperty("font-size");
      }
   }
   decreaseFont = () => {
      if (body[0].style.fontSize == ""){
         body[0].style.fontSize = "smaller";
      }
      else {
         body[0].style.removeProperty("font-size");
      }
   }  
   //Event Listener
   document.getElementById("btnFont+").addEventListener("click", increaseFont);
   document.getElementById("btnFont-").addEventListener("click", decreaseFont);
}