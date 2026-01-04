"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateId } from "@/utils/calculations";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

export const CreateGroupForm = () => {
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();

    if(!groupName.trim() || !username.trim()) {
      toast.error("Please enter both group name and username");
      return;
    }

    // Create new group data
    const groupId = generateId();
    const currentUserId = generateId();

    const groupData = {
      id: groupId,
      name: groupName.trim(),
      createdAt: new Date().toISOString(),
      members: [{
        id: currentUserId,
        name: username.trim(),
        isCreator: true
      }]
    };

    localStorage.setItem("spense-expense-tracker-group", JSON.stringify(groupData));
    localStorage.setItem("spense-expense-tracker-current-user", JSON.stringify(currentUserId));

    // Initialize empty expenses and people array
    localStorage.setItem("spense-tracker-expenses", JSON.stringify([]));
    localStorage.setItem("spense-tracker-people", JSON.stringify([{
      id: currentUserId,
      name: username.trim(),
    }]));
    localStorage.setItem("spense-tracker-settlements", JSON.stringify([]));
    
    toast.success(`Group "${groupName}" created successfully!`);

    router.push("/app");
  };

  return (
    <form onSubmit={handleCreateGroup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="groupName" className="text-md font-semibold">
          Group Name
        </Label>
        <Input 
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="e.g. Room 123, Trip to Boracay"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username" className="text-md font-semibold">
          Your Name
        </Label>
        <Input 
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Juan Dela Cruz"
        />
      </div>
      <Button type="submit" className="w-full">
        Create Group
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
