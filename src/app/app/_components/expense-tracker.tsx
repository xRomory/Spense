"use client";

import { formatCurrency } from "@/utils/calculations";
import SpenseLogo from "@/components/logo";
import SpenseHeader from "./header";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Banknote,
  NotebookPen,
  PhilippinePeso,
  Plus,
  Receipt,
  TrendingUp,
  Users
} from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import { useCalculations } from "@/hooks/useCalculations";
import { BalanceCard } from "@/features/expense-tracker/components/balance-card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ExpenseCard } from "@/features/expense-tracker/components/expense-card";
import { ExpenseForm } from "@/features/expense-tracker/components/expense-form";

export const ExpenseTracker = () => {
  const { expenses, people, addExpense, addPerson, settleExpense, deleteExpense } = useExpenses();
  const { balances } = useCalculations(expenses, people);
  const [currentUserId, setCurrentUserId] = useState("");

  const handleSettleDebt = (fromPersonId: string, toPersonId: string, amount: number) => {
    settleExpense("debt-settlement", fromPersonId, toPersonId, amount);
  }

  const handleSettle = (expenseId: string) => {
    const expense = expenses.find(e => e.id === expenseId);

    if(expense) {
      settleExpense(expenseId, expense.paidBy, expense.paidBy, expense.amount);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <SpenseLogo />
      <SpenseHeader />

      {/* Group Members Count */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Group Members
          </CardTitle>
        </CardHeader>
        <CardContent>{/* Badge here */}</CardContent>
      </Card>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center gap-3">
              <div>
                <PhilippinePeso className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-sm text-secondary-foreground">
                  Total Expenses
                </p>
                <p className="text-xl font-bold font-koulen">
                  {formatCurrency(0.0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center gap-3">
              <div>
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-sm text-secondary-foreground">
                  Active Expenses
                </p>
                <p className="text-xl font-bold font-koulen">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center gap-3">
              <div>
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-sm text-secondary-foreground">People</p>
                <p className="text-xl font-bold font-koulen">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="px-4">
            <div className="flex items-center gap-3">
              <div>
                <Banknote className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-sm text-secondary-foreground">
                  Your Balance
                </p>
                <p className="text-xl font-bold font-koulen">
                  {formatCurrency(0.0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Main Content */}
      <Tabs defaultValue="balances" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="balances">Balance Summary</TabsTrigger>
          <TabsTrigger value="expenses">All Expenses</TabsTrigger>
          <TabsTrigger value="add">Add Expense</TabsTrigger>
        </TabsList>

        <TabsContent value="balances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-koulen">
                <NotebookPen className="h-5 w-5 text-primary" />
                Balance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {balances.map(balance => (
                  <BalanceCard 
                    key={balance.personId}
                    balance={balance}
                    people={people}
                    currentUserId={currentUserId}
                    onSettle={handleSettleDebt}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-koulen">
                  <Receipt className="h-5 w-5 text-primary" />
                  All Expenses
                </div>
                <Badge variant="outline">{expenses.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-secondary-foreground">No expenses yet. Add your first expense to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {expenses
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(expense => (
                      <ExpenseCard
                        key={expense.id}
                        expense={expense}
                        people={people}
                        onDelete={deleteExpense}
                        onSettle={handleSettle}
                      />
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-koulen">
                  <Plus className="h-5 w-5 text-primary" />
                  Add New
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ExpenseForm 
                  people={people}
                  onAddExpense={addExpense}
                  onAddPerson={addPerson}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
