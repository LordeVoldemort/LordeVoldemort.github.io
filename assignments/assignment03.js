//Function that need to be called when the document is loaded
onStart = () => {
  assignElement();
  createClearButton();
  createResetButton();
  createAboutButton();
  createFontConrtols();
  assignButtonFunction(); 
}

//Assign all table rows to variable, row
let row = document.getElementsByTagName("tr");


//Function will assign all elements with an ID.
assignElement = () => {  


  //use a for loop to read the array
  for (let i = 0; i < row.length - 1; i++){
    //Set the id attribute for each element
    row[i].setAttribute("id", i);   
  } 
}


//Creates the clear button  
createClearButton = () => {
  for (let i = 1; i < row.length - 1; i++){
    let btn = document.createElement("button");
    let label = document.createTextNode("C");
    let space = document.createTextNode(" ");
    btn.appendChild(label);
    btn.className = "btn-clear";
    row[i].children[4].appendChild(space);
    row[i].children[4].appendChild(btn);
  }
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

//Function will assign all button element with an onclick attribute for their respective function
assignButtonFunction = () =>{
  for (let i = 1; i < row.length - 1; i++){
    row[i].children[4].children[0].onclick = function(){updateButton("+", i);};
    row[i].children[4].children[1].onclick = function(){updateButton("-", i);};
    row[i].children[4].children[2].onclick = function(){updateButton("c", i);};
  } 
}


//Sum of multible functions to be executed when a buttion is clicked
updateButton = (type, btnID) => {
  //Selects for the addition buttion
  if(type == "+"){
    add1(btnID);
    checkDifference(btnID);     
    getTotal(btnID);
    checkActiveHole(btnID);
    checkActiveHole(row.length - 1);  
  }
  //Selects for the subtraction button
  else if (type == "-"){
    subtract1(btnID);
    checkDifference(btnID);
    getTotal(btnID);
    checkActiveHole(btnID);
    checkActiveHole(row.length - 1);  
  }
  //Selects for the clear button
  else {
    clearRow(btnID);
    getTotal(btnID);
    checkActiveHole(btnID);
    checkActiveHole(row.length - 1);
  }
}
//Adds 1 to the score
//Checks if the score is double the par, does nothing if false
add1 = (btnID) =>{
  if("-" == row[btnID].children[2].innerText){
    row[btnID].children[2].innerText = "0"
  }
  //Find the row and cell, then return the inner text. Converts the string to a number.
  let x = Number(row[btnID].children[2].innerText);
  //Find the row and cell, then return the inner text. Converts the string to a number.
  let par = Number(row[btnID].children[1].innerText);
  if (x + 1 <= par * 2){
    //Increment number by 1
    x++
    //Set the new value of the cell.
    row[btnID].children[2].innerText = x;
  } 
}
//Subtracts 1 from the score
//Checks if the score is zero, does nothing if false
subtract1 = (btnID) => {
  //Find the row and cell, then return the inner text. Converts the string to a number.
  let x = Number(row[btnID].children[2].innerText); 
  //Checks if the score is 0, does nothing if true
  if (x - 1 >= 1){
    //decrease number by 1
    x--
    //Set the new value of the cell.
    row[btnID].children[2].innerText = x;
  } 
  else {
    //Allows the user to clear the cell
    row[btnID].children[2].innerText = "-";
  }
}
//Checks the difference between the score and par.
checkDifference = (rowID) =>{
  let score = Number(row[rowID].children[2].innerText);
  let par = Number(row[rowID].children[1].innerText);
  if (score > par){
    let difference = score - par;
    row[rowID].children[3].innerText = difference;
  }
  else{
    row[rowID].children[3].innerText = "-";
  }
}

//Finds the sum of a column
getTotal = () => {  
  let sumPar = 0;
  let sumScore = 0;
  let sumOver = 0;
  
  for (let i = 1; i <= 18; i++){
    
    if ((row[i].children[1].innerText != "-") && (row[i].children[2].innerText != "-")){
      sumPar += Number(row[i].children[1].innerText);
      row[row.length - 1].children[1].innerText = sumPar;
      console.log("Par:" + sumPar);
    }
    else if (sumPar == 0){
      row[row.length - 1].children[1].innerText = "-";
    }
    
    if (row[i].children[2].innerText != "-"){
      sumScore += Number(row[i].children[2].innerText);
      row[row.length - 1].children[2].innerText = sumScore;
      console.log("Score:" + sumScore);
    }
    else  if (sumScore == 0){
      row[row.length - 1].children[2].innerText = "-";
    }
    
    if (row[i].children[3].innerText != "-"){
      sumOver += Number(row[i].children[3].innerText);
      row[row.length - 1].children[3].innerText = sumOver;
      console.log("Over:" + sumOver);
    }
    else  if (sumOver == 0){
      row[row.length - 1].children[3].innerText = "-";
    }   
  } 
}

//Clears the row
clearRow = (btnID) =>{
  row[btnID].children[2].innerText = "-";
  row[btnID].children[3].innerText = "-";
}
