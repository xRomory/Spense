import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Share2, Users } from "lucide-react";
import { CreateGroupForm } from "./_components/create-group-form";
import { JoinGroupForm } from "./_components/join-group-form";

export default function ActionCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Create New Group */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Create New Group
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateGroupForm />

          <div className="mt-4 p-3 bg-secondary-card border-border border rounded-lg">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-400" />
              <div className="text-sm text-green-500">
                <p className="font-semibold">You'll get a join code to invite others</p>
                <p>Share expenses and track balances together</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Join Existing Group */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Join Existing Group
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JoinGroupForm />

          <div className="mt-4 p-3 bg-secondary-card border-border border rounded-lg">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-green-400" />
              <div className="text-sm text-green-500">
                <p className="font-semibold">Got an invite from a friend?</p>
                <p>Enter their join code to access the shared expenses</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
