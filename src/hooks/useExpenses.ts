// Note: this function is in localStorage. Will refactor later utilizing Zustand

import {
  STORAGE_KEY_EXPENSES,
  STORAGE_KEY_PEOPLE,
  STORAGE_KEY_SETTLEMENTS
} from "@/constants";
import { Expense, Person, Settlement } from "@/types";
import { generateId } from "@/utils/calculations";
import { useEffect, useState } from "react";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY_EXPENSES);
    const savedPeople = localStorage.getItem(STORAGE_KEY_PEOPLE);
    const savedSettlements = localStorage.getItem(STORAGE_KEY_SETTLEMENTS);

    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

    if (savedSettlements) setSettlements(JSON.parse(savedSettlements));

    if (savedPeople) {
      setPeople(JSON.parse(savedPeople));
    } else {
      const defaultPeople = [
        { id: generateId(), name: "You" },
        { id: generateId(), name: "Emil" },
        { id: generateId(), name: "Octa" },
      ];

      setPeople(defaultPeople);
      localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(defaultPeople));
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if(!hydrated) return;

    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  }, [expenses, hydrated]);

  useEffect(() => {
    if(!hydrated) return;

    localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(people));
  }, [people, hydrated]);

  useEffect(() => {
    if(!hydrated) return;

    localStorage.setItem(STORAGE_KEY_SETTLEMENTS, JSON.stringify(settlements));
  }, [settlements, hydrated]);

  // === Remove codes below once connected to backend (CRUD) ===
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId()
    };

    setExpenses(prev => [...prev, newExpense]);
  };

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: generateId(),
      name
    };

    setPeople(prev => [...prev, newPerson]);

    return newPerson;
  };

  const settleExpense = (
    expenseId: string,
    fromPersonId: string,
    toPersonId: string,
    amount: number
  ) => {
    const settlement: Settlement = {
      id: generateId(),
      fromPersonId,
      toPersonId,
      amount,
      expenseId,
      settledAt: new Date().toISOString()
    };

    setSettlements(prev => [...prev, settlement]);

    // Mark expense as settled if fully settled
    setExpenses(prev => prev.map(expense => {
      if (expense.id === expenseId) {
        return { ...expense, settled: true, settledAt: new Date().toISOString() };
      }

      return expense;
    }));
  }

  const deleteExpense = (expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  };

  return {
    expenses,
    people,
    settlements,
    addExpense,
    addPerson,
    settleExpense,
    deleteExpense,
  };
}