// --- global variables ---

		var loans = [
		  { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
		  { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
		]; 
		
		var loanAmount = 57,219.62;
		
		//function loadDoc() {
		$(document).ready( function() {
		
		  // --Replaced JS with JQuery -RH --
		  // pre-fill defaults for first loan year
		  var initialYear = loans[0].loan_year;
		  $("#loan_year0" + 1).val(initialYear++);
		  var initialLoanAmount = loans[0].loan_amount;
		  $("#loan_amt0" + 1).val(initialLoanAmount.toFixed(2));
		  var initialInterestRate = loans[0].loan_int_rate;
		  $("#loan_int0" + 1).val(initialInterestRate);
		  var withInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
		  $("#loan_bal0" + 1).val(toComma(withInterest.toFixed(2)));
		  
		  // pre-fill defaults for other loan years
		  for(var i=2; i<6; i++) {
			//JQuery			
			//Setting up value
			$("#loan_year0" + i).val(initialYear++);
			//Setting up attribute
			$("#loan_year0" + i).attr("disabled", "disabled");
			//Setting up CSS properties
			$("#loan_year0" + i).css({"background-color":"gray", "color":"white"});
			$("#loan_amt0" + i).val(initialLoanAmount.toFixed(2));
			$("#loan_int0" + i).val(initialInterestRate);
			$("#loan_int0" + i).attr("disabled", "disabled");
			$("#loan_int0" + i).css({"background-color":"gray", "color":"white"});
			withInterest = (withInterest + initialLoanAmount) * (1 + initialInterestRate);
			$("#loan_bal0" + i).val = toComma(withInterest.toFixed(2));
			
			} // end: "for" loop
		  
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
		  
		  // Once focus is lost, it updates the interest rates 
		  $("#loan_int01").blur( function() { 
		    if(validate($(this).val())){
			  updateInterestRate();
			  updateBal();
			}
		  });
		  
		  //As the focus is lost on a cell in the Amount column, the ammount, yearly Bal and total will be updated
		  $("input[id*=loan_amt]").blur(function(){
			if(validate($(this).val())){
				// This line gets the id of the loan_amt input
				let name = $(this).attr("id");
				// Gets the number of the input to make it usable in loan arrays
				let i = parseInt(name.substring((name.length-1),name.length)) - 1;
				// Turns the string into a number
				let newA = parseFloat($(this).val()); 	
				// Adjusts the values and sets it to two decimal places			
				$(this).val(newA.toFixed(2)); 
				// Adds new amount to the loans array
				loans[i].loan_amount = parseInt(newA.toFixed(2)); 
				//Update YE Bal column
				updateBal();
			}
		  });
		  
		}); 
		// end: function loadDoc()
		
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
		
		//Modifies the cells in the Int Rate column.
		function updateInterestRate(){
			loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
			for(var i=1; i<5; i++) {
				loans[i].loan_int_rate = parseFloat($("#loan_int01").val());
				$("#loan_int0"+ (i+1) ).val(loans[i].loan_int_rate);
			}			
		}
		//Modifies the YE Bal column after changes
		function updateBal(){
		  //Declaring variables
		  let totalAmount = 0;
		  loanAmount = 0;
		  let amount = 0 , interestRate = 0;
		  
		  for(let i = 0 ; i < 5 ; i++){
		    //Adds values from loans array
		    amount = loans[i].loan_amount;
			interestRate = loans[i].loan_int_rate;
			//Calculate the total amount and loan Amount
			totalAmount += amount;
			loanAmount = (loanAmount + amount) * (1 + interestRate);
			//Prints new YE Bal to table  
			$("#loan_bal0"+(i+1)).text("$"+toComma(loanAmount.toFixed(2)));			
		  }	
		  //Compute total interest that has accrued, then print to the tabel
		  $("#loan_int_accrued").text("$"+toComma((loanAmount - totalAmount).toFixed(2)));
		}
		//Validate the input value. 
		//Checks if value is a whole number or decimal
		function validate( value ){
			//Check if any number is placed before or after the decimal point or any type of number
			if(/^[0-9]+\.[0-9]+$/.test(value) || /^\d+$/.test(value)){
			  return true
			}
			else{
		      return false
			}
		}
		
		//Save function
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
			    updateBal();
			}
			else
				window.alert("No Data");
		}
		
		//AngularJS
		var app = angular.module('myPayments', []);
		app.controller('paymentController', function ($scope){		  
		  //Create properties
		  $scope.paymentPlan = [];
		  $scope.populate = function(){
			  let interestRate = loans[0].loan_int_rate;
			  let paymentsPerYear = 12;

			  //Formula for Amortized loan: a/{[(1+r)^n]-1}/[r(1+r)^n] = p (https://www.theBal.com/loan-payment-calculations-315564)
			  // [p] - Monthly Loan Payment 
			  // [a] - Total Amount 
			  // [r]- Monthly Interest Rate 
			  // [n] - Number of payments
			  
			  let p, a, r, n;
			  a = loanAmount; 
			  // Interest rate of a year
			  r = interestRate / 12
			  //number of payment per year in 10 years
			  n = paymentsPerYear * 10; 
			  // Implementing formula
			  p = a / (((Math.pow((1+r),n)) - 1) / (r * Math.pow((1+r),n))); 
			  
			  // number of payments in a year
			  let paymentPerYear = p * 12; 
			  
			  for(let i = 0 ; i < 9 ; i++){	
			  // subtracting payment from total loan amount			
				a = a - paymentPerYear; 
				// new interest rate
				let interest = a * interestRate; 
				//Populate paymentPlan array
				$scope.paymentPlan[i] = {
					"Year" : loans[4].loan_year + i + 1,
					"Payments" : "$"+toComma(paymentPerYear.toFixed(2)),
					"InterestAmt" : "$"+toComma(interest.toFixed(2)),
					"Balance" : "$"+toComma((a += interest).toFixed(2))
				}
			}
			//Final payment of the loan
			$scope.paymentPlan[9] = {
				"Year" : loans[4].loan_year + 10,
				"Payments" : "$"+toComma(a.toFixed(2)),
				"InterestAmt" : "$"+0,
				"Balance" : "$"+0
			}
		  }
		});