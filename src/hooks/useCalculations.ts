import { Expense } from "@/lib/validators/expenses.schema";
import { Person } from "@/lib/validators/person.schema";
import { calculateBalances } from "@/utils/calculations";
import { useMemo } from "react";

export function useCalculations(expenses: Expense[], people: Person[]) {
  const balances = useMemo(() => {
    return calculateBalances(expenses, people);
  }, [expenses, people]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const settledExpenses = useMemo(() => {
    return expenses.filter(expense => expense.settled);
  }, [expenses]);

  const unsettledExpenses = useMemo(() => {
    return expenses.filter(expense => !expense.settled);
  }, [expenses]);

  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || "Unknown";
  }

  return {
    balances,
    totalExpenses,
    settledExpenses,
    unsettledExpenses,
    getPersonName,
  };
}