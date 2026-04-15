import { LoanService } from './loan.service';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(() => {
    service = new LoanService();
  });

  it('should calculate a loan using the Price formula', () => {
    const result = service.calculateLoan({
      amount: 10000,
      interestRate: 2,
      installments: 12,
    });

    expect(result.monthlyPayment).toBe(945.6);
    expect(result.totalAmount).toBe(11347.15);
    expect(result.totalInterest).toBe(1347.15);
  });

  it('should support loans with zero interest', () => {
    const result = service.calculateLoan({
      amount: 12000,
      interestRate: 0,
      installments: 12,
    });

    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalAmount).toBe(12000);
    expect(result.totalInterest).toBe(0);
  });

  it('should generate a full amortization schedule', () => {
    const schedule = service.generateAmortizationSchedule({
      amount: 5000,
      interestRate: 1,
      installments: 5,
    });

    expect(schedule).toHaveLength(5);
    expect(schedule[0].installment).toBe(1);
    expect(schedule[0].interest).toBe(50);
    expect(schedule[4].remainingBalance).toBe(0);
  });
});
