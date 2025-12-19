import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Users } from "lucide-react";

interface InviteModalProps {
  groupId: string;
  groupName: string;
}

export const InviteModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-2" />
          Invite People
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Invite People to "(group name)"
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Join Code */}
          <Card className="border-border">
            <CardContent className="px-4">
              <div className="space-y-2">
                <Label className="text-md font-medium">Join Code</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    readOnly
                    className="font-mono text-center text-lg font-bold"
                  />
                  <Button
                    variant="outline"
                    size="sm"

                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-secondary-foreground">
                  Share this 6-digit code with friends
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Invite Link */}
          <Card className="border-border">
            <CardContent className="px-4">
              <div className="space-y-2">
                <Label className="text-md font-medium">Invite Link</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    readOnly
                    className="font-mono text-center text-lg font-bold"
                  />
                  <Button
                    variant="outline"
                    size="sm"

                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-secondary-foreground">
                  Direct link to join your group
                </p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Invite
          </Button>

          {/* Instruction Section */}
          <div className="p-3 bg-card rounded-lg">
            <h4 className="text-md font-semibold text-primary mb-1">How to join:</h4>
            <ul className="text-sm text-green-500 space-y-1">
              <li>• Share the join code or link with friends</li>
              <li>• They can enter the code on the landing page</li>
              <li>• Or click the invite link to join directly</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
