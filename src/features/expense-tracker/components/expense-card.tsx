import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Expense, Person } from "@/types";
import { format } from "date-fns";
import { Calendar, User } from "lucide-react";

interface ExpenseCardProps {
  expense: Expense,
  people: Person[],
  onDelete: (expenseId: string) => void,
  onSettle: (expenseId: string) => void
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
        </div>
      </CardHeader>
    </Card>
  )
}
