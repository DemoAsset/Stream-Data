/**
 * @author mishp3
 */

var sendData,transactionList;
var url = 'http://10.60.213.33:7003/stream/CreditCardTransactionStream',id = 100;

function account(accountNumber, name) {
	var self = this;
	self.accountNumber = accountNumber;
	self.name = name;
	self.getAccountString = ko.computed(function(){
		var acc = self.accountNumber.toString();
		var dash = acc.concat(" - ");
		var res = dash.concat(self.name);
		return res;
		});
}

function merchantCategoryCode(mcc, storeName) {
	var self = this;
	self.mcc = mcc;
	self.storeName = storeName;
	self.getMCCString = ko.computed(function(){
		var mcc = self.mcc.toString();
		var dash = mcc.concat(" - ");
		var res = dash.concat(self.storeName);
		return res;
		});
}

function transactionData(accountNumber, amount, mcc, transID){
	var self = this;
	self.CCT_ACCTNBR = accountNumber;
	self.CCT_TRANAMOUNT = amount;
	self.CCT_MERCHANTCATEGORYCODE = mcc;
	self.CCT_TRANSEQ = transID;
	//self.dateTimeStamp = dateTimeStamp;
}

function sendAjaxRequest(data){
	$.ajax({
		type : 'POST',
		url : url,
		dataType : 'json',
		contentType : "application/json",
		crossDomain :true,
		headers : {
			"Authorization" : "Basic " + btoa("MarketingAdministratorFS" + ":" + "install"),
		},
		data : JSON.stringify(data),
		success : function() {
			//var trans = JSON.parse(data);
			//transactionList.push(new transactionData(trans.selectedAccount,trans.transAmount,trans.selectedMCC,trans.transID));
			transactionList.push(data);
		},
		error: function(e){
		    console.log(e);	
		    //var trans = JSON.parse(data);
		    //transactionList.push(new transactionData(trans.selectedAccount,trans.transAmount,trans.selectedMCC,trans.transID));
		    transactionList.unshift(data);
		}
	}); 
}
function formatCurrency(value) {
    return "$" + value;
}
function clearTransactions() {
  transactionList.removeAll();
}
function appViewModel(){
	var self = this;
	transactionList = ko.observableArray();
	
	//List of accounts
	self.accounts = ko.observableArray([
					 new account(5989919999999990, "Shea Parker"),
					 new account(9999999975, "Shea Parker"),
					 new account(9846511110000919, "Barbara Stockton"),
					 new account(9846511116655442, "Barbara Stockton"),
					 new account(4659984848, "Barbara Stockton")
					]);
   self.selectedAccount =ko.observable("");
   
   //List of merchant category codes
   self.merchantCode= ko.observableArray([
   	          new merchantCategoryCode(5198, "Home Improvement"),
   	          new merchantCategoryCode(5200, "Home Improvement"),
   	          new merchantCategoryCode(5211, "Home Improvement"),
   	          new merchantCategoryCode(5712, "Home Improvement"),
   	          new merchantCategoryCode(1520, "Home Improvement"),
   	          new merchantCategoryCode(5541, "Gas Station"),
   	          new merchantCategoryCode(5542, "Gas Station")
   ]);
   
   //List of other account which will picked randomly
   self.randomAccountsList = [
                  new account(9999999998, "Skyla Anderson"),
                  new account(9999999992, "Talia Green"),
                  new account(9999999993, "Talia Green"),
                  new account(9999999990, "Skyla Anderson")     
   ];
   
   //List of other merchant category code which will picked randomly
   self.randomMerchantCode = [
                  new merchantCategoryCode(1712, "Random"),
                  new merchantCategoryCode(5073, "Random"),
                  new merchantCategoryCode(1110, "Random"),
                  new merchantCategoryCode(1111, "Random")
   ];
   self.buttonText = ko.observable("Start");
   
   /**
    *   CallBack function to start and stop transaction stream 
    */
   self.streamData= function(){
   	     	var temp = self.buttonText();
   	     	if(temp==="Start"){
   	     	temp="Stop";
   	     	sendStream();
   	     	//startWorker();
   	     	}
   	     	else{
   	     	temp="Start";
   	     	clearInterval(sendData);
   	     	//stopWorker();
   	     	}
   	     	self.buttonText(temp);
   	     	/*myVar = setInterval(function(){
   	     			tempList.push("Three");
   	     			},2000);*/
   	     	
   };
   
   /**
    *  Helper function to create JSON object and send it to the server. 
    */
   self.sendStream = function(){

   sendData = setInterval(function(){
   	     			var data = createTransData();
   	     			sendAjaxRequest(data);
   	     			},2000);
   };
   
   
   self.selectedMCC = ko.observable();
   self.minTransAmount = ko.observable(20);
   self.maxTransAmount = ko.observable(1000);
   self.randomAccounts = ko.observable(false);
   self.randomMCC = ko.observable(false);
   
   
    /**
     * Creates a Transaction object. 
     */
	function createTransData() {
		var transAmount = Math.random() * (self.maxTransAmount() - self.minTransAmount() + 1) + self.minTransAmount();
		var ranAccIndex,ranMCCIndex;

		if (self.randomAccounts())
			ranAccIndex = Math.floor(Math.random() * (randomAccountsList.length + 1));
		if (self.randomMCC())
			ranMCCIndex = Math.floor(Math.random() * (randomMerchantCode.length + 1));

        console.log("ranAccIndex: " + ranAccIndex + " randomAccountsList: " + randomAccountsList.length);
		var jsonObj = new Object();
		if (ranAccIndex < randomAccountsList.length) {                         //Stores Account Number in JSON
			var obj = randomAccountsList[ranAccIndex];
			jsonObj.selectedAccount = obj.accountNumber;
		}
		else
			jsonObj.selectedAccount = self.selectedAccount();

		if (ranMCCIndex < randomMerchantCode.length)                          //Stores Merchant Category Code in JSON
			jsonObj.selectedMCC = randomMerchantCode[ranMCCIndex].mcc;
		else
			jsonObj.selectedMCC = self.selectedMCC();

		jsonObj.transAmount = transAmount.toFixed(2);                                    //Stores Transaction Amount in JSON
		
		jsonObj.transID = id++;												  //Stores Unique Transaction ID in JSON 
		
		
		//return JSON.stringify(jsonObj);
		return new transactionData(jsonObj.selectedAccount,jsonObj.transAmount,jsonObj.selectedMCC, jsonObj.transID);
	}; 
}
ko.applyBindings(appViewModel);
