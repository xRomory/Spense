import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

export const CreateGroupForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="groupname" className="text-md font-semibold">
          Group Name
        </Label>
        <Input 
          id="groupname"
          placeholder="e.g. Room 123, Trip to Boracay"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="userName" className="text-md font-semibold">
          Your Name
        </Label>
        <Input 
          id="userName"
          placeholder="e.g. Room 123, Trip to Boracay"
        />
      </div>
      <Button type="submit" className="w-full">
        Create Group
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
