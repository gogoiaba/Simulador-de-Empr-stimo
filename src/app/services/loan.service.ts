import { Injectable } from '@angular/core';

import { AmortizationItem, LoanInput, LoanResult } from '../models/loan.models';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  calculateLoan(input: LoanInput): LoanResult {
    const principal = input.amount;
    const monthlyRate = input.interestRate / 100;
    const installments = input.installments;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / installments;
      const totalAmount = monthlyPayment * installments;

      return {
        monthlyPayment: this.roundCurrency(monthlyPayment),
        totalAmount: this.roundCurrency(totalAmount),
        totalInterest: 0,
      };
    }

    const factor = Math.pow(1 + monthlyRate, installments);
    const monthlyPayment = principal * ((monthlyRate * factor) / (factor - 1));
    const totalAmount = monthlyPayment * installments;
    const totalInterest = totalAmount - principal;

    return {
      monthlyPayment: this.roundCurrency(monthlyPayment),
      totalAmount: this.roundCurrency(totalAmount),
      totalInterest: this.roundCurrency(totalInterest),
    };
  }

  generateAmortizationSchedule(input: LoanInput): AmortizationItem[] {
    const result = this.calculateLoan(input);
    const monthlyRate = input.interestRate / 100;
    let remainingBalance = input.amount;

    return Array.from({ length: input.installments }, (_, index) => {
      const installment = index + 1;
      const rawInterest = monthlyRate === 0 ? 0 : remainingBalance * monthlyRate;
      let rawAmortization = result.monthlyPayment - rawInterest;
      let payment = result.monthlyPayment;

      if (installment === input.installments) {
        rawAmortization = remainingBalance;
        payment = rawAmortization + rawInterest;
      }

      remainingBalance = Math.max(remainingBalance - rawAmortization, 0);

      return {
        installment,
        payment: this.roundCurrency(payment),
        interest: this.roundCurrency(rawInterest),
        amortization: this.roundCurrency(rawAmortization),
        remainingBalance: this.roundCurrency(remainingBalance),
      };
    });
  }

  private roundCurrency(value: number): number {
    return Number(value.toFixed(2));
  }
}
