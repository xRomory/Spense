import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { ArrowLeft } from "lucide-react";
import { InviteModal } from "./invite-modal";

export default function SpenseHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <a href={paths.home.getHref()}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </a>
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Group Name</h1>
          <p className="text-secondary-foreground text-sm md:text-base">(Group Number) members • {" "}
            <span className="text-muted-foreground">Split expenses and track balances</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <InviteModal />
      </div>
    </header>
  );
}
