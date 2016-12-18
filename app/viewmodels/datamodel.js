/**
 * @author mishp3
 */
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

function appViewModel(){
	var self = this;
	self.accountsList = ko.observableArray(['5989919999999990 - Shea Parker', 'Germany', 'Spain']);
	self.accounts = ko.observableArray([
					 new account(5989919999999990, "Shea Parker"),
					 new account(9999999975, "Shea Parker"),
					 new account(9846511110000919, "Barbara Stockton"),
					 new account(9846511116655442, "Barbara Stockton"),
					 new account(4659984848, "Barbara Stockton")
					]),
   
   self.selectedAccount =ko.observable("");
   self.merchantCode= ko.observableArray([
   	          new merchantCategoryCode(5198, "Home Improvement"),
   	          new merchantCategoryCode(5200, "Home Improvement"),
   	          new merchantCategoryCode(5211, "Home Improvement"),
   	          new merchantCategoryCode(5712, "Home Improvement"),
   	          new merchantCategoryCode(1520, "Home Improvement"),
   	          new merchantCategoryCode(5541, "Gas Station"),
   	          new merchantCategoryCode(5542, "Gas Station")
   ]);
   self.buttonText = ko.observable("Start");
   self.tempList= ko.observableArray(["One","Two"]);
    self.streamData= function(){
   	     	var temp = self.buttonText();
   	     	var myVar = "";
   	     	if(temp==="Start")
   	     	temp="Stop";
   	     	else{
   	     	temp="Start";
   	     	}
   	     	self.buttonText(temp);
   	     	myVar = setInterval(function(){
   	     			tempList.push("Three");
   	     			},2000);
   	     	/*while(temp==="Stop"){
   	     	}*/
   };
   self.selectedMCC = ko.observable();
   self.minTransAmount = ko.observable(20);
   self.maxTransAmount = ko.observable(1000);
   self.randomAccounts = ko.observable(false);
   self.randomMCC = ko.observable(false);
   self.sendTransactionStream = ko.observable(false);
}
ko.applyBindings(appViewModel);
