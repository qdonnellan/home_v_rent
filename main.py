# Initial Calculated Home Positions
# --------------------------------------------------------------------------------------------------------------------------
value = 200 # initial home value in thousands
term = 15 # length of loan contract in years
time = 2 # length of time to look at
down = 10 # percent down payment
rate = 3 # percentage rate on mortaged loan
a = 2.0 # rate at which the home appreciates
inflation = 3.0 # inflation rate
closing_costs = 7000
tax = 2.5
ins = 1200.0 # yearly premium on homeowner's insurance

P = float(value)*1000*(1-float(down)/100) #principal amount after down payment
i = float(rate)/12/100 #the monthly rate as a decimal
n = term*12.0 # total number of payments
payment = (i*P*(1+i)**n)/((1+i)**n-1) #the annunity formula (used to calculate amortized monthly payments)
total_interest = 0 # no interest is paid before the first month
total_principal = float(value)*1000*float(down)/100 # total principal before any monthly payments is the down payment
current_value = float(value)*1000
total_tax = 0
total_ins = 0

# Initial Calculted Rent Positions
# --------------------------------------------------------------------------------------------------------------------------
rent = 1000.0 #monthly rent payments
total_rent = 0

# Begin Monthly Payments
# --------------------------------------------------------------------------------------------------------------------------
for month in range(time*12):
	# On a house
	interest_this_month = P*i # monthly interest payment is the remaining principal times the monthly rate
	principal_this_month = payment - interest_this_month
	P -= principal_this_month	#principal decreases each month
	total_interest += interest_this_month
	total_principal += principal_this_month 
	current_value += current_value*(float(a)/12/100) # value of the home increasing as apprciation a
	total_tax += current_value*tax/12/100 #monthly tax payment using an appraised value equal to the current value of home
	total_ins += ins/12

	# On a rental property
	rent = rent*(1+float(inflation)/12/100) # assume rent increasing with inflation
	total_rent += rent

# Calculate Total Costs
# --------------------------------------------------------------------------------------------------------------------------
total_paid = total_principal + total_interest + closing_costs + total_tax + total_ins
equity = current_value - P # if you were to sell the house now, how much could you pocket after paying off remaining principal
net_profit = equity - total_paid


print int(net_profit), int(total_rent)