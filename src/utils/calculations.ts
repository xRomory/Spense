import { Balance, Expense } from "@/lib/validators/expenses.schema";
import { Person } from "@/lib/validators/person.schema";

export function calculateBalances(expenses: Expense[], people: Person[]): Balance[] {
  const balances: Balance[] = people.map(person => ({
    personId: person.id,
    owes: [],
    owed: [],
    netBalance: 0
  }));

  // Calculate what each person owes and is owed
  expenses.forEach(expense => {
    if(expense.settled) return;

    const payer = expense.paidBy;
    // const totalAmount = expense.amount;

    expense.splits.forEach(split => {
      if(split.personId !== payer && split.amount > 0) {
        // This person owes money to the payer
        const owedBalance = balances.find(b => b.personId === split.personId);
        const payerBalance = balances.find(b => b.personId === payer);

        if(owedBalance && payerBalance) {
          // Check if there's already a debt between these people
          const existingDebt = owedBalance.owes.find(o => o.toPersonId === payer);
          if(existingDebt) {
            existingDebt.amount += split.amount;
          } else {
            owedBalance.owes.push({ toPersonId: payer, amount: split.amount });
          }

          // Add to payer's owed list
          const existingOwed = payerBalance.owed.find(o => o.fromPersonId === split.personId);
          if (existingOwed) {
            existingOwed.amount += split.amount;
          } else {
            payerBalance.owed.push({ fromPersonId: split.personId, amount: split.amount });
          }
        }
      }
    });
  });

  // Calculate net balances
  balances.forEach(balance => {
    const totalOwed = balance.owed.reduce((sum, owed) => sum + owed.amount, 0);
    const totalOwes = balance.owed.reduce((sum, owes) => sum + owes.amount, 0);
    balance.netBalance = totalOwed - totalOwes;
  });

  return balances;
}

export function calculateEqualSplit(amount: number, peopleCount: number): number {
  return Math.round((amount / peopleCount) * 100 / 100);
}

export function formatCurrency(amount: number): string {
  return `₱${amount.toFixed(2)}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}