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
	this.mcc = mcc;
	this.storeName = storeName;
}
function appViewModel(){
	var self = this;
	self.amount = ko.observable("200");
	self.accountsList = ko.observableArray(['5989919999999990 - Shea Parker', 'Germany', 'Spain']);
	self.accounts = ko.observableArray([
					 new account(5989919999999990, "Shea Parker"),
					 new account(9999999975, "Shea Parker"),
					 new account(9846511110000919, "Barbara Stockton"),
					 new account(9846511116655442, "Barbara Stockton"),
					 new account(4659984848, "Barbara Stockton")
					]);
}
ko.applyBindings(new appViewModel());
