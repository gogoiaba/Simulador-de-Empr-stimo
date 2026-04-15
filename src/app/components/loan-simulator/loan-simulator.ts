import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AmortizationItem, LoanInput, LoanResult } from '../../models/loan.models';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-simulator',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './loan-simulator.html',
  styleUrl: './loan-simulator.scss',
})
export class LoanSimulatorComponent {
  private readonly loanService = inject(LoanService);
  private readonly currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  loanInput: LoanInput = {
    amount: 50000,
    interestRate: 1.99,
    installments: 24,
  };

  amountDisplay = this.formatCurrency(this.loanInput.amount);
  result: LoanResult | null = null;
  amortizationSchedule: AmortizationItem[] = [];
  errorMessage = '';

  calculate(): void {
    this.errorMessage = '';

    if (!this.isInputValid()) {
      this.result = null;
      this.amortizationSchedule = [];
      this.errorMessage =
        'Preencha um valor maior que zero para o empréstimo e para as parcelas. A taxa de juros não pode ser negativa.';
      return;
    }

    this.result = this.loanService.calculateLoan(this.loanInput);
    this.amortizationSchedule = this.loanService.generateAmortizationSchedule(this.loanInput);
  }

  onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const numericValue = this.parseCurrencyValue(input.value);

    this.loanInput.amount = numericValue;
    this.amountDisplay = numericValue > 0 ? this.formatCurrency(numericValue) : '';
    input.value = this.amountDisplay;
  }

  trackByInstallment(_: number, item: AmortizationItem): number {
    return item.installment;
  }

  private isInputValid(): boolean {
    const { amount, interestRate, installments } = this.loanInput;

    return amount > 0 && installments > 0 && interestRate >= 0;
  }

  private formatCurrency(value: number): string {
    return this.currencyFormatter.format(value);
  }

  private parseCurrencyValue(value: string): number {
    const digitsOnly = value.replace(/\D/g, '');

    return digitsOnly ? Number(digitsOnly) : 0;
  }
}
