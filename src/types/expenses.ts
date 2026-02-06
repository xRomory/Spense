export type SplitType = "equal" | "custom";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitType: SplitType,
  splits: { personId: string; amount: number; }[];
  date: string;
  settled: boolean;
  settledAt?: string;
}

export interface Balance {
  personId: string;
  owes: { toPersonId: string; amount: number; }[];
  owed: { fromPersonId: string; amount: number; }[];
  netBalance: number;
}

export interface Settlement {
  id: string;
  fromPersonId: string;
  toPersonId: string;
  amount: number;
  expenseId: string;
  settledAt: string;
}