// 6. modify basic JS object, with "this" keyword
let person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 45,
  fullName: function() {return this.firstName  + " " + person.lastName}
}
document.getElementById("1A").innerHTML = person.fullName();

// Instructions
// modify person object, above, as follows
// add properties, streetAddress, city, state, zipCode
// add method, fullAddress(), which prints full address on a single line.
// Display output of fullAddress() in <div id="1B">
person.streetAddress = "123 Main Street";
person.city = "Diamond";
person.state = "Michigan";
person.zipCode = "56789";
person.fullAddress = function() {return this.streetAddress + " " + this.city + ", " + this.state + " " + this.zipCode;}
document.getElementById("1B").innerHTML = person.fullAddress();
// ==================

// 7. create basic DOM object
let div2a = document.getElementById("2A");
let table2a = createTable("table2a");
div2a.appendChild(table2a);
table2a.setAttribute("style", "border:1px solid black;")
table2a.setAttribute("width", "100%")
appendTableRow3(table2a,"1","2","3");
appendTableRow3(table2a,"4","5","6");
appendTableRow3(table2a,"7","8","9");

// Instructions
// add a new function, appendTableRow5(), which adds 5-column rows instead of 3-column rows
// create a 5-row by 5-column table showing the numbers, 1 through 25
// put borders around the cells, too, not just around the edge of the table
// Display output in <div id="2B">


//Creates a row that is 5 colums wide. Then appends the new row to a specified table
function appendTableRow5(tableobj, col1, col2, col3, col4, col5){
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  // insert content into columns
  td1.innerHTML = col1;
  td2.innerHTML = col2;
  td3.innerHTML = col3;
  td4.innerHTML = col4;
  td5.innerHTML = col5;
  // create style border around each cells
  td1.setAttribute("style", "border:1px solid black;")
  td2.setAttribute("style", "border:1px solid black;")
  td3.setAttribute("style", "border:1px solid black;")
  td4.setAttribute("style", "border:1px solid black;")
  td5.setAttribute("style", "border:1px solid black;")
  // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  // append the row to the tbody element in the table
  tableobj.children[0].appendChild(tr);
}

let div2b = document.getElementById("2B");
let table2b = createTable("table2b");
div2b.appendChild(table2b);
table2b.setAttribute("width", "100%");
appendTableRow5(table2b,"1","2","3","4","5");
appendTableRow5(table2b,"6","7","8","9","10");
appendTableRow5(table2b,"11","12","13","14","15");
appendTableRow5(table2b,"16","17","18","19","20");
appendTableRow5(table2b,"21","22","23","24","25");

// ==================


// ==================

// 8. create "totals" row and column in a table

// Instructions
// don't change table3A. it's just a template.
// Use table03A to create table3B. Create new functions as in item 2, above. 
// in table3B, add a column, "Price * Qty", and use JS to compute the correct values to put in the column
// add to table03B a "totals" row which gives the "grand total" of all numbers in the "Price * Qty" column

function appendTableRow4 (tableobj, col1, col2, col3, col4) {
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  // insert content into columns
  td1.innerHTML = col1;
  td2.innerHTML = col2;
  td3.innerHTML = col3;
  td4.innerHTML = col4;
  // create style border around each cells
  td1.setAttribute("style", "border:1px solid black;")
  td2.setAttribute("style", "border:1px solid black;")
  td3.setAttribute("style", "border:1px solid black;")
  td4.setAttribute("style", "border:1px solid black;")
  td4.setAttribute("style", "border:1px solid black;")
  // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  // append the row to the tbody element in the table
  tableobj.children[0].appendChild(tr);
}
let div3b = document.getElementById("3B");
let table3b = createTable("table3b");
div3b.appendChild(table3b);
table3b.setAttribute("style", "border:1px solid black;")
table3b.setAttribute("width", "100%");
appendTableHeader4(table3b, "Item", "Price", "Qty", "Total"); 
appendTableRow4(table3b, "Thingy", "1.00", "1", "");
rowTotal(1);
appendTableRow4(table3b, "Shoe", "2.00", "2", "");
rowTotal(2);
appendTableRow4(table3b, "Pop", "3.00", "3", "");
rowTotal(3);
appendTableRow4(table3b, "TOTAL COST:", " ", " ", " ");
columTotal(2);
columTotal(3);
//Finds the product of two cells and inserts it to the 3rd cell. 
function rowTotal(rowID){
  
  table3b = document.getElementById("table3b");
  let price = parseInt(table3b.children[0].children[rowID].children[1].innerText);
  let qty = parseInt(table3b.children[0].children[rowID].children[2].innerText);
  table3b.children[0].children[rowID].children[3].innerText = price*qty;
}
//Finds the sum of a colum then inserts the value into the last cell
function columTotal(columID, ){
  table3b = document.getElementById("table3b");
  let sum = 0;
  for(let i=1; i<4; i++){
    sum += parseInt(table3b.children[0].children[i].children[columID].innerText);
  }   
  table3b.children[0].children[4].children[columID].innerText = sum;
}


// 9. Revise a non-object-oriented HTML form. Make it so the field in focus displays *only* its own error (not the errors of all the other fields), however, if the user clicks the "validate" button, then display all errors.
// code below is from: https://www.guru99.com/practical-code-examples-using-javascript.html 

    // initialize error div id array
    var divs = new Array();
    divs[0] = "errFirst";
    divs[1] = "errLast";
    divs[2] = "errEmail";
    divs[3] = "errUid";
    divs[4] = "errPassword";
    divs[5] = "errConfirm";

    // function: validate() ---------------------------------------------
    function validate() {
        // initialize input array
        var inputs = new Array();
        inputs[0] = document.getElementById('first').value;
        inputs[1] = document.getElementById('last').value;
        inputs[2] = document.getElementById('email').value;
        inputs[3] = document.getElementById('uid').value;
        inputs[4] = document.getElementById('password').value;
        inputs[5] = document.getElementById('confirm').value;
        // initialize error array
        var errors = new Array();
        errors[0] = "<span style='color:red'>Please enter your first name!</span>";
        errors[1] = "<span style='color:red'>Please enter your last name!</span>";
        errors[2] = "<span style='color:red'>Please enter your email!</span>";
        errors[3] = "<span style='color:red'>Please enter your user id!</span>";
        errors[4] = "<span style='color:red'>Please enter your password!</span>";
        errors[5] = "<span style='color:red'>Please confirm your password!</span>";
        // update error array with error message
        for (i in inputs) {
            var errMessage = errors[i];
            var div = divs[i];
            if (inputs[i] == "")
                document.getElementById(div).innerHTML = errMessage;
            else if (i == 2) {
                var atpos = inputs[i].indexOf("@");
                var dotpos = inputs[i].lastIndexOf(".");
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= inputs[i].length)
                    document.getElementById('errEmail').innerHTML 
                      = "<span style='color: red'>Enter a valid email address!</span>";
                else
                    document.getElementById(div).innerHTML = "OK!";
            } else if (i == 5) {
                var first = document.getElementById('password').value;
                var second = document.getElementById('confirm').value;
                if (second != first)
                    document.getElementById('errConfirm').innerHTML 
                      = "<span style='color: red'>Your passwords don't match!</span>";
                else
                    document.getElementById(div).innerHTML = "OK!";
            } else
                document.getElementById(div).innerHTML = "OK!";
        }
    }

    // function: finalValidate() ------------------------------------
    function finalValidate() {
        var count = 0;
        for (i = 0; i < 6; i++) {
            var div = divs[i];
            if (document.getElementById(div).innerHTML == "OK!")
                count = count + 1;
        }
        if (count == 6)
            document.getElementById("errFinal").innerHTML 
              = "All the data you entered is correct!!!";
    }


// 10. Create a more object-oriented form

// Step 1. Create/append the DOM object 
let form00 = document.getElementById("form00");
let table00 = createTable("table00");
form00.appendChild(table00);

// Step 2. Create an JS object array containing form info 
let formArray = [
  {label: "First name:", inputType: "text", id: "first", 
    onkeyup: "validate();", errorId: "errFirst"}, 
  {label: "Last name:",  inputType: "text", id: "last",  
    onkeyup: "validate();", errorId: "errLast" }, 
  {label: "Email:",      inputType: "text", id: "email", 
    onkeyup: "validate();", errorId: "errEmail"}, 
  {label: "User id:",    inputType: "text", id: "uid",   
    onkeyup: "validate();", errorId: "errUid"  }, 
  {label: "Password:",   inputType: "password", id: "password", 
    onkeyup: "validate();", errorId: "errPassword"}, 
  {label: "Confirm Password:", inputType: "password", id: "confirm", 
    onkeyup: "validate();", errorId: "errConfirm"}
];

// Step 3. loop through the JS object array to populate the form

// your code here
function populateForm(arr){
  //get the table
  let table = document.getElementById("table00");
  
  //loop through the array to assign attributes, then append to the form
  for(let i=0; i<arr.length; i++){
    //Create Row
    let tr = document.createElement("tr");
    //Create Columns
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    
    //Create lable
    td1.innerHTML = arr[i].label;
    
    //Create input
    let input = document.createElement("input");
    input.setAttribute("type", arr[i].inputType);
    input.setAttribute("id", arr[i].id);
    input.setAttribute("onkeyup", arr[i].onkeyup);
    
    //Create div
    let div = document.createElement("div");    
    div.setAttribute("id", arr[i].errorId);
    
    //Append elements to colums
    td2.appendChild(input);
    td3.appendChild(div);
    
    //Append columns to row
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    //Append row to table
    table.children[0].appendChild(tr);    
  }
  //Create input button
  //<input type="button" id="create" value="Validate" onclick="validate();finalValidate();"/>
  //Create Row
  let tr = document.createElement("tr");
  //Create Columns
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  //Create input
  let input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("id", "create");
  input.setAttribute("value", "Validate");
  input.setAttribute("onclick","validate();finalValidate();");
  //Create div
  let div = document.createElement("div");  
  div.setAttribute("id","errFinal");
  //Append
  td1.appendChild(input);
  td2.appendChild(div);
  //Append
  tr.appendChild(td1);
  tr.appendChild(td2);
  //Append row to table
  table.children[0].appendChild(tr);  
}
populateForm(formArray);






// append to tableobj a 3-column table row 
function appendTableRow3 (tableobj, col1, col2, col3) {
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  // insert content into columns
  td1.innerHTML = col1;
  td2.innerHTML = col2;
  td3.innerHTML = col3;
  // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  // append the row to the tbody element in the table
  tableobj.children[0].appendChild(tr);
}

// return a DOM object containing an empty table (with tbody element)
function createTable(id) {
  let table = document.createElement("table");
  table.setAttribute("id", id);
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  return table;
}// 6. modify basic JS object, with "this" keyword
let person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 45,
  fullName: function() {return this.firstName  + " " + person.lastName}
}
document.getElementById("1A").innerHTML = person.fullName();

// Instructions
// modify person object, above, as follows
// add properties, streetAddress, city, state, zipCode
// add method, fullAddress(), which prints full address on a single line.
// Display output of fullAddress() in <div id="1B">
person.streetAddress = "123 Main Street";

// ==================

// 7. create basic DOM object
let div2a = document.getElementById("2A");
let table2a = createTable("table2a");
div2a.appendChild(table2a);
table2a.setAttribute("style", "border:1px solid black;")
table2a.setAttribute("width", "100%")
appendTableRow3(table2a,"1","2","3");
appendTableRow3(table2a,"4","5","6");
appendTableRow3(table2a,"7","8","9");

// Instructions
// add a new function, appendTableRow5(), which adds 5-column rows instead of 3-column rows
// create a 5-row by 5-column table showing the numbers, 1 through 25
// put borders around the cells, too, not just around the edge of the table
// Display output in <div id="2B">

// ==================

// 8. create "totals" row and column in a table

// Instructions
// don't change table3A. it's just a template.
// Use table03A to create table3B. Create new functions as in item 2, above. 
// in table3B, add a column, "Price * Qty", and use JS to compute the correct values to put in the column
// add to table03B a "totals" row which gives the "grand total" of all numbers in the "Price * Qty" column


// 9. Revise a non-object-oriented HTML form. Make it so the field in focus displays *only* its own error (not the errors of all the other fields), however, if the user clicks the "validate" button, then display all errors.
// code below is from: https://www.guru99.com/practical-code-examples-using-javascript.html 

    // initialize error div id array
    var divs = new Array();
    divs[0] = "errFirst";
    divs[1] = "errLast";
    divs[2] = "errEmail";
    divs[3] = "errUid";
    divs[4] = "errPassword";
    divs[5] = "errConfirm";

    // function: validate() ---------------------------------------------
    function validate() {
        // initialize input array
        var inputs = new Array();
        inputs[0] = document.getElementById('first').value;
        inputs[1] = document.getElementById('last').value;
        inputs[2] = document.getElementById('email').value;
        inputs[3] = document.getElementById('uid').value;
        inputs[4] = document.getElementById('password').value;
        inputs[5] = document.getElementById('confirm').value;
        // initialize error array
        var errors = new Array();
        errors[0] = "<span style='color:red'>Please enter your first name!</span>";
        errors[1] = "<span style='color:red'>Please enter your last name!</span>";
        errors[2] = "<span style='color:red'>Please enter your email!</span>";
        errors[3] = "<span style='color:red'>Please enter your user id!</span>";
        errors[4] = "<span style='color:red'>Please enter your password!</span>";
        errors[5] = "<span style='color:red'>Please confirm your password!</span>";
        // update error array with error message
        for (i in inputs) {
            var errMessage = errors[i];
            var div = divs[i];
            if (inputs[i] == "")
                document.getElementById(div).innerHTML = errMessage;
            else if (i == 2) {
                var atpos = inputs[i].indexOf("@");
                var dotpos = inputs[i].lastIndexOf(".");
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= inputs[i].length)
                    document.getElementById('errEmail').innerHTML 
                      = "<span style='color: red'>Enter a valid email address!</span>";
                else
                    document.getElementById(div).innerHTML = "OK!";
            } else if (i == 5) {
                var first = document.getElementById('password').value;
                var second = document.getElementById('confirm').value;
                if (second != first)
                    document.getElementById('errConfirm').innerHTML 
                      = "<span style='color: red'>Your passwords don't match!</span>";
                else
                    document.getElementById(div).innerHTML = "OK!";
            } else
                document.getElementById(div).innerHTML = "OK!";
        }
    }

    // function: finalValidate() ------------------------------------
    function finalValidate() {
        var count = 0;
        for (i = 0; i < 6; i++) {
            var div = divs[i];
            if (document.getElementById(div).innerHTML == "OK!")
                count = count + 1;
        }
        if (count == 6)
            document.getElementById("errFinal").innerHTML 
              = "All the data you entered is correct!!!";
    }


// 10. Create a more object-oriented form

// Step 1. Create/append the DOM object 
let form00 = document.getElementById("form00");
let table00 = createTable("table00");
form00.appendChild(table00);

// Step 2. Create an JS object array containing form info 
let formArray = [
  {label: "First name:", inputType: "text", id: "first", 
    onkeyup: "validate();", errorId: "errFirst"}, 
  {label: "Last name:",  inputType: "text", id: "last",  
    onkeyup: "validate();", errorId: "errLast" }, 
  {label: "Email:",      inputType: "text", id: "email", 
    onkeyup: "validate();", errorId: "errEmail"}, 
  {label: "User id:",    inputType: "text", id: "uid",   
    onkeyup: "validate();", errorId: "errUid"  }, 
  {label: "Password:",   inputType: "password", id: "password", 
    onkeyup: "validate();", errorId: "errPassword"}, 
  {label: "Confirm Password:", inputType: "password", id: "confirm", 
    onkeyup: "validate();", errorId: "errConfirm"}
];

// Step 3. loop through the JS object array to populate the form

// your code here
function populateForm(arr){
  //get the table
  let table = document.getElementById("table00");
  
  //loop through the array to assign attributes, then append to the form
  for(let i=0; i<arr.length; i++){
    //Create Row
    let tr = document.createElement("tr");
    //Create Columns
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    
    //Create lable
    td1.innerHTML = arr[i].label;
    
    //Create input
    let input = document.createElement("input");
    input.setAttribute("type", arr[i].inputType);
    input.setAttribute("id", arr[i].id);
    input.setAttribute("onkeyup", arr[i].onkeyup);
    
    //Create div
    let div = document.createElement("div");    
    div.setAttribute("id", arr[i].errorId);
    
    //Append elements to colums
    td2.appendChild(input);
    td3.appendChild(div);
    
    //Append columns to row
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    //Append row to table
    table.children[0].appendChild(tr);    
  }
  //Create input button
  //<input type="button" id="create" value="Validate" onclick="validate();finalValidate();"/>
  //Create Row
  let tr = document.createElement("tr");
  //Create Columns
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  //Create input
  let input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("id", "create");
  input.setAttribute("value", "Validate");
  input.setAttribute("onclick","validate();finalValidate();");
  //Create div
  let div = document.createElement("div");  
  div.setAttribute("id","errFinal");
  //Append
  td1.appendChild(input);
  td2.appendChild(div);
  //Append
  tr.appendChild(td1);
  tr.appendChild(td2);
  //Append row to table
  table.children[0].appendChild(tr);  
}
populateForm(formArray);

// append to tableobj a 3-column table row 
function appendTableRow3 (tableobj, col1, col2, col3) {
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  // insert content into columns
  td1.innerHTML = col1;
  td2.innerHTML = col2;
  td3.innerHTML = col3;
  // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  // append the row to the tbody element in the table
  tableobj.children[0].appendChild(tr);
}

// return a DOM object containing an empty table (with tbody element)
function createTable(id) {
  let table = document.createElement("table");
  table.setAttribute("id", id);
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  return table;
}