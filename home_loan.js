var util = require('util');
var inflation = 0.03;
var market_gain = 0.05;
var tax = 0.02;
var insurance = 0.005;
var maintenance = 0.01;

function Loan(args) {
    this.amount = args['amount'];
    this.initial = this.amount;
    this.term = args['term'];
    this.rate = args['rate'];
    var n = this.term * 12;
    var i = this.rate / 12;
    this.payment = (i * this.initial * Math.pow(1 + i,n) ) /
      (Math.pow(1 + i,n) - 1);

    this.make_payment = function() {
      this.amount -= this.payment - this.interest();
      return this.payment;
    };

    this.interest = function(){
      return this.amount * this.rate / 12;
    };
}

var value = 200000.0;
var down_payment = value * 0.10;
var home_loan = new Loan({amount: value - down_payment, term: 15, rate: 0.04});
var invested = 0.0;
var other_invested = 0.0;
var start_year = 2013;
var total_cost = 0.0;
var rent = 1000.0;
var total_rent = 0.0;

util.puts("===== House\tApartment\tDiff\tInvest(home)\tInvest(apt)\tBalance(house)\tBalance(apt)");
var diff = 0;

for (var year = 0; year < 15; year++) {
  if (year === 0) {
    annual_cost = down_payment;
    invested += down_payment;
  }
  else {
    annual_cost = 0;
    invested += diff > 0 ? diff : 0;
    other_invested += diff < 0 ? -diff : 0;
  }
  annual_rent = 0;

  for (var month = 0; month < 12; month++) {
    annual_cost += home_loan.term >= year-1 ? home_loan.make_payment() : 0;
    annual_cost += value * maintenance/12;
    annual_cost += value * tax/12;
    annual_cost += value * insurance/12;
    annual_rent += rent;
  }
  diff = annual_cost - annual_rent;
  invested += invested * market_gain/12;
  other_invested += other_invested * market_gain/12;

  total_cost += annual_cost;
  total_rent += annual_rent;
  util.puts(util.format("%d: %d\t%d\t\t%d\t%d\t\t%d\t\t%d\t\t%d",
    Math.round(year + start_year),
    Math.round(annual_cost),
    Math.round(annual_rent),
    Math.round(diff),
    Math.round(other_invested),
    Math.round(invested),
    Math.round(value - total_cost - home_loan.amount+ other_invested),
    Math.round(invested - total_rent)));

  rent+= rent * inflation;
  value += value * inflation;
}