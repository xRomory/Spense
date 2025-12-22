// Note: this function is in localStorage. Will refactor later utilizing Zustand

import { Expense, Person, Settlement } from "@/types";
import { useState } from "react";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [settlement, setSettlement] = useState<Settlement[]>([]);


}