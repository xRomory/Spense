import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Balance, Person } from "@/types";
import { formatCurrency } from "@/utils/calculations";
import { PhilippinePeso } from "lucide-react";

interface BalanceCardProps {
  balance: Balance;
  people: Person[];
  currentUserId: string;
  onSettle: (
    fromPersonId: string,
    toPersonId: string,
    amount: number
  ) => void;
}

export const BalanceCard = ({ balance, people, currentUserId, onSettle }: BalanceCardProps) => {
  const person = people.find(p => p.id === balance.personId);
  const isCurrentUser = balance.personId === currentUserId;

  if(!person) return null;

  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || "Unknown";
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
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
            <p className="text-sm text-secondary-foreground mb-1">Net Balance</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
