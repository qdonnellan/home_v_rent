inflation = 0.03
market_gain = 0.05
tax = 0.02
insurance = 0.005
maintenance = 0.01

class Loan
  attr_accessor :term, :amount
  def initialize(args)
    @amount = args[:amount]
    @initial = @amount
    @term = args[:term]
    @rate = args[:rate]
  end

  def make_payment
    @amount -= self.principal
    self.principal + self.interest
  end

  def interest
    @amount * @rate / 12
  end

  def principal
    payment = @initial / @term / 12
    payment > @amount ? @amount : payment
  end
end

value = 200000
down_payment = value * 0.10
home_loan = Loan.new amount: value - down_payment, term: 15, rate: 0.04
invested = 0
other_invested = 0
start_year = 2013
total_cost = 0
rent = 1000
total_rent = 0
puts "===== House\tApartment\tDiff\tInvest(home)\tInvest(apt)\tBalance(house)\tBalance(apt)"
diff = 0

20.times do |year|
  if year == 0
    annual_cost = down_payment
    invested += down_payment
  else
    annual_cost = 0
    invested += diff unless diff < 0
    other_invested += -diff unless diff >= 0
  end
  annual_rent = 0
  12.times do |month|
    annual_cost += home_loan.make_payment if home_loan.term >= year
    
    annual_cost += value * maintenance/12
    annual_cost += value * tax/12 #tax
    annual_cost += value * insurance/12
    
    annual_rent += rent
    
  end
  diff = annual_cost - annual_rent
  invested += invested * market_gain/12
  other_invested += other_invested * market_gain/12

  total_cost += annual_cost
  total_rent += annual_rent
  puts "#{year+start_year}: %.0f\t%.0f\t\t%.0f\t%.0f\t\t%.0f\t\t%.0f\t\t%.0f" % 
    [annual_cost, annual_rent, diff, other_invested, invested, value - total_cost - home_loan.amount+ other_invested, invested-total_rent]

  # INFLATION
  rent+= rent * inflation
  value += value * inflation

end
# puts "House value - cost: %0.f| Investment - rent%.0f" % [value - total_cost, invested - total_rent]