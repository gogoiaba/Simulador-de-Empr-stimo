export interface LoanInput {
  amount: number;
  interestRate: number;
  installments: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
}

export interface AmortizationItem {
  installment: number;
  payment: number;
  interest: number;
  amortization: number;
  remainingBalance: number;
}
