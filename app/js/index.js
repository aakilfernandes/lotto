var app = angular.module('app',[])

app.run(function($rootScope,$interval){
	$rootScope.accounts = web3.eth.accounts
	$rootScope.account = web3.eth.defaultAccount
	$rootScope.blockNumber = web3.eth.blockNumber
	$rootScope.buyers

	var blocksPerRound = 6800

	$rootScope.$watch('account',function(account){
		$rootScope.balance = web3.eth.getBalance(account).toString(10)
	})

	$interval(function(){
		$rootScope.blockNumber = web3.eth.blockNumber
		$rootScope.balance = web3.eth.getBalance($rootScope.account).toString(10)
	},300)

	$rootScope.$watch('blockNumber',function(blockNumber){
		$rootScope.round = Math.floor(blockNumber/blocksPerRound)
	})

	function updateBuyers(){
		var buyerAddresses = Lotto.getBuyerAddresses()
			,buyers = {}

		buyerAddresses.forEach(function(buyerAddress){
			buyers[buyerAddress] = Lotto.getBalance(buyerAddress)
		})
	}
})