"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { SplitType } from "@/lib/validators/expenses.schema";
import { Person } from "@/lib/validators/person.schema";
import { calculateEqualSplit } from "@/utils/calculations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Plus } from "lucide-react";

interface ExpenseFormProps {
  people: Person[];
  onAddExpense: (expense: {
    title: string;
    amount: number;
    paidBy: string;
    splitType: SplitType;
    splits: { personId: string; amount: number }[];
    date: string;
    settled: boolean;
  }) => void;
  onAddPerson: (name: string) => Person;
}

export const ExpenseForm = ({
  people,
  onAddExpense,
  onAddPerson,
}: ExpenseFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [splitType, setSplitType] = useState<SplitType>("equal");
  const [customSplits, setCustomSplits] = useState<{
    [personId: string]: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!title || !amount || !paidBy) return;

    const expenseAmount = parseFloat(amount);
    let splits: { personId: string, amount: number }[] = [];

    if(splitType === "equal") {
      const splitAmount = calculateEqualSplit(expenseAmount, people.length);

      splits = people.map(person => ({
        personId: person.id,
        amount: splitAmount,
      }));
    } else {
      splits = people.map(person => ({
        personId: person.id,
        amount: parseFloat(customSplits[person.id] || '0')
      }));
    }

    onAddExpense({
      title,
      amount: expenseAmount,
      paidBy,
      splitType,
      splits,
      date: date.toISOString(),
      settled: false
    });

    // Reset form
    setTitle("");
    setAmount("");
    setPaidBy("");
    setSplitType("equal");
    setCustomSplits({});
    setDate(new Date());
  };

  const expenseAmount = parseFloat(amount) || 0;
  const totalCustomSplit = Object.values(customSplits).reduce(
    (sum, value) => sum + (parseFloat(value) || 0),
    0
  );
  const customSplitValid = Math.abs(totalCustomSplit - expenseAmount) < 0.01;

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      onAddPerson(newPersonName.trim());
      setNewPersonName("");
      setShowAddPerson(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Expense Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Electric Bill - September"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₱)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₱0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 w-4 h-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={() => date && setDate(date)}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Paid By</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddPerson(!showAddPerson)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Person
          </Button>
        </div>

        {showAddPerson && (
          <div className="flex gap-2">
            <Input
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              placeholder="Person name"
            />
            <Button type="button" onClick={handleAddPerson}>
              Add
            </Button>
          </div>
        )}

        <Select value={paidBy} onValueChange={setPaidBy} required>
          <SelectTrigger>
            <SelectValue placeholder="Select who paid" />
          </SelectTrigger>
          <SelectContent>
            {people.map((person) => (
              <SelectItem key={person.id} value={person.id}>
                {person.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Split Type</Label>
        <Select
          value={splitType}
          onValueChange={(value: SplitType) => setSplitType(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equal">Equal Split</SelectItem>
            <SelectItem value="custom">Custom Split</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {splitType === "equal" && expenseAmount > 0 && (
        <div className="p-3 bg-card rounded-lg">
          <p className="text-sm text-secondary-foreground">
            Each person pays:{" "}
            <span className="font-semibold">
              ₱{calculateEqualSplit(expenseAmount, people.length).toFixed(2)}
            </span>
          </p>
        </div>
      )}

      {splitType === "custom" && (
        <div className="space-y-4">
          <Label>Custom Amounts</Label>
          {people.map((person) => (
            <div key={person.id} className="flex items-center gap-2">
              <Label className="w-20 text-sm">{person.name}</Label>
              <Input
                type="number"
                step="0.01"
                value={customSplits[person.id] || ""}
                onChange={(e) =>
                  setCustomSplits((prev) => ({
                    ...prev,
                    [person.id]: e.target.value,
                  }))
                }
                placeholder="₱0.00"
              />
            </div>
          ))}
          <div className="p-3 bg-background border border-primary rounded-lg">
            <p className="text-sm">
              Total:{" "}
              <span
                className={`font-semibold ${
                  customSplitValid ? "text-green-600" : "text-destructive"
                }`}
              >
                ₱{totalCustomSplit.toFixed(2)}
              </span>
              {expenseAmount > 0 && (
                <span className="text-secondary-foreground">
                  {" "}
                  / ₱{expenseAmount.toFixed(2)}
                </span>
              )}
            </p>
            {!customSplitValid && expenseAmount > 0 && (
              <p className="text-xs text-destructive mt-1">
                Custom splits must equal the total expense amount
              </p>
            )}
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={splitType === "custom" && !customSplitValid}
      >
        Add Expense
      </Button>
    </form>
  );
};
