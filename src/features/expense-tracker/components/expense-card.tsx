"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Expense, Person } from "@/types";
import { formatCurrency } from "@/utils/calculations";
import { format } from "date-fns";
import { Calendar, Check, PhilippinePeso, Trash2, User } from "lucide-react";

interface ExpenseCardProps {
  expense: Expense;
  people: Person[];
  onDelete: (expenseId: string) => void;
  onSettle: (expenseId: string) => void;
}

export const ExpenseCard = ({
  expense,
  people,
  onDelete,
  onSettle,
}: ExpenseCardProps) => {
  const paidByPerson = people.find(p => p.id === expense.paidBy);

  return (
    <Card className={`w-full ${expense.settled ? "opacity-60 bg-card" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{expense.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-secondary-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(expense.date), 'MMM dd, yyyy')}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Paid by {paidByPerson?.name || "Unknown"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {expense.settled && (
              <Badge variant="secondary" className="bg-secondary-card text-primary">
                <Check className="h-3 w-3 mr-1" />
                Settled
              </Badge>
            )}
            <Badge variant="outline" className="font-semibold">
              <PhilippinePeso className="w-3 h-3 mr-1" />
              {formatCurrency(expense.amount)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Split Details</h4>
          <div className="space-y-1">
            {expense.splits.map(split => {
              const person = people.find(p => p.id === split.personId)

              return (
                <div key={split.personId} className="flex justify-between text-sm">
                  <span>{person?.name || "Unknown"}</span>
                  <span className="font-medium">{formatCurrency(split.amount)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 pt-2 border-t">
            <div className="flex justify-between text-sm font-medium">
              <span>Split Type:</span>
              <Badge variant="outline">
                {expense.splitType === "equal" ? "Equal Split" : "Custom Split"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {!expense.settled && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onSettle(expense.id)}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-1" />
              Mark as settled
            </Button>
          )}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(expense.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
