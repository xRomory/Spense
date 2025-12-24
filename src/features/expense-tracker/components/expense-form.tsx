"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Person } from "@/types";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";

interface ExpenseFormProps {
  people: Person[];
  onAddExpense: (expense: {
    title: string;
    amount: number;
    paidBy: string;
    splitType: "equal" | "custom";
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

  const handleAddPerson = () => {
    if(newPersonName.trim()) {
      onAddPerson(newPersonName.trim());
      setNewPersonName("");
      setShowAddPerson(false);
    }
  };

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Expense Title</Label>
        <Input
          id="title"
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
            <Button type="button" onClick={handleAddPerson}>Add</Button>
          </div>
        )}

        <Select value={paidBy} onValueChange={setPaidBy} required>
          <SelectTrigger>
            <SelectValue placeholder="Select who paid" />
          </SelectTrigger>
        </Select>
      </div>
    </form>
  );
};
