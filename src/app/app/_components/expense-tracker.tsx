"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { paths } from "@/config/paths";
import { formatCurrency } from "@/utils/calculations";
import { useExpenses } from "@/hooks/useExpenses";
import { useCalculations } from "@/hooks/useCalculations";
import SpenseLogo from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BalanceCard } from "@/features/expense-tracker/components/balance-card";
import { Badge } from "@/components/ui/badge";
import { ExpenseCard } from "@/features/expense-tracker/components/expense-card";
import { ExpenseForm } from "@/features/expense-tracker/components/expense-form";
import { Button } from "@/components/ui/button";
import { InviteModal } from "./invite-modal";
import {
  ArrowLeft,
  Banknote,
  NotebookPen,
  PhilippinePeso,
  Plus,
  Receipt,
  TrendingUp,
  Users,
} from "lucide-react";
import { STORAGE_KEY_CURRENT_USER, STORAGE_KEY_GROUP, STORAGE_KEY_PEOPLE } from "@/constants";

interface GroupData {
  id: string;
  name: string;
  createdAt: string;
  members: Array<{
    id: string;
    name: string;
    isCreator: boolean;
  }>;
}

export const ExpenseTracker = () => {
  const router = useRouter();

  const {
    expenses,
    people,
    addExpense,
    addPerson,
    settleExpense,
    deleteExpense,
  } = useExpenses();
  const { balances, totalExpenses, unsettledExpenses } = useCalculations(expenses, people);
  const [currentUserId, setCurrentUserId] = useState("");
  const [groupData, setGroupData] = useState<GroupData | null>(null);

  useEffect(() => {
    const savedGroup = localStorage.getItem(STORAGE_KEY_GROUP);
    const savedUserId = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    const savedPeople = localStorage.getItem(STORAGE_KEY_PEOPLE);

    if(!savedGroup || !savedUserId || !savedPeople) {
      router.push("/");
      return;
    }

    setGroupData(JSON.parse(savedGroup));
    setCurrentUserId(savedUserId);
  }, [router]);

  const handleSettleDebt = (
    fromPersonId: string,
    toPersonId: string,
    amount: number
  ) => {
    settleExpense("debt-settlement", fromPersonId, toPersonId, amount);
  };

  const handleSettle = (expenseId: string) => {
    const expense = expenses.find((e) => e.id === expenseId);

    if (expense) {
      settleExpense(expenseId, expense.paidBy, expense.paidBy, expense.amount);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <SpenseLogo className="md:text-4xl"/>

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href={paths.home.getHref()}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </a>
          <div>
            <h1 className="text-xl md:text-3xl font-bold">{groupData?.name}</h1>
            <p className="text-secondary-foreground text-sm md:text-base">
              {groupData?.members.length} members •{" "}
              <span className="text-muted-foreground">
                Split expenses and track balances
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {groupData && (
            <InviteModal groupId={groupData.id} groupName={groupData.name} />
          )}
        </div>
      </header>

      {/* Group Members Count */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Group Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {groupData?.members.map(member => (
              <Badge
                key={member.id}
                variant={member.id === currentUserId ? "default" : "secondary"}
                className="px-3 py-1"
              >
                {member.name}
                {member.id === currentUserId && "(You)"}
              </Badge>
            ))}
          </div>
        </CardContent>
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
                  {formatCurrency(totalExpenses)}
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
                <p className="text-xl font-bold font-koulen">{unsettledExpenses.length}</p>
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
                <p className="text-xl font-bold font-koulen">{people.length}</p>
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
                <p className={`text-xl font-bold font-koulen ${
                  balances.find(b => b.personId === currentUserId)?.netBalance || 0 >= 0
                    ? "text-primary" : "text-destructive"
                }`}>
                  {formatCurrency(Math.abs(balances.find(b => b.personId === currentUserId)?.netBalance || 0))}
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
                  <p className="text-secondary-foreground">
                    No expenses yet. Add your first expense to get started!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {expenses
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
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
};
