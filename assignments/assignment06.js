// --- global variables ---

		var loans = [
		  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
		]; 
		
		var interestAccrued = 57219.62;
		
		//function loadDoc() {
		$(document).ready( function() {
		
		  // --Replaced JS with JQuery -JG --
		  // pre-fill defaults for first loan year
		  var InitialYear = loans[0].loan_year;
		  $("#loan_year0" + 1).val(InitialYear++);
		  var initialLoanAmount = loans[0].loan_amount;
		  $("#loan_amt0" + 1).val(initialLoanAmount.toFixed(2));
		  var initialInterestRate = loans[0].loan_int_rate;
		  $("#loan_int0" + 1).val(initialInterestRate);
		  var withInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
		  $("#loan_bal0" + 1).val(toComma(withInterest.toFixed(2)));
		  
		  // pre-fill defaults for other loan years
		  for(var i=2; i<6; i++) {
			//JQuery			
			$("#loan_year0" + i).val(InitialYear++); //Set value
			$("#loan_year0" + i).attr("disabled", "disabled");//Set attribute
			$("#loan_year0" + i).css({"background-color":"gray", "color":"white"});//Set CSS property:value
			
			$("#loan_amt0" + i).val(initialLoanAmount.toFixed(2));
			$("#loan_int0" + i).val(initialInterestRate);
			$("#loan_int0" + i).attr("disabled", "disabled");
			$("#loan_int0" + i).css({"background-color":"gray", "color":"white"});
			withInterest = (withInterest + initialLoanAmount) * (1 + initialInterestRate);
			$("#loan_bal0" + i).val = toComma(withInterest.toFixed(2));
			
			}// end: "for" loop
		  
		  // all input fields: select contents on fucus
		  $("input[type=text]").focus(function() {
			$(this).select();
			$(this).css("background-color", "yellow");
		  }); 
		  
		  $("input[type=text]").blur(function() {
		    if(validate($(this).val())){
			  $(this).css("background-color", "white");
			}
			else{
			  $(this).css("background-color", "red");
			}			
		  });
		  
		  // set focus to first year: messes up codepen
		  $("#loan_year01").focus();
		  $("#loan_year01").blur( function() {
		    if(validate($(this).val())){
			  updateLoansArray();
			}			 
		  });
		  
		  // Update the interest rates once the focus on that cell is lost
		  $("#loan_int01").blur( function() { 
		    if(validate($(this).val())){
			  updateInterestRate();
			  updateYearEndBalance();
			}
		  });
		  
		  //Update the ammount, yearly balance and total once the focus is lost on a cell in the Amount column
		  //Note: https://api.jquery.com/attribute-contains-selector/
		  $("input[id*=loan_amt]").blur(function(){
			//console.log("Amount Selector: "+this);
			if(validate($(this).val())){
				let amountName = $(this).attr("id"); // Gets the id of the loan_amt input
				//console.log("Amount Selector: "+amountName);//Testing
				let i = parseInt(amountName.substring((amountName.length-1),amountName.length)) - 1; // Gets the number of the input and adjusts it for use in the loans array
				//console.log(i); // Testing
				let newAmount = parseFloat($(this).val()); // Turns the string into a number				
				$(this).val(newAmount.toFixed(2)); // Adjusts the value to two decimal places
				loans[i].loan_amount = parseInt(newAmount.toFixed(2)); // Inserts new amount to the loans array
				//console.log(newAmount); // Testing				
				//Update YE Bal column
				updateYearEndBalance();
			}
		  });
		  
		}); // end: function loadDoc()
		
		function toComma(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		function updateLoansArray() {
		  loans[0].loan_year = parseInt($("#loan_year01").val());
		  for(var i=1; i<5; i++) {
			loans[i].loan_year = loans[0].loan_year + i;
			$("#loan_year0"+ (i+1) ).val(loans[i].loan_year);
		  }
		}
		
		//Update the cells in the Int Rate column.
		function updateInterestRate(){
			loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
			for(var i=1; i<5; i++) {
				loans[i].loan_int_rate = parseFloat($("#loan_int01").val());
				$("#loan_int0"+ (i+1) ).val(loans[i].loan_int_rate);
			}			
		}
		//Updates the Year End Balance column after a change has been made
		function updateYearEndBalance(){
		  //Declare variables
		  let totalAmount = 0;
		  interestAccrued = 0;
		  let amount = 0 , interestRate = 0;
		  
		  for(let i = 0 ; i < 5 ; i++){
		    //Store values from loans array
		    amount = loans[i].loan_amount;
			interestRate = loans[i].loan_int_rate;
			//Calculate total amount and interestAccrued
			totalAmount += amount;
			interestAccrued = (interestAccrued + amount) * (1 + interestRate);
			//Output new Year End Balance to table  
			$("#loan_bal0"+(i+1)).text("$"+toComma(interestAccrued.toFixed(2)));			
		  }	
		  //Calculate total interest that has accrued, then output to tabel
		  $("#loan_int_accrued").text("$"+toComma((interestAccrued - totalAmount).toFixed(2)));
		}
		//Validate the input value. 
		//Checks if value is a whole number or decimal
		function validate( value ){
			//Checks if any number of number characters are before '.' and if any number of number characters are after the decimal point
			//OR
			//That any amount of number characters are contained in the string
			if(/^[0-9]+\.[0-9]+$/.test(value) || /^\d+$/.test(value)){
			  return true
			}
			else{
		      return false
			}
		}
		
		//Save the function
		function saveData(){
			console.log("Data Saved");
			let data = JSON.stringify(loans);
			localStorage.setItem("loanData", data);
		}
		
		//Load function
		function loadData(){
			if(localStorage.getItem("loanData") != null){
			    console.log("data got");
				let data = localStorage.getItem("loanData");
				loans = JSON.parse(data);
				
				$("#loan_year01").val(loans[0].loan_year);
				$("#loan_int01").val(loans[0].loan_int_rate);
				
				for(let i=1 ; i < 6 ; i++){
					$("#loan_amt0"+i).val((loans[i-1].loan_amount).toFixed(2));
				}
			    
			    updateInterestRate();
			    updateYearEndBalance();
			}
			else
				window.alert("No Data is Stored on this Device.");
		}
		
		//AngularJS
		 //initializing the module
		var app = angular.module('myPayments', []);
		//adding controller
		app.controller('paymentController', function ($scope){		  
		  //Create properties
		  $scope.paymentPlan = [];
		  $scope.populate = function(){
			  let interestRate = loans[0].loan_int_rate;
			  let periods = 12; // payment periods of 12 months (1 year)
			  
			  //Formula for Amortized loan: a/{[(1+r)^n]-1}/[r(1+r)^n] = p
			  // [p] - Monthly Loan Payment 
			  // [a] - Total Amount 
			  // [r]- Monthly Interest Rate 
			  // [n] - Number of payments 
			  //Source: https://www.thebalance.com/loan-payment-calculations-315564		  
			  
			  // Initializing variables
			  let p, a, r, n;
			  // Loan Amount
			  a = interestAccrued; 
			  // Interest rate for 1 year payment
			  r = interestRate / 12
			  // Numper of period of 10 years
			  n = periods * 10;
			  // Initializing the formula
			  p = a / (((Math.pow((1+r),n)) - 1) / (r * Math.pow((1+r),n)));
			  // Number of payments in 1 year
			  let yearlyPayment = p * 12;
			  
			  // This for loop will go through the record to update
			  for(let i = 0 ; i < 9 ; i++){	
			  // Subtract amount from total Loan Amount 'a'			
				a = a - yearlyPayment; 

				// Find new interest rate
				let interest = a * interestRate;

				//Populate paymentPlan array
				$scope.paymentPlan[i] = {
					"Year" : loans[4].loan_year + i + 1,
					"Pay" : "$"+toComma(yearlyPayment.toFixed(2)),
					"IntAmt" : "$"+toComma(interest.toFixed(2)),
					"Bal" : "$"+toComma((a += interest).toFixed(2))
				}
			}
			//Final payment of the loan
			$scope.paymentPlan[9] = {
				"Year" : loans[4].loan_year + 10,
				"Pay" : "$"+toComma(a.toFixed(2)),
				"IntAmt" : "$"+0,
				"Bal" : "$"+0
			}
		  }
		});