import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Balance, Person } from "@/types";
import { formatCurrency } from "@/utils/calculations";
import { ArrowDownLeft, ArrowUpRight, PhilippinePeso } from "lucide-react";

interface BalanceCardProps {
  balance: Balance;
  people: Person[];
  currentUserId: string;
  onSettle: (fromPersonId: string, toPersonId: string, amount: number) => void;
}

export const BalanceCard = ({
  balance,
  people,
  currentUserId,
  onSettle,
}: BalanceCardProps) => {
  const person = people.find((p) => p.id === balance.personId);
  const isCurrentUser = balance.personId === currentUserId;

  if (!person) return null;

  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || "Unknown";
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {person.name}
            {isCurrentUser && <Badge variant="secondary">You</Badge>}
          </CardTitle>
          <Badge
            variant={balance.netBalance >= 0 ? "default" : "destructive"}
            className={balance.netBalance >= 0 ? "bg-card text-primary" : ""}
          >
            <PhilippinePeso className="h-3 w-3 mr-1" />
            {formatCurrency(Math.abs(balance.netBalance))}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Net Balance Summary */}
        <div className="p-3 rounded-lg bg-background">
          <div className="text-center">
            <p className="text-sm text-secondary-foreground mb-1">
              Net Balance
            </p>
            <p
              className={`text-lg font-bold ${
                balance.netBalance > 0
                  ? "text-green-600"
                  : balance.netBalance < 0
                  ? "text-red-600"
                  : "text-secondary-foreground"
              }`}
            >
              {balance.netBalance > 0 && "+"}
              {formatCurrency(balance.netBalance)}
            </p>

            <p className="text-xs text-secondary-foreground mt-1">
              {balance.netBalance > 0
                ? "You are owed money"
                : balance.netBalance < 0
                ? "You owe money"
                : "All settled up!"}
            </p>
          </div>
        </div>

        {/* Money owed to Others */}
        {balance.owes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-destructive flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              {isCurrentUser ? "You owe:" : `${person.name} owes:`}
            </h4>

            {balance.owes.map((debt) => (
              <div
                key={debt.toPersonId}
                className="flex items-center justify-between p-2 bg-secondary-card border border-destructive rounded"
              >
                <span className="text-sm">
                  {isCurrentUser ? "You owe" : `${person.name} owes`}{" "}
                  <span className="font-medium">
                    {formatCurrency(debt.amount)}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">{getPersonName(debt.toPersonId)}</span>
                </span>

                {isCurrentUser && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSettle(balance.personId, debt.toPersonId, debt.amount)}
                  >
                    Settle
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Money Owed to from Others */}
        {balance.owed.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary flex-items-center gap-1">
              <ArrowDownLeft className="h-4 w-4" />
              {isCurrentUser ? "Owed to you:" : `Owed to ${person.name}:`}
            </h4>
            {balance.owed.map(owed => (
              <div 
                key={owed.fromPersonId}
                className="flex items-center justify-between p-2 bg-secondary-card rounded border border-primary"
              >
                <span className="text-sm">
                  <span className="font-medium">{getPersonName(owed.fromPersonId)}</span> owes {" "}
                  {isCurrentUser ? "you" : person.name} <span className="font-medium">{formatCurrency(owed.amount)}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* All Settled */}
        {balance.owes.length === 0 && balance.owed.length === 0 && (
          <div className="text-center p-4 bg-background rounded-lg">
            <p className="text-sm text-muted-foreground">
              {isCurrentUser ? "You are all settled up!" : `${person.name} is all settle up!`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};