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
  TrendingUp,
  Users
} from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import { useCalculations } from "@/hooks/useCalculations";
import { BalanceCard } from "@/features/expense-tracker/components/balance-card";
import { useState } from "react";

export const ExpenseTracker = () => {
  const { expenses, people, addExpense, addPerson, settleExpense, deleteExpense } = useExpenses();
  const { balances } = useCalculations(expenses, people);
  const [currentUserId, setCurrentUserId] = useState("");

  const handleSettleDebt = (fromPersonId: string, toPersonId: string, amount: number) => {
    settleExpense("debt-settlement", fromPersonId, toPersonId, amount);
  }

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
      </Tabs>
    </div>
  );
}
